/* =============================================================
   MARCOS TORRES · Interacciones
   Todo el contenido proviene de js/config.js
   ============================================================= */
(function () {
  "use strict";
  const C = window.SITE_CONFIG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Utilidades de contacto ---------- */
  const waNumber = (C.contacto?.whatsapp || "").replace(/\D/g, "");
  const waLink = (msg) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  /* ---------- Poblar textos ---------- */
  function fillText() {
    $$("[data-brand]").forEach((el) => (el.textContent = C.marca?.nombre || "Marcos Torres"));
    const sub = $("[data-subtitulo]");
    if (sub && C.marca?.subtitulo) sub.textContent = C.marca.subtitulo;
    $$("[data-ciudad]").forEach((el) => (el.textContent = C.contacto?.ciudad || ""));
    const yr = $("[data-year]");
    if (yr) yr.textContent = new Date().getFullYear();

    // Artista
    const a = C.artista || {};
    if ($("[data-artista-titulo]") && a.titulo) $("[data-artista-titulo]").textContent = a.titulo;
    if ($("[data-retrato]") && a.retrato) $("[data-retrato]").src = a.retrato;
    const pWrap = $("[data-artista-parrafos]");
    if (pWrap && a.parrafos) pWrap.innerHTML = a.parrafos.map((p) => `<p>${p}</p>`).join("");
    const vWrap = $("[data-valores]");
    if (vWrap && a.valores) {
      vWrap.innerHTML = a.valores
        .map(
          (v) => `<div class="valor"><span class="valor__icon">${v.icono}</span>
            <div><h4>${v.titulo}</h4><p>${v.texto}</p></div></div>`
        )
        .join("");
    }

    // Encargos
    const e = C.encargos || {};
    if ($("[data-encargos-titulo]") && e.titulo) $("[data-encargos-titulo]").textContent = e.titulo;
    if ($("[data-encargos-sub]") && e.subtitulo) $("[data-encargos-sub]").textContent = e.subtitulo;
    const stepsWrap = $("[data-pasos]");
    if (stepsWrap && e.pasos) {
      stepsWrap.innerHTML = e.pasos
        .map(
          (p) => `<div class="step"><div class="step__n">${p.n}</div>
            <h4>${p.titulo}</h4><p>${p.texto}</p></div>`
        )
        .join("");
    }

    // Social / footer
    const social = $("[data-social]");
    if (social) {
      const links = [];
      if (waNumber) links.push(`<a href="${waLink("Hola Marcos, vi tu página y me interesa una pieza.")}" target="_blank" rel="noopener">WhatsApp</a>`);
      if (C.contacto?.instagram) links.push(`<a href="https://instagram.com/${C.contacto.instagram}" target="_blank" rel="noopener">Instagram</a>`);
      if (C.contacto?.email) links.push(`<a href="mailto:${C.contacto.email}">Email</a>`);
      social.innerHTML = links.join("");
    }

    // WhatsApp directo
    const waDirect = $("[data-whatsapp-direct]");
    if (waDirect) {
      waDirect.href = waLink("Hola Marcos, vi tu página y quiero encargar una pieza.");
      waDirect.target = "_blank";
      waDirect.rel = "noopener";
    }
  }

  /* ---------- Título letra a letra (acabado metálico) ---------- */
  function splitTitle() {
    const el = $("[data-hero-title]");
    if (!el) return;
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    let i = 0;
    words.forEach((word, w) => {
      const wSpan = document.createElement("span");
      wSpan.className = "word";
      [...word].forEach((ch) => {
        const c = document.createElement("span");
        c.className = "char";
        c.textContent = ch;
        c.style.animationDelay = reduce ? "0s" : `${0.25 + i * 0.03}s`;
        wSpan.appendChild(c);
        i++;
      });
      el.appendChild(wSpan);
      if (w < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  }

  /* ---------- Hero video (degradación elegante) ---------- */
  function heroVideo() {
    // Sin foto de fondo: el hero muestra el video, o fondo negro sólido si no reproduce.
    const v = $("[data-hero-video]");
    if (!v || reduce) return;
    // En teléfono usa la versión vertical (llena la pantalla); en desktop la horizontal.
    const isMobile = window.matchMedia("(max-width: 620px)").matches;
    const mobileSrc = C.marca?.heroVideoMobile;
    const src = isMobile && mobileSrc ? mobileSrc : C.marca?.heroVideo;
    if (!src) return;
    const portrait = src === mobileSrc;
    // Solo intenta cargar el video si el archivo existe
    fetch(src, { method: "HEAD" })
      .then((r) => {
        if (!r.ok) return;
        const s = document.createElement("source");
        s.src = src;
        s.type = "video/mp4";
        v.appendChild(s);
        v.load();
        if (portrait) { const hero = $(".hero"); if (hero) hero.classList.add("hero--portrait"); }
        v.addEventListener("loadeddata", () => v.classList.add("ready"));
        v.play().catch(() => {});
      })
      .catch(() => {});
  }

  /* ---------- Catálogo ---------- */
  let catData = C.catalogo || [];
  function renderCatalogo() {
    const grid = $("[data-catalogo]");
    if (!grid) return;
    grid.innerHTML = catData
      .map(
        (p, i) => `
      <article class="card" data-card="${i}">
        <div class="card__zoom">⤢</div>
        <div class="card__img"><img src="${p.thumb}" alt="${p.nombre}" loading="lazy" /></div>
        <div class="card__body">
          <span class="card__cat">${p.categoria || ""}</span>
          <h3 class="card__title">${p.nombre}</h3>
          <p class="card__desc">${p.descripcion || ""}</p>
        </div>
      </article>`
      )
      .join("");
    $$(".card", grid).forEach((card) => {
      card.addEventListener("click", () => openLightbox(+card.dataset.card));
    });
    // Si la grilla está visible por defecto (página de catálogo), revela las tarjetas al hacer scroll.
    if (!grid.hasAttribute("hidden")) {
      if (reduce) { $$(".card", grid).forEach((c) => c.classList.add("in")); return; }
      const io = new IntersectionObserver(
        (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
        { threshold: 0.1 }
      );
      $$(".card", grid).forEach((c) => io.observe(c));
    }
  }

  function toggleCatalogo() {
    const btn = $("[data-toggle-catalogo]");
    const grid = $("[data-catalogo]");
    if (!btn || !grid) return;
    btn.addEventListener("click", () => {
      const showing = !grid.hasAttribute("hidden");
      if (showing) {
        grid.setAttribute("hidden", "");
        btn.textContent = "Ver la colección";
      } else {
        grid.removeAttribute("hidden");
        btn.textContent = "Ocultar colección";
        requestAnimationFrame(() => {
          $$(".card", grid).forEach((c, i) => setTimeout(() => c.classList.add("in"), i * 70));
        });
        grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  /* ---------- Lightbox ---------- */
  let lbIndex = 0;
  function openLightbox(i) {
    lbIndex = i;
    updateLightbox();
    $("[data-lightbox]").removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  }
  function updateLightbox() {
    const p = catData[lbIndex];
    if (!p) return;
    const img = $("[data-lb-img]");
    // Crossfade suave al cambiar de pieza: desvanece, cambia, y reaparece al cargar.
    img.style.opacity = "0";
    img.src = p.img;
    img.alt = p.nombre;
    $("[data-lb-caption]").textContent = p.nombre;
    const show = () => { img.style.opacity = "1"; };
    if (img.complete) show();
    else img.onload = show;
  }
  function closeLightbox() {
    $("[data-lightbox]").setAttribute("hidden", "");
    document.body.style.overflow = "";
  }
  function initLightbox() {
    const lb = $("[data-lightbox]");
    if (!lb) return;
    $("[data-close-lightbox]")?.addEventListener("click", closeLightbox);
    $("[data-lb-prev]")?.addEventListener("click", () => { lbIndex = (lbIndex - 1 + catData.length) % catData.length; updateLightbox(); });
    $("[data-lb-next]")?.addEventListener("click", () => { lbIndex = (lbIndex + 1) % catData.length; updateLightbox(); });
    document.addEventListener("keydown", (ev) => {
      if (lb.hasAttribute("hidden")) return;
      if (ev.key === "Escape") closeLightbox();
      if (ev.key === "ArrowLeft") $("[data-lb-prev]").click();
      if (ev.key === "ArrowRight") $("[data-lb-next]").click();
    });
  }

  /* ---------- Modal + formulario → WhatsApp ---------- */
  function initModal() {
    const modal = $("[data-modal]");
    if (!modal) return;
    const open = () => { modal.removeAttribute("hidden"); document.body.style.overflow = "hidden"; };
    const close = () => { modal.setAttribute("hidden", ""); document.body.style.overflow = ""; };
    $$("[data-open-modal]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); open(); }));
    $$("[data-close-modal]").forEach((b) => b.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hasAttribute("hidden")) close(); });

    $("[data-form]")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const g = (n) => (f.elements[n]?.value || "").trim();
      const msg =
        `*Nuevo encargo — Marcos Torres*\n\n` +
        `• Nombre: ${g("nombre")}\n` +
        `• País: ${g("pais") || "—"}\n` +
        `• Estado/Ciudad: ${g("estado") || "—"}\n` +
        `• Teléfono: ${g("telefono") || "—"}\n` +
        `• Email: ${g("email") || "—"}\n\n` +
        `*Idea:* ${g("idea")}`;
      window.open(waLink(msg), "_blank", "noopener");
    });
  }

  /* ---------- Reveals con IntersectionObserver ---------- */
  function initReveals() {
    if (reduce) { $$(".reveal").forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { threshold: 0.15 }
    );
    $$(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- Nav scrolled ---------- */
  function initNav() {
    const nav = $("#nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Micro-parallax del hero ---------- */
  function initParallax() {
    if (reduce) return;
    const layer = $("[data-parallax]");
    const media = $(".hero__media");
    if (!layer) return;
    let x = 0, y = 0, ticking = false;
    const apply = () => {
      ticking = false;
      layer.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
      if (media) media.style.transform = `scale(1.06) translate(${x * -18}px, ${y * -12}px)`;
    };
    window.addEventListener("mousemove", (e) => {
      x = (e.clientX / window.innerWidth - 0.5);
      y = (e.clientY / window.innerHeight - 0.5);
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    }, { passive: true });
  }

  /* ---------- SEO: Schema.org LocalBusiness ---------- */
  function injectSchema() {
    const data = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: C.marca?.nombre,
      description: C.seo?.descripcion,
      image: C.marca?.heroPoster,
      address: { "@type": "PostalAddress", addressLocality: C.contacto?.ciudad },
      url: C.seo?.url,
    };
    if (C.contacto?.email) data.email = C.contacto.email;
    if (waNumber) data.telephone = "+" + waNumber;
    if (C.contacto?.instagram) data.sameAs = [`https://instagram.com/${C.contacto.instagram}`];
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ---------- Galería / Exposición (catalogo.html) ---------- */
  const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
  function renderGallery() {
    const wrap = $("[data-gallery]");
    if (!wrap) return;
    wrap.innerHTML = catData.map((p, i) => `
      <article class="plate reveal ${i % 2 ? "plate--right" : ""}" style="transition-delay:${(i % 2) * 60}ms">
        <div class="plate__art">
          <span class="spotlight" aria-hidden="true"></span>
          <figure class="frame" data-card="${i}" tabindex="0" role="button" aria-label="Ver ${p.nombre}">
            <div class="frame__mat"><img src="${p.thumb}" alt="${p.nombre}" loading="lazy" /></div>
          </figure>
          <span class="plinth" aria-hidden="true"></span>
        </div>
        <div class="plate__label">
          <span class="plate__num">${ROMAN[i] || i + 1}</span>
          <span class="eyebrow">${p.categoria || ""}</span>
          <h2 class="plate__name">${p.nombre}</h2>
          <p class="plate__desc">${p.descripcion || ""}</p>
          <div class="plate__meta">Pieza única · Hecha a mano</div>
          <button class="plate__cta" data-open-modal>Solicitar esta pieza →</button>
        </div>
      </article>`).join("");
    $$(".frame", wrap).forEach((f) => {
      const open = () => openLightbox(+f.dataset.card);
      f.addEventListener("click", open);
      f.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    fillText();
    splitTitle();
    heroVideo();
    renderCatalogo();
    renderGallery();
    toggleCatalogo();
    initLightbox();
    initModal();
    initReveals();
    initNav();
    initParallax();
    injectSchema();
  });
})();
