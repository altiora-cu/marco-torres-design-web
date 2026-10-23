# ESTADO DEL PROYECTO — Marcos Torres Design
**Actualizado:** 23 de octubre, 2026 (rama `rediseno-sala-nocturna`)

---

## 🟡 Estado general: EN CONSTRUCCIÓN (publicado en github.io, sin terminar)

**Sitio publicado:** https://altiora-cu.github.io/marco-torres-design-web/
Responde HTTP 200, pero Frank no lo da por terminado. Marcos es cliente **a cambio de colaboración**
(no paga en dinero; da testimonio, caso de estudio y referidos). Se le implantarán casi todos los servicios de Mirai.

---

## ✅ Lo que está terminado

| Área | Estado |
|---|---|
| **Banner hero** | Video de museo, 593 KB desktop / 538 KB móvil. No recorta en teléfono. |
| **Titular hero** | «Convirtiendo el tiempo en obras de arte» (pedido de Marcos 11/10, publicado 20/10). Se edita en `marca.tagline` de `config.js`. |
| **Paleta** | Dark premium artesanal (#0d0b09 + dorado #c9a45c) |
| **Catálogo** | 8 piezas publicadas, en `catalogo.html` + galería en portada (la pieza «Médico» se retiró el 23/10: la foto mostraba el nombre completo de una clienta) |
| **Sección artista** | Retrato + bio de Marcos. Foto estirada: corregida |
| **Encargos** | Proceso por pasos + formulario → WhatsApp (en la rama nueva: constructor «Tu reloj» → WhatsApp) |
| **Contacto real** | WhatsApp +1 (786) 241-4630 · marcos880729@icloud.com · @markidesign_ |
| **SEO** | Title, descripción y URL canónica configurados |
| **Rendimiento** | Banner 3× más liviano, no bloquea en conexión lenta |
| **Local (`file://`)** | Carga correctamente con doble clic |

## 🎨 Rediseño elegido (23/10/2026)

**Dirección A «La sala nocturna» + el constructor «Tu reloj» de la C** como sección de encargo.
Prototipos (fuera del repo, no se publican): `../propuestas-diseno-2026-10/` (`README.md` compara las tres;
preview `marcos-propuestas`, puerto 8131). B queda para una segunda fase; la paleta de C no se le enseña a Marcos.
Se construye en archivos nuevos en paralelo, sin sobrescribir la versión actual hasta que Frank apruebe.

**Reels elegidos por Frank para las ventanas de Instagram** (embed oficial, `embed.js` solo al entrar en pantalla):
- ~~https://www.instagram.com/reel/DW0AnY9jZOf/~~ — **retirado del sitio el 23/10** hasta que Legal decida (botella de licor de marca)
- https://www.instagram.com/reel/DVcjmtpjdeN/
- https://www.instagram.com/reel/DZGgNONt_h0/
- https://www.instagram.com/reel/DG1hiiGp74R/
- https://www.instagram.com/reel/Dag1ZEZNCZd/
- https://www.instagram.com/reel/DXSpXS3Df6K/
- https://www.instagram.com/reel/DdVEAPOtJJF/

**Bloqueos de Legal (22/10):** ningún nombre de famoso o cliente (Marc Anthony, CRM Jewelers, Ariel Joyería)
sin el anexo D firmado — aunque CLAUDE.md diga «úsalo en el copy»; nada de reseñas de Marcos en Google;
el testimonio declara siempre que los servicios fueron gratis. La foto de la colaboración de travertino deja ver
la marca de una botella: pendiente de Legal.

**Informes en el Vault** (`grupo/`): auditoría 360, playbook `relojes-artesanales-lujo` y borrador del acuerdo
de colaboración (`clientes/legal/2026-10-22-marcos-torres-acuerdo-colaboracion.md`).

---

## 📋 Pendientes

### Urgente
- [ ] **Enlace de las bios de Instagram** (@marki_marki_88 y @markidesign_) apunta a un WhatsApp **pausado**.
      Cambiar por `wa.me/17862414630` o por la web.

### Preguntas a Marcos (bloquean a Ventas y al acuerdo)
- [ ] Plazo de fabricación · anticipo y envío · mecanismo y garantía · ¿atiende en persona? (decide Google Business)
- [ ] Instagram oficial (¿@artesaniacuba_oficial es suyo?) · Facebook a enlazar · ¿WhatsApp Business?
- [ ] ¿Permiso escrito de los famosos? · ¿«Marcos Torres Design» es empresa registrada o persona física?

### Decisiones de Frank sobre el acuerdo
- [ ] Referidos (A sin comisión, recomendado) · la web pasa a Marcos al cumplir (recomendado) · qué pasa si incumple
- [ ] Costos de terceros (dominio, ads, herramientas) · alta de Marcos en FG OS · revisión por abogado de Florida y CPA

### Para el cliente
- [ ] **Texto encima del titular** — en el audio del 11/10 Marcos pidió cambiar también lo que
      está encima de «Convirtiendo el tiempo en obras de arte» (hoy «Relojes artesanales de lujo»,
      en `marca.subtitulo`), pero no dijo a qué. Preguntarle.
- [ ] **Facebook** — falta la URL exacta del perfil de Marcos (no está en `config.js`)
- [ ] **Dominio propio** — hoy corre en `github.io`. Un `.com` propio sube la
      percepción de marca y mejora el SEO. Costo ~$12/año.
      Al comprarlo hay que actualizar `seo.url` en `config.js`.

### Mejoras sugeridas (no bloquean)
- [ ] **Versión en inglés** — Miami es mercado bilingüe y sus clientes de alta gama
      muchas veces son angloparlantes. Es la mejora con más retorno pendiente.
- [ ] **Google Business Profile** — gratis, y es lo que hace aparecer el negocio en
      "relojes artesanales cerca de mí". Alto impacto, cero costo.
- [ ] **Píxel de Meta / Google Analytics** — hoy no hay forma de medir visitas
      ni de hacer retargeting a quien visitó sin encargar.
- [ ] **Testimonios** — tiene clientes de peso (Marc Anthony, CRM Jewelers) pero
      no hay testimonios escritos en el sitio. Es prueba social desaprovechada.

---

## 🗓️ Última sesión (22–23/10/2026) — rediseño PUBLICADO (`0d6020d`)

**Rama `rediseno-sala-nocturna`** (local, sin push; `main` conserva la versión publicada). Commits pequeños desde `0571007`.
- Dirección A «La sala nocturna» llevada al sitio real: isla de navegación, hero con video diferido sobre fondo de respaldo,
  pasillo 3D fijado con GSAP (solo escritorio, cargado en reposo desde cdnjs con SRI), plano de la sala, vitrina,
  sección del artesano, pasos + constructor **«Tu reloj»** (abre `wa.me` con el mensaje armado), pared con los **reels** (6 publicados)
  (embed oficial, `embed.js` solo al entrar la sección en pantalla, sin pie de foto) y catálogo nuevo.
- El formulario modal antiguo (nombre, país, teléfono, email) se retiró: lo sustituye «Tu reloj».
- Todo el contenido nuevo está en `js/config.js`. La pieza de travertino ya no nombra la marca (texto ni archivo).
- Auditoría corregida: CLS del catálogo 0,65 → 0,00 (respaldo de fuentes con `size-adjust` + hueco reservado), retrato
  467 KB → 87 KB (+ versión de 600 px), contraste del pie ≥ 4,5:1, enlaces del pie de 44 px, línea sobre el titular a 13 px.
- Lighthouse móvil local: portada 100/100/96/100 (LCP 1,8 s, CLS 0,002); catálogo 100/100/96/100 (LCP 1,6 s, CLS 0).
- CSP y Referrer-Policy por `<meta>`, favicon en línea, `og:image` absoluta + `twitter:card`, `robots.txt`, `sitemap.xml`.
- Pruebas: `tests/sitio.test.mjs`, 32/32 en verde (cómo correrlas en CLAUDE.md).

**Publicado el 23/10/2026** con la aprobación de Frank (merge de `rediseno-sala-nocturna` a `main`). Revisado en pantalla
por el CEO a 757 px y 375 px. Falta probar en Safari / iPhone real. El reel `DW0AnY9jZOf` quedó fuera (comentado en
`config.js`) hasta que Legal decida sobre la marca de licor, igual que la foto de travertino.
Comprobado en el sitio publicado: portada, catálogo, `robots.txt` y `sitemap.xml` dan 200; `medico.webp` da 404.
Pruebas: `NODE_PATH=~/.npm/_npx/e41f203b7505f1fb/node_modules node tests/sitio.test.mjs` (sin `NODE_PATH` no encuentra
Playwright) → 32/32. La rama `rediseno-sala-nocturna` ya está fusionada; se puede borrar.

**Siguiente sesión — empezar por aquí:**
1. Respuestas de Marcos a las 9 preguntas (ver Pendientes) → `mirai:ventas` arma la ficha de servicios del anexo A
   del acuerdo (catálogo `agencia` de FG OS, valor de referencia; no se cobra).
2. Decisiones de Frank sobre el acuerdo → `mirai:legal` cierra el borrador → abogado de Florida + CPA antes de firmar.
3. Alta de Marcos en FG OS (la hace Frank). Sin id no hay encargo.
4. Probar en un iPhone real. Luego: dominio propio, privacidad, 404, versión en inglés (*clock*, nunca *watch*).

## 🗓️ Sesión anterior (20/10/2026)

- Documentación `CLAUDE.md` + `ESTADO.md` creada y subida.
- Titular del hero cambiado según audio de Marcos; `main.js` ahora lo lee de `config.js`
  (antes estaba quemado en `index.html`). Publicado en `9c226b8`.
- Preview local: `preview_start marcos-web` (puerto 8123, launch.json de la carpeta raíz;
  symlink `~/Documents/claude code/marcos-torres-web`). `file://` no sirve para el panel.
- Decisión abierta: la línea pequeña sobre el titular (ver pendientes). En móvil se lee mal
  sobre el mapa dorado; puede ser el motivo del pedido.

---

## 📁 Dónde está cada cosa

```
markidising project/
├── marco-torres-design-web-live/   ← EL SITIO (repo git, esto se publica)
│   ├── CLAUDE.md                   ← reglas técnicas del proyecto
│   └── ESTADO.md                   ← este archivo
├── banner/                         ← fuentes del video + PROMPT-banner-seedance.txt
├── relojes/                        ← fotos de piezas sin procesar
├── FLUJO-AGENCIA-WEB-PREMIUM.md    ← playbook replicable de la agencia
└── 1–6.jpg/PNG, marcostorres.JPG   ← fotos originales de las 6 piezas + retrato
```

---

## 🔧 Operaciones frecuentes

**Publicar cambios:**
```bash
cd ~/Documents/"markidising project"/marco-torres-design-web-live
git add -A && git commit -m "descripción del cambio" && git push
```
Espera 1–2 minutos y abre con **Cmd+Shift+R** (recarga forzada, salta el caché).

**Cambiar un texto, el contacto o agregar una pieza:** editar `js/config.js`.
Es el único archivo que toca el contenido.

**Ver el sitio antes de publicar:** doble clic en `index.html` (Frank) o `preview_start marcos-web` (Claude, puerto 8123).

---

## 📈 Valor del proyecto

Paquete web premium con assets generados por IA: **$2,500–5,000 USD** en el mercado
de Miami. El proceso completo quedó documentado y es replicable con el próximo
cliente (ver `FLUJO-AGENCIA-WEB-PREMIUM.md`).

**Siguiente paso comercial sugerido:** pedirle a Marcos un testimonio en video o
escrito sobre el proceso. Es el activo que vende el próximo sitio.
