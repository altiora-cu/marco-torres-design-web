/* =============================================================
   Pruebas del sitio (rediseño «La sala nocturna»).
   Uso:  node tests/sitio.test.mjs
   Necesita Playwright con Chromium al alcance de `require`
   (por ejemplo: NODE_PATH=<carpeta node_modules con playwright>).
   Instagram se sustituye por un doble: las pruebas no dependen de su red.
   GSAP se pide a cdnjs de verdad: sin internet, B8 falla y avisa.
   ============================================================= */
import { createRequire } from "node:module";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), "utf8");

/* ---------- Config real del sitio (se evalúa como en el navegador) ---------- */
const ctx = { window: {} };
vm.runInNewContext(leer("js/config.js"), ctx);
const C = ctx.window.SITE_CONFIG;

const REELS = ["DW0AnY9jZOf", "DVcjmtpjdeN", "DZGgNONt_h0", "DG1hiiGp74R", "Dag1ZEZNCZd", "DXSpXS3Df6K", "DdVEAPOtJJF"]
  .map((c) => `https://www.instagram.com/reel/${c}/`);

let ok = 0, mal = 0;
const fallos = [];
async function prueba(nombre, fn) {
  try { await fn(); ok++; console.log("  ✓ " + nombre); }
  catch (e) { mal++; fallos.push(nombre); console.log("  ✗ " + nombre + "\n      " + (e && e.message ? e.message : e)); }
}
function afirmar(cond, msg) { if (!cond) throw new Error(msg); }

/* ---------- Servidor estático mínimo ---------- */
const TIPOS = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".mp4": "video/mp4", ".svg": "image/svg+xml" };
const servidor = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const f = path.join(RAIZ, p);
  if (!f.startsWith(RAIZ) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TIPOS[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => servidor.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${servidor.address().port}/`;

/* ---------- Navegador con Instagram doblado ---------- */
// Chromium de Playwright si está instalado; si no, el Google Chrome del equipo
const navegador = await chromium.launch().catch(() => chromium.launch({ channel: "chrome" }));
async function abrir(url, opciones = {}) {
  const contexto = await navegador.newContext({ viewport: opciones.viewport || { width: 1440, height: 900 }, reducedMotion: opciones.reduce ? "reduce" : "no-preference" });
  const pagina = await contexto.newPage();
  const registro = { instagram: [], gsap: [], errores: [] };
  pagina.on("pageerror", (e) => registro.errores.push(String(e)));
  pagina.on("console", (m) => { if (m.type() === "error" && !/instagram|Failed to load resource/i.test(m.text())) registro.errores.push(m.text()); });
  pagina.on("request", (r) => { if (/gsap/i.test(r.url())) registro.gsap.push(r.url()); });
  await contexto.route(/instagram\.com/, (route) => {
    registro.instagram.push(route.request().url());
    if (/embed\.js/.test(route.request().url()))
      return route.fulfill({ contentType: "text/javascript", body: "window.instgrm={Embeds:{process(){window.__igProcesado=(window.__igProcesado||0)+1}}};" });
    return route.abort();
  });
  await pagina.goto(BASE + url, { waitUntil: "load" });
  return { pagina, contexto, registro };
}
const reposo = (p, ms = 1800) => p.waitForTimeout(ms);

console.log("\nEstáticas");
const fuentes = ["index.html", "catalogo.html", "js/config.js", "js/main.js", "css/styles.css"];
await prueba("S1 ningún fetch() en el JS del sitio", () => {
  for (const f of ["js/config.js", "js/main.js"]) afirmar(!/\bfetch\s*\(/.test(leer(f)), f + " usa fetch()");
});
await prueba("S2 los videos del hero no pasan de ~600 KB", () => {
  for (const f of ["assets/video/hero.mp4", "assets/video/hero-mobile.mp4"]) {
    const kb = fs.statSync(path.join(RAIZ, f)).size / 1024; afirmar(kb <= 610, f + " pesa " + kb.toFixed(0) + " KB");
  }
});
await prueba("S3 el retrato pesa menos de 150 KB", () => {
  const f = C.artista.retrato; const kb = fs.statSync(path.join(RAIZ, f)).size / 1024;
  afirmar(kb < 150, f + " pesa " + kb.toFixed(0) + " KB");
});
await prueba("S4 sin nombres bloqueados por Legal, sin «Médico», sin «Marco» ni «watch»", () => {
  const prohibido = [/Marc Anthony/i, /CRM/, /Ariel/i, /Zarova/i, /Carlos Marcelin/i, /M[ée]dico/i, /\bMarco\b/, /\bwatch(es)?\b/i];
  for (const f of fuentes) for (const re of prohibido) afirmar(!re.test(leer(f)), f + " contiene " + re);
});
await prueba("S5 config.js trae los 7 reels elegidos, en orden", () => {
  const urls = (C.instagram && C.instagram.reels || []).map((r) => r.url || r);
  afirmar(JSON.stringify(urls) === JSON.stringify(REELS), "reels: " + JSON.stringify(urls));
});
await prueba("S6 el número de WhatsApp solo vive en config.js", () => {
  afirmar(C.contacto.whatsapp === "17862414630", "config sin número");
  for (const f of ["index.html", "catalogo.html", "js/main.js", "css/styles.css"]) afirmar(!leer(f).includes("7862414630"), f + " repite el número");
});
await prueba("S7 el constructor y la sala leen sus textos de config.js", () => {
  const t = C.tuReloj;
  afirmar(t && t.preguntas && t.preguntas.length === 3, "faltan las 3 preguntas de tuReloj");
  afirmar(C.catalogo.every((p) => p.historia && p.tipo && p.material && p.ancho && p.alto), "piezas sin historia/tipo/material/medidas");
  afirmar(t.preguntas[0].opciones.every((o) => C.catalogo.some((p) => p.historia === o.valor)), "una historia del constructor no tiene pieza parecida");
});

console.log("\nPortada · escritorio 1440");
{
  const { pagina, contexto, registro } = await abrir("index.html");
  await prueba("B1 sin errores de JS al cargar", () => afirmar(registro.errores.length === 0, registro.errores.join(" | ")));
  await prueba("B2 el hero tiene póster de respaldo como fondo", async () => {
    const fondo = await pagina.$eval(".hero__fondo", (e) => getComputedStyle(e).backgroundImage);
    afirmar(/hero-bg\.webp/.test(fondo), "fondo: " + fondo);
  });
  await prueba("B3 nada de Instagram antes de llegar a la sección", async () => {
    afirmar(registro.instagram.length === 0, "pidió: " + registro.instagram.join(", "));
    afirmar(!(await pagina.$("script[src*='instagram.com/embed.js']")), "embed.js ya está en el DOM");
  });
  await prueba("B7 el CTA de la isla abre wa.me con el número de config", async () => {
    const href = await pagina.$eval(".isla [data-wa]", (a) => a.href);
    afirmar(href.startsWith("https://wa.me/" + C.contacto.whatsapp + "?text="), href);
  });
  await prueba("B5 «Tu reloj» arma el mensaje y el CTA abre wa.me", async () => {
    await pagina.locator("#tu-reloj").scrollIntoViewIfNeeded();
    await pagina.click(".chips[data-grupo='historia'] button[data-v='Familia']");
    await pagina.click(".chips[data-grupo='tipo'] button[data-v='Mesa']");
    await pagina.click(".chips[data-grupo='material'] button[data-v='Resina']");
    await pagina.fill("#nota", "Mi perro Toby");
    const a = await pagina.$eval("#vista-cta", (a) => ({ href: a.href, target: a.target, msg: document.querySelector("#vista-msg").textContent }));
    afirmar(a.href.startsWith("https://wa.me/" + C.contacto.whatsapp + "?text="), a.href);
    const texto = decodeURIComponent(a.href.split("?text=")[1]);
    for (const trozo of ["mesa", "a alguien de mi familia", "resina", "Mi perro Toby"]) afirmar(texto.includes(trozo), "falta «" + trozo + "» en: " + texto);
    afirmar(texto === a.msg, "el mensaje visible y el enlace no coinciden");
    afirmar(a.target === "_blank", "no abre en pestaña nueva");
    const pieza = await pagina.textContent("#vista-nombre");
    afirmar(C.catalogo.some((p) => p.nombre === pieza && p.historia === "Familia"), "pieza parecida: " + pieza);
  });
  await prueba("B11 lo que escribe el visitante nunca se inyecta como HTML", async () => {
    await pagina.fill("#nota", '<img src=x onerror="window.__xss=1">');
    const r = await pagina.evaluate(() => ({ img: !!document.querySelector("#vista-msg img"), xss: !!window.__xss, txt: document.querySelector("#vista-msg").textContent }));
    afirmar(!r.img && !r.xss && r.txt.includes("<img"), JSON.stringify(r));
    await pagina.fill("#nota", "");
  });
  await prueba("B6 la vitrina abre la pieza y su CTA lleva su nombre", async () => {
    await pagina.evaluate(() => document.querySelector("[data-abrir='0']").click());
    afirmar(await pagina.$eval("#vitrina", (d) => d.open), "la vitrina no abrió");
    const href = await pagina.$eval("#v-cta", (a) => a.href);
    afirmar(decodeURIComponent(href).includes(C.catalogo[0].nombre), href);
    await pagina.keyboard.press("Escape");
  });
  await prueba("B4 al llegar a Redes: embed.js una vez y los 7 reels sin pie de foto", async () => {
    await pagina.locator("#redes").scrollIntoViewIfNeeded();
    await pagina.waitForFunction(() => document.querySelectorAll("blockquote.instagram-media").length === 7, null, { timeout: 5000 });
    const datos = await pagina.$$eval("blockquote.instagram-media", (b) => b.map((x) => ({ p: x.dataset.instgrmPermalink, cap: x.hasAttribute("data-instgrm-captioned") })));
    datos.forEach((d, i) => afirmar(d.p.startsWith(REELS[i]), "reel " + i + ": " + d.p));
    afirmar(datos.every((d) => !d.cap), "algún reel lleva pie de foto");
    afirmar(registro.instagram.filter((u) => /embed\.js/.test(u)).length === 1, "embed.js pedido " + registro.instagram.length + " veces");
    afirmar(await pagina.evaluate(() => window.__igProcesado >= 1), "no se llamó a instgrm.Embeds.process()");
  });
  await prueba("B8 el 3D se carga diferido en escritorio (GSAP + pasillo fijado)", async () => {
    await pagina.waitForFunction(() => document.querySelector(".sala").classList.contains("con-pin"), null, { timeout: 8000 });
    afirmar(registro.gsap.length >= 1, "no se pidió GSAP");
  });
  await prueba("B9 enlaces del pie ≥ 44 px y texto legal con contraste AA", async () => {
    await pagina.locator(".pie").scrollIntoViewIfNeeded();
    const r = await pagina.evaluate(() => {
      const lum = (c) => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map(Number).map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };
      const fondo = (el) => { while (el) { const c = getComputedStyle(el).backgroundColor; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return c; el = el.parentElement; } return "rgb(255,255,255)"; };
      const ratio = (el) => { const a = lum(getComputedStyle(el).color), b = lum(fondo(el)); return (Math.max(a, b) + .05) / (Math.min(a, b) + .05); };
      return { altos: [...document.querySelectorAll(".pie a")].map((a) => a.getBoundingClientRect().height), textos: [...document.querySelectorAll(".pie p, .pie span, .pie a")].map(ratio) };
    });
    afirmar(r.altos.length >= 3 && r.altos.every((h) => h >= 44), "altos: " + r.altos.join(", "));
    afirmar(r.textos.every((x) => x >= 4.5), "contrastes: " + r.textos.map((x) => x.toFixed(2)).join(", "));
  });
  await prueba("B10 sin errores de JS tras recorrer la página", () => afirmar(registro.errores.length === 0, registro.errores.join(" | ")));
  await contexto.close();
}

console.log("\nMóvil 375");
for (const url of ["index.html", "catalogo.html"]) {
  const { pagina, contexto, registro } = await abrir(url, { viewport: { width: 375, height: 812 } });
  await reposo(pagina, 1200);
  // Antes de bajar: los reels todavía son marcadores (así se coló un ancho de 2270 px)
  const anchoInicial = await pagina.evaluate(() => document.documentElement.scrollWidth);
  await prueba(`M0 ${url}: 375 exactos al abrir, sin bajar`, () => afirmar(anchoInicial === 375, "scrollWidth " + anchoInicial));
  await pagina.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
  await reposo(pagina, 1200);
  await prueba(`M1 ${url}: el documento mide 375 de ancho exactos`, async () => {
    const w = await pagina.evaluate(() => [document.documentElement.scrollWidth, document.body.scrollWidth]);
    afirmar(w[0] === 375 && w[1] <= 375, "scrollWidth " + w.join(" / "));
  });
  await prueba(`M3 ${url}: hijos de rejilla/flex con carril desplazable llevan min-width: 0`, async () => {
    const malos = await pagina.evaluate(() => {
      const out = [];
      document.querySelectorAll("*").forEach((el) => {
        const cs = getComputedStyle(el);
        if (!/(auto|scroll)/.test(cs.overflowX) || el.scrollWidth <= el.clientWidth) return;
        for (let n = el; n && n !== document.body; n = n.parentElement) {
          const padre = n.parentElement; if (!padre) break;
          const d = getComputedStyle(padre).display;
          if (/grid|flex/.test(d) && getComputedStyle(n).minWidth !== "0px") out.push((n.className || n.tagName) + " en " + (padre.className || padre.tagName));
        }
      });
      return [...new Set(out)];
    });
    afirmar(malos.length === 0, malos.join(" · "));
  });
  if (url === "index.html") {
    await prueba("M2 la línea sobre el titular se lee (≥ 12 px)", async () => {
      const px = await pagina.$eval(".hero__ceja", (e) => parseFloat(getComputedStyle(e).fontSize));
      afirmar(px >= 12, px + " px");
    });
    await prueba("M4 en móvil no se descarga GSAP", () => afirmar(registro.gsap.length === 0, registro.gsap.join(", ")));
  }
  await prueba(`M5 ${url}: sin errores de JS`, () => afirmar(registro.errores.length === 0, registro.errores.join(" | ")));
  await contexto.close();
}

console.log("\nMovimiento reducido");
{
  const { pagina, contexto, registro } = await abrir("index.html", { reduce: true });
  await reposo(pagina, 2500);
  await prueba("R1 sin GSAP, sin video y sin giros 3D", async () => {
    afirmar(registro.gsap.length === 0, "pidió GSAP");
    afirmar(!(await pagina.$eval(".hero__video", (v) => v.currentSrc || v.getAttribute("src"))), "el video cargó");
    const t = await pagina.$$eval(".obra__boton", (b) => b.map((x) => getComputedStyle(x).transform));
    afirmar(t.every((x) => x === "none"), "transformaciones: " + t.join(", "));
  });
  await contexto.close();
}

console.log("\nCatálogo");
for (const viewport of [{ width: 1440, height: 900 }, { width: 375, height: 812 }]) {
  const { pagina, contexto } = await abrir("catalogo.html", { viewport });
  await pagina.evaluate(() => { window.__cls = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__cls += e.value; })).observe({ type: "layout-shift", buffered: true }); });
  await reposo(pagina, 2500);
  await prueba(`C1 CLS < 0,1 a ${viewport.width} px`, async () => { const v = await pagina.evaluate(() => window.__cls); afirmar(v < 0.1, "CLS " + v.toFixed(3)); });
  if (viewport.width === 1440) {
    await prueba("C2 la primera pieza no es lazy y todas tienen medidas", async () => {
      const imgs = await pagina.$$eval(".coleccion img", (i) => i.map((x) => ({ l: x.loading, w: x.getAttribute("width"), h: x.getAttribute("height") })));
      afirmar(imgs.length === C.catalogo.length, imgs.length + " piezas");
      afirmar(imgs[0].l !== "lazy", "la primera es lazy");
      afirmar(imgs.every((x) => x.w && x.h), "falta width/height");
    });
  }
  await contexto.close();
}

await navegador.close();
servidor.close();
console.log(`\n${ok} ✓ · ${mal} ✗` + (mal ? "\nFallan: " + fallos.join(" · ") : ""));
process.exit(mal ? 1 : 0);
