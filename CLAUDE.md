# CLAUDE.md — Marcos Torres Design

Instrucciones para cualquier sesión de Claude que trabaje en este repositorio.
**Léelas antes de tocar código.**

---

## Qué es este proyecto

Sitio web comercial de **Marcos Torres Estévez**, artista plástico y artesano cubano
radicado en Miami que crea relojes artesanales de lujo por encargo. Cliente de la
agencia Mirai Digital Group (Fase 1 del plan de negocios de Frank).

- **Publicado en:** https://altiora-cu.github.io/marco-torres-design-web/
- **Repo:** `altiora-cu/marco-torres-design-web` · GitHub Pages desde `main`, raíz `/`
- **Stack:** HTML + CSS + JS puro. Sin frameworks, sin build, sin dependencias.

---

## ⚠️ Reglas que no se rompen

1. **El nombre es "Marcos Torres"** — con S. Nunca "Marco". Aparece así en sus piezas
   físicas, su firma y sus redes. Confirmado por el cliente.

2. **Todo el contenido vive en `js/config.js`.** El HTML son contenedores vacíos que
   JavaScript rellena. Para cambiar textos, contacto o catálogo se edita *solo* ese
   archivo — nunca el HTML. Si agregas una sección nueva, sigue ese patrón.

3. **Dirección visual: "Dark premium artesanal".** Fondo #0d0b09, dorado #c9a45c,
   texto #f2ece1, serif Cormorant Garamond + sans Hanken Grotesk.
   Hubo un intento de pasar el sitio a paleta clara (crema) y **se revirtió** —
   el cliente prefiere el oscuro. No la vuelvas a cambiar sin pedirlo.

4. **Nada de `fetch()` para cargar assets locales.** Rompe al abrir el sitio con
   doble clic (`file://`) y deja el hero vacío. Ya pasó una vez. Asigna los `src`
   directo al elemento.

5. **El hero siempre debe tener respaldo visual.** El póster va como `background`
   del contenedor, así hay imagen aunque el video falle, tarde o el navegador
   bloquee el autoplay (pasa en varios móviles).

6. **Presupuesto de peso:** el video del hero no debe pasar de ~600 KB. Está en
   593 KB (desktop) y 538 KB (móvil). Google penaliza el LCP por encima de ~1 MB.
   Si regeneras el banner, comprime antes de commitear.

7. **No quemes texto dentro del video.** Titular y CTA van en HTML encima, así
   indexan en Google y se cambian sin regenerar nada.

---

## Estructura

```
marco-torres-design-web/
├── index.html          # Portada: hero, artista, encargos, contacto
├── catalogo.html       # Galería completa de piezas
├── css/styles.css      # Design tokens arriba (:root), luego secciones
├── js/config.js        # ⭐ TODO el contenido editable
├── js/main.js          # Render del contenido + interacciones
├── assets/video/       # hero.mp4 (desktop) · hero-mobile.mp4
├── assets/img/         # Fotos de piezas, retrato, póster, cursor
└── deploy.sh           # Publicación en GitHub Pages
```

---

## Cómo se trabaja aquí

**Para cambiar textos o contacto:** editar `js/config.js`. Nada más.

**Para agregar una pieza al catálogo:**
1. Guardar la foto en `assets/img/` (WebP, máx ~1600px de lado)
2. Añadir la entrada al array `catalogo` en `js/config.js`

**Para regenerar el banner:** las fotos fuente están en `../banner/` y `../relojes/`
(fuera del repo). El prompt que funcionó está en `../banner/PROMPT-banner-seedance.txt`.
El método probado: generar un clip por toma + puentes de cámara anclados frame a frame
(último frame de una toma = primer frame del puente), unir con ffmpeg sin fundidos.
Ver `../FLUJO-AGENCIA-WEB-PREMIUM.md` para el proceso completo.

**Antes de dar algo por terminado:**
- Abrir `index.html` con doble clic y confirmar que carga (prueba de `file://`, la hace Frank)
- Claude revisa con `preview_start marcos-web` (puerto 8123): el panel del navegador no abre `file://`
- Revisar en 375px de ancho, no solo en escritorio
- Verificar contraste si tocaste colores (mínimo WCAG AA 4.5:1 en texto normal)

**Para publicar:** `git push` (GitHub Pages se actualiza solo en 1-2 min).
Después abrir con **Cmd+Shift+R** — el CSS viejo queda en caché.

---

## Contexto del cliente

Marcos trabaja con maderas finas, resinas, acrílicos y metales. Diseños 100% propios,
sin plantillas ni réplicas en serie. Ha hecho piezas para **Marc Anthony**,
**Ariel Joyería** y **Carlos Marcelin (CRM Jewelers)** — eso es prueba social fuerte,
úsalo en el copy cuando aplique.

Su diferenciador real: integra la identidad del cliente en la pieza (sus raíces,
pasiones, el mapa de su país). No vende relojes, vende historias convertidas en objeto.
El copy debe sostener eso, no caer en "calidad premium" genérico.

**Tono:** español, cálido, artesanal. Nada de jerga de marketing.

---

## Notas para Frank

Este proyecto es el caso de estudio del paquete web premium de tu agencia
($2,500–5,000 en el mercado de Miami). El flujo completo replicable está documentado
en `../FLUJO-AGENCIA-WEB-PREMIUM.md`. Cuando entre el próximo cliente, ese documento
es el punto de partida — no empieces de cero.
