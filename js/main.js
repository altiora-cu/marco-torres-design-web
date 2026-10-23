/* =============================================================
   MARCOS TORRES · «La sala nocturna»
   Todo el contenido viene de js/config.js. Este archivo solo lo pinta
   y le da movimiento. Reglas: nada de fetch de assets locales,
   el hero siempre tiene su fondo de respaldo (CSS), el 3D se carga
   diferido y se apaga con «reducir movimiento».
   ============================================================= */
(function () {
  "use strict";
  const C = window.SITE_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const piezas = C.catalogo || [];
  const enPortada = !!$(".hero");

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const leer = (ruta) => ruta.split(".").reduce((o, k) => (o == null ? o : o[k]), C);
  const idle = (fn, ms) => ("requestIdleCallback" in window) ? window.requestIdleCallback(fn, { timeout: ms + 1500 }) : setTimeout(fn, ms);

  /* ---------- WhatsApp: el número sale SOLO de config.js ---------- */
  const numero = String((C.contacto && C.contacto.whatsapp) || "").replace(/\D/g, "");
  const waLink = (msg) => "https://wa.me/" + numero + "?text=" + encodeURIComponent(msg);
  function enlazarWa(a, msg) {
    if (!a || !numero) return;
    a.href = waLink(msg); a.target = "_blank"; a.rel = "noopener";
  }
  const msgPieza = (p) => ((C.mensajes && C.mensajes.pieza) || "").replace("{pieza}", p.nombre);

  /* ---------- Textos ---------- */
  function conAcento(el, texto, acento) {
    const i = acento ? texto.indexOf(acento) : -1;
    if (i < 0) { el.textContent = texto; return; }
    el.innerHTML = esc(texto.slice(0, i)) + "<em>" + esc(acento) + "</em>" + esc(texto.slice(i + acento.length));
  }
  function pintarTextos() {
    $$("[data-t]").forEach((el) => {
      const v = leer(el.dataset.t);
      if (v == null || typeof v === "object") return;
      if (el.dataset.acento) conAcento(el, String(v), leer(el.dataset.acento));
      else el.textContent = v;
    });
    $$("[data-aria]").forEach((el) => { const v = leer(el.dataset.aria); if (v) el.setAttribute("aria-label", v); });
    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
    $$("[data-wa]").forEach((a) => enlazarWa(a, (C.mensajes && C.mensajes[a.dataset.wa]) || ""));
  }

  /* ---------- Menú: isla + telón en móvil ---------- */
  function pintarMenu() {
    const enlaces = (C.menu && C.menu.enlaces) || [];
    const destino = (d) => (enPortada ? d.replace(/^index\.html/, "") : d);
    const isla = $("[data-menu]"), telon = $("[data-menu-telon]");
    if (isla) isla.innerHTML = enlaces.map((e) => `<a href="${esc(destino(e.destino))}">${esc(e.texto)}</a>`).join("");
    if (telon) {
      telon.innerHTML = enlaces.map((e) => `<li><a href="${esc(destino(e.destino))}">${esc(e.texto)}</a></li>`).join("") +
        `<li><a data-wa="encargo" href="#">${esc(C.menu && C.menu.cta)}</a></li>`;
      enlazarWa($("[data-wa]", telon), (C.mensajes && C.mensajes.encargo) || "");
    }
    const boton = $(".isla__menu"), capa = $("#telon"), etiqueta = boton && $(".sr-only", boton);
    if (!boton || !capa) return;
    function menu(abrir) {
      boton.setAttribute("aria-expanded", abrir);
      if (etiqueta) etiqueta.textContent = abrir ? C.menu.cerrar : C.menu.abrir;
      document.body.classList.toggle("sin-scroll", abrir);
      if (abrir) { capa.hidden = false; requestAnimationFrame(() => capa.classList.add("abierto")); const a = $("a", capa); if (a) a.focus(); }
      else { capa.classList.remove("abierto"); capa.hidden = true; }
    }
    boton.addEventListener("click", () => menu(boton.getAttribute("aria-expanded") !== "true"));
    capa.addEventListener("click", (e) => { if (e.target.closest("a")) menu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !capa.hidden) { menu(false); boton.focus(); } });
  }

  /* ---------- Hero: video diferido sobre el fondo de respaldo ---------- */
  function heroVideo() {
    const v = $(".hero__video");
    if (!v || reduce) return;                        // queda el fondo (hero-bg.webp, en CSS)
    const con = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (con && (con.saveData || /(^|-)2g$/.test(con.effectiveType || ""))) return;
    const movil = window.matchMedia("(max-width: 720px)").matches;
    const src = movil && C.marca.heroVideoMobile ? C.marca.heroVideoMobile : C.marca.heroVideo;
    if (!src) return;
    // Se asigna el src directo (sin fetch: rompería el doble clic en file://)
    v.addEventListener("loadedmetadata", () => {
      if (v.videoHeight > v.videoWidth) $(".hero").classList.add("hero--vertical");
    }, { once: true });
    v.addEventListener("loadeddata", () => { v.classList.add("lista"); const p = v.play(); if (p && p.catch) p.catch(() => {}); }, { once: true });
    v.addEventListener("error", () => v.classList.remove("lista"));
    v.preload = "auto";                              // con preload="none" el navegador no lo pediría nunca
    v.src = src;
    v.load();
  }

  /* ---------- La sala (portada) ---------- */
  function fotoPieza(p, i, eager) {
    return `<img src="${esc(p.img)}" alt="Reloj ${esc(p.nombre)}, ${esc(p.sub)}" width="${p.ancho}" height="${p.alto}" loading="${eager ? "eager" : "lazy"}"${i === 0 && eager ? ' fetchpriority="high"' : ""} decoding="async">`;
  }
  function obraHtml(p, i, eager) {
    return `<li class="obra" data-i="${i}">
      <span class="obra__luz" aria-hidden="true"></span>
      <button class="obra__boton" type="button" data-abrir="${i}" aria-label="${esc((C.vitrina && C.vitrina.abrir) || "")} ${esc(p.nombre)}">
        <figure>${fotoPieza(p, i, eager)}<span class="obra__velo"></span></figure>
        <span class="ficha">
          <span class="ficha__serie">${esc(p.categoria)}</span>
          <span class="ficha__nombre">${esc(p.nombre)}</span>
          <span class="ficha__sub">${esc(p.sub)}</span>
        </span>
      </button>
    </li>`;
  }
  let irA = null, marcarActiva = () => {};
  function pintarSala() {
    const pista = $("#pista"), plano = $("#plano"), sala = $(".sala");
    if (!pista) return;
    pista.innerHTML = piezas.map((p, i) => obraHtml(p, i, false)).join("");
    plano.innerHTML = piezas.map((p, i) => `<li><button type="button" data-ir="${i}">${esc(p.nombre)}</button></li>`).join("");
    const obras = $$(".obra", pista), botones = $$("[data-ir]", plano);
    marcarActiva = (i) => {
      obras.forEach((o, k) => { o.classList.toggle("activa", k === i); o.classList.toggle("izq", k < i); o.classList.toggle("der", k > i); });
      botones.forEach((b, k) => b.setAttribute("aria-current", k === i ? "true" : "false"));
    };
    marcarActiva(0);
    // Carril con imán (móvil, sin GSAP o con movimiento reducido): la pieza centrada se ilumina
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((ent) => {
        if (sala.classList.contains("con-pin")) return;
        ent.forEach((e) => { if (e.isIntersecting) marcarActiva(+e.target.dataset.i); });
      }, { root: pista, threshold: 0.6 });
      obras.forEach((o) => io.observe(o));
    }
    irA = (i) => {
      const o = obras[i];
      pista.scrollTo({ left: o.offsetLeft + o.offsetWidth / 2 - pista.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
      marcarActiva(i);
    };
    plano.addEventListener("click", (e) => { const b = e.target.closest("[data-ir]"); if (b) irA(+b.dataset.ir); });
  }

  /* ---------- La colección (catalogo.html) ---------- */
  function pintarColeccion() {
    const lista = $("#coleccion");
    if (!lista) return;
    // Las tres primeras se piden ya (son las que se ven al abrir); el resto, al acercarse
    lista.innerHTML = piezas.map((p, i) => obraHtml(p, i, i < 3)).join("");
  }

  /* ---------- Vitrina: detalle con inclinación 3D ---------- */
  function vitrina() {
    const dlg = $("#vitrina");
    if (!dlg || !piezas.length) return;
    let actual = 0;
    const V = C.vitrina || {};
    function pintar(i) {
      actual = (i + piezas.length) % piezas.length;
      const p = piezas[actual];
      const img = $("#v-img");
      img.src = p.img; img.width = p.ancho; img.height = p.alto; img.alt = "Reloj " + p.nombre + ", " + p.sub;
      $("#v-serie").textContent = p.categoria; $("#v-nombre").textContent = p.nombre; $("#v-sub").textContent = p.sub;
      $("#v-texto").textContent = p.descripcion;
      $("#v-tipo").textContent = (V.relojDe || "") + " " + p.tipo.toLowerCase();
      $("#v-mat").textContent = p.material;
      enlazarWa($("#v-cta"), msgPieza(p));
      const parecida = $("#v-parecida");
      parecida.dataset.preset = p.historia;
      parecida.href = (enPortada ? "" : "index.html?historia=" + encodeURIComponent(p.historia)) + "#tu-reloj";
    }
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-abrir]");
      if (!b) return;
      pintar(+b.dataset.abrir);
      dlg.showModal();
    });
    $("#v-prev").addEventListener("click", () => pintar(actual - 1));
    $("#v-next").addEventListener("click", () => pintar(actual + 1));
    $("#v-cerrar").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") pintar(actual - 1);
      if (e.key === "ArrowRight") pintar(actual + 1);
    });
    $("#v-parecida").addEventListener("click", (e) => {
      if (!enPortada) return;                         // en el catálogo navega a la portada con ?historia=
      e.preventDefault();
      dlg.close();
      elegirHistoria(e.currentTarget.dataset.preset);
      const destino = $("#tu-reloj");
      if (destino) destino.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
    const obra = $("#v-obra");
    if (!reduce && window.matchMedia("(pointer: fine)").matches) {
      obra.addEventListener("pointermove", (e) => {
        const r = obra.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        obra.style.setProperty("--ry", ((x - 0.5) * 16).toFixed(2) + "deg");
        obra.style.setProperty("--rx", ((0.5 - y) * 12).toFixed(2) + "deg");
        obra.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
        obra.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
      });
      obra.addEventListener("pointerleave", () => { obra.style.setProperty("--rx", "0deg"); obra.style.setProperty("--ry", "0deg"); });
    }
  }

  /* ---------- Artista y pasos ---------- */
  function pintarArtista() {
    const a = C.artista || {};
    const img = $("[data-retrato]");
    if (img && a.retrato) {
      img.src = a.retrato;
      if (a.retratoPequeno) { img.srcset = a.retratoPequeno + " 600w, " + a.retrato + " 900w"; img.sizes = "(max-width: 760px) 92vw, 40vw"; }
      img.alt = a.retratoAlt || a.titulo || "";
    }
    const p = $("[data-artista-parrafos]");
    if (p) p.innerHTML = (a.parrafos || []).map((t) => `<p>${esc(t)}</p>`).join("");
    const v = $("[data-valores]");
    if (v) v.innerHTML = (a.valores || []).map((x) => `<div><dt>${esc(x.titulo)}</dt><dd>${esc(x.texto)}</dd></div>`).join("");
    const pasos = $("[data-pasos]");
    if (pasos) pasos.innerHTML = ((C.encargos && C.encargos.pasos) || []).map((s) =>
      `<li class="paso" data-aparece><span class="paso__n" aria-hidden="true">${esc(s.n)}</span><h3>${esc(s.titulo)}</h3><p>${esc(s.texto)}</p></li>`).join("");
  }

  /* ---------- «Tu reloj»: constructor del encargo ---------- */
  const eleccion = {};
  let elegirHistoria = () => {};
  function tuReloj() {
    const T = C.tuReloj, caja = $("[data-preguntas]");
    if (!T || !caja) return;
    T.preguntas.forEach((q) => (eleccion[q.grupo] = q.inicial));
    caja.innerHTML = T.preguntas.map((q) => `<fieldset><legend>${esc(q.pregunta)}</legend>
      <div class="chips" data-grupo="${esc(q.grupo)}">${q.opciones.map((o) =>
        `<button type="button" data-v="${esc(o.valor)}" aria-pressed="${o.valor === q.inicial}">${esc(o.valor)}</button>`).join("")}</div></fieldset>`).join("");
    const nota = $("#nota"), img = $("#vista-img"), cta = $("#vista-cta");
    nota.maxLength = T.notaMax || 180;
    nota.placeholder = T.notaEjemplo || "";
    const frase = (grupo) => {
      const q = T.preguntas.find((x) => x.grupo === grupo);
      const o = q && q.opciones.find((x) => x.valor === eleccion[grupo]);
      return o ? o.frase : "";
    };
    let piezaVista = null;
    function vista() {
      const cands = piezas.filter((p) => p.historia === eleccion.historia);
      const p = cands.find((x) => x.tipo === eleccion.tipo) || cands[0] || piezas[0];
      if (p && p !== piezaVista) {
        const primera = !piezaVista;
        piezaVista = p;
        const poner = () => { img.src = p.img; img.width = p.ancho; img.height = p.alto; img.alt = "Reloj " + p.nombre + ", " + p.sub; img.classList.remove("cambia"); };
        if (primera || reduce) poner(); else { img.classList.add("cambia"); setTimeout(poner, 260); }
        $("#vista-nombre").textContent = p.nombre;
      }
      const mat = frase("material");
      let msg = `${T.mensajeInicio} ${frase("tipo")} ${T.mensajeCuente} ${frase("historia")}` + (mat ? `${T.mensajeMaterial} ${mat}.` : ".");
      const extra = nota.value.trim();
      if (extra) msg += " " + extra;
      $("#vista-msg").textContent = msg;
      enlazarWa(cta, msg);
    }
    function elegir(grupo, valor) {
      const grupoCaja = $(`.chips[data-grupo="${grupo}"]`);
      const b = grupoCaja && $$("button", grupoCaja).find((x) => x.dataset.v === valor);
      if (!b) return;
      eleccion[grupo] = valor;
      $$("button", grupoCaja).forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
      vista();
    }
    elegirHistoria = (v) => elegir("historia", v);
    caja.addEventListener("click", (e) => {
      const b = e.target.closest(".chips button");
      if (b) elegir(b.closest(".chips").dataset.grupo, b.dataset.v);
    });
    nota.addEventListener("input", vista);
    vista();
    // Viene del catálogo con «Contar algo parecido»: index.html?historia=Familia#tu-reloj
    const pedida = new URLSearchParams(location.search).get("historia");
    if (pedida) elegir("historia", pedida);
  }

  /* ---------- Instagram: 7 reels, embed oficial al entrar en pantalla ---------- */
  function instagram() {
    const I = C.instagram, carril = $("#reels"), seccion = $("#redes");
    if (!I || !carril) return;
    const cuentas = $("[data-cuentas]");
    if (cuentas) cuentas.innerHTML = (I.cuentas || []).map((c) =>
      `<a class="btn btn--linea btn--sm" href="https://www.instagram.com/${esc(c.usuario)}/" target="_blank" rel="noopener">@${esc(c.usuario)} · ${esc(c.etiqueta)}</a>`).join("");
    carril.innerHTML = (I.reels || []).map((url, i) => `<li class="reel">
      <div class="reel__marco"><div class="ig-embed" data-permalink="${esc(url)}">
        <p class="ig-espera">${esc(I.cargando)}</p>
        <a class="ig-enlace" href="${esc(url)}" target="_blank" rel="noopener">${esc(I.verEnInstagram)} <span class="sr-only">(${i + 1})</span></a>
      </div></div></li>`).join("");
    let montado = false;
    function montar() {
      if (montado) return;
      montado = true;
      $$(".ig-embed", carril).forEach((caja) => {
        const url = caja.dataset.permalink;
        caja.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${esc(url)}?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#fff;border:0;margin:0;max-width:540px;min-width:0;width:100%;">` +
          `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(I.verEnInstagram)}</a></blockquote>`;
      });
      if (window.instgrm) { window.instgrm.Embeds.process(); return; }
      const s = document.createElement("script");
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      s.onload = () => {
        if (window.instgrm) window.instgrm.Embeds.process();
        // Los iframes crecen al cargar: se recalculan los disparadores de scroll
        setTimeout(() => window.ScrollTrigger && window.ScrollTrigger.refresh(), 2000);
      };
      document.body.appendChild(s);
    }
    if (!("IntersectionObserver" in window)) montar();
    else {
      const io = new IntersectionObserver((ent) => { if (ent.some((e) => e.isIntersecting)) { io.disconnect(); montar(); } });
      io.observe(seccion);
    }
    $$("[data-carril]").forEach((b) => b.addEventListener("click", () => {
      const paso = (carril.firstElementChild ? carril.firstElementChild.getBoundingClientRect().width : 320) + 24;
      carril.scrollBy({ left: paso * +b.dataset.carril, behavior: reduce ? "auto" : "smooth" });
    }));
  }

  /* ---------- Pie ---------- */
  function pintarPie() {
    const social = $("[data-social]");
    if (!social) return;
    const k = C.contacto || {}, links = [];
    if (numero) links.push(`<a data-wa="pie" href="#">WhatsApp</a>`);
    if (k.instagram) links.push(`<a href="https://www.instagram.com/${esc(k.instagram)}/" target="_blank" rel="noopener">@${esc(k.instagram)}</a>`);
    if (k.instagramPersonal) links.push(`<a href="https://www.instagram.com/${esc(k.instagramPersonal)}/" target="_blank" rel="noopener">@${esc(k.instagramPersonal)}</a>`);
    if (k.email) links.push(`<a href="mailto:${esc(k.email)}">Email</a>`);
    social.innerHTML = links.join("");
    enlazarWa($("[data-wa]", social), (C.mensajes && C.mensajes.pie) || "");
  }

  /* ---------- Entradas al hacer scroll (sin GSAP) ---------- */
  function entradas() {
    if (reduce || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-mov");
    const io = new IntersectionObserver((ent) => ent.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visto");
      io.unobserve(e.target);
    }), { rootMargin: "0px 0px -8% 0px" });
    $$("[data-aparece], .obra").forEach((el, i) => { el.style.setProperty("--d", (i % 4) * 70 + "ms"); io.observe(el); });
  }

  /* ---------- 3D diferido: GSAP solo en escritorio y con movimiento permitido ---------- */
  const GSAP = [
    ["https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", "sha384-g4NTh/Iv5PPU4xPyhEWqPcwtNXOvdaDI8LLnyYfyNZOjKJeYQyjzQ9X5275eBjpt"],
    ["https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js", "sha384-Z3REaz79l2IaAZqJsSABtTbhjgOUYyV3p90XNnAPCSHg3EMTz1fouunq9WZRtj3d"],
  ];
  function cargarScript([src, sri]) {
    return new Promise((ok, mal) => {
      const s = document.createElement("script");
      s.src = src; s.integrity = sri; s.crossOrigin = "anonymous"; s.onload = ok; s.onerror = mal;
      document.head.appendChild(s);
    });
  }
  function tresD() {
    const sala = $(".sala");
    if (!enPortada || !sala || reduce) return;
    if (!window.matchMedia("(min-width: 900px) and (pointer: fine)").matches) return; // móvil: carril nativo
    cargarScript(GSAP[0]).then(() => cargarScript(GSAP[1])).then(iniciar3D).catch(() => {}); // sin CDN: queda el carril estático
  }
  function iniciar3D() {
    const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const sala = $(".sala"), pista = $("#pista");

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      // Hero: profundidad con el cursor y salida suave al bajar
      const fondo = $(".hero__fondo"), texto = $(".hero__texto");
      gsap.to(texto, { y: -70, autoAlpha: 0.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(fondo, { scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      const fx = gsap.quickTo(fondo, "x", { duration: 1.2, ease: "power3" }), fy = gsap.quickTo(fondo, "y", { duration: 1.2, ease: "power3" });
      const tx = gsap.quickTo(texto, "x", { duration: 1.2, ease: "power3" });
      const mover = (e) => { const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5; fx(nx * -22); fy(ny * -14); tx(nx * 10); };
      $(".hero").addEventListener("pointermove", mover);

      // Pasillo: el scroll vertical mueve la sala en horizontal; cada pieza gira según su distancia al centro
      sala.classList.add("con-pin");
      const pin = $(".sala__pin"), obras = $$(".obra", pista);
      const botones = obras.map((o) => $(".obra__boton", o)), velos = obras.map((o) => $(".obra__velo", o));
      const distancia = () => Math.max(0, pista.scrollWidth - innerWidth);
      let activa = -1;
      function profundidad() {
        const mitad = innerWidth / 2;
        let mejor = 0, menor = 9;
        obras.forEach((o, i) => {
          const r = o.getBoundingClientRect();
          const d = gsap.utils.clamp(-1.2, 1.2, (r.left + r.width / 2 - mitad) / (innerWidth * 0.55));
          gsap.set(botones[i], { rotationY: d * -26, z: -Math.abs(d) * 140, transformPerspective: 1300 });
          gsap.set(velos[i], { opacity: Math.min(0.62, Math.abs(d) * 0.55) });
          if (Math.abs(d) < menor) { menor = Math.abs(d); mejor = i; }
        });
        if (mejor !== activa) { activa = mejor; marcarActiva(mejor); }
      }
      const tween = gsap.to(pista, {
        x: () => -distancia(), ease: "none", onUpdate: profundidad,
        scrollTrigger: { trigger: pin, pin: true, start: "top top", end: () => "+=" + distancia(), scrub: 1, invalidateOnRefresh: true, onRefresh: profundidad },
      });
      profundidad();
      const irAntes = irA;
      irA = (i) => {
        const st = tween.scrollTrigger, o = obras[i];
        const p = gsap.utils.clamp(0, 1, (o.offsetLeft + o.offsetWidth / 2 - innerWidth / 2) / (distancia() || 1));
        window.scrollTo({ top: st.start + p * (st.end - st.start), behavior: "smooth" });
      };
      return () => {
        sala.classList.remove("con-pin");
        $(".hero").removeEventListener("pointermove", mover);
        irA = irAntes;
        gsap.set(botones.concat(velos, [pista, fondo, texto]), { clearProps: "all" });
      };
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  /* ---------- SEO: Schema.org ---------- */
  function schema() {
    const k = C.contacto || {};
    const data = {
      "@context": "https://schema.org", "@type": "LocalBusiness",
      name: C.marca && C.marca.nombre, description: C.seo && C.seo.descripcion,
      image: C.marca && C.marca.heroPoster, url: C.seo && C.seo.url,
      address: { "@type": "PostalAddress", addressLocality: k.ciudad },
    };
    if (k.email) data.email = k.email;
    if (numero) data.telephone = "+" + numero;
    data.sameAs = [k.instagram, k.instagramPersonal].filter(Boolean).map((u) => "https://www.instagram.com/" + u + "/");
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ---------- Arranque ---------- */
  function iniciar() {
    pintarMenu();
    pintarSala();
    pintarColeccion();
    pintarArtista();
    pintarPie();
    pintarTextos();
    tuReloj();
    vitrina();
    instagram();
    entradas();
    schema();
    // Lo pesado espera a que la página ya se vea
    const despues = () => idle(() => { heroVideo(); tresD(); }, 300);
    if (document.readyState === "complete") despues(); else window.addEventListener("load", despues, { once: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
