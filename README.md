# Marcos Torres — Relojes Artesanales de Lujo

Sitio web premium de una sola página para Marcos Torres, artesano de relojes de lujo hechos a mano en Miami.

Dirección visual **"Dark premium artesanal"** · HTML + CSS + JS puro, sin frameworks ni build.

---

## 🚀 Publicar el sitio (1 comando)

Requisito, una sola vez en la máquina:

```bash
brew install gh
gh auth login
```

Luego:

```bash
./deploy.sh
```

El script crea el repositorio en GitHub, sube el sitio, activa GitHub Pages e imprime el link en vivo.

---

## ✏️ Cómo editar el contenido

**Todo lo editable está en un solo archivo: [`js/config.js`](js/config.js).**
No hace falta tocar el HTML.

### Cambiar contacto (WhatsApp, email, Instagram)
Abre `js/config.js` → sección `contacto`:

```js
contacto: {
  whatsapp: "1305XXXXXXX",   // solo números, con código de país (1 = EE.UU.)
  email: "hola@marcostorres.com",
  instagram: "artesaniacuba_oficial",
  ciudad: "Miami, Florida",
}
```

> El número de WhatsApp alimenta el botón flotante verde, los enlaces del pie y el formulario de encargos (que arma un mensaje listo para enviar).

### Agregar una pieza al catálogo
1. Optimiza la foto a WebP y colócala en `assets/img/` (grande) y `assets/thumbs/` (miniatura).
2. En `js/config.js` → `catalogo`, copia un bloque y cambia los campos:

```js
{
  nombre: "Nombre de la pieza",
  categoria: "Serie o tipo",
  descripcion: "Una frase que cuenta la historia.",
  img: "assets/img/mi-pieza.webp",
  thumb: "assets/thumbs/mi-pieza.webp",
}
```

### Cambiar textos (bio, pasos, taglines)
Están todos en `js/config.js`, en las secciones `marca`, `artista` y `encargos`.

---

## 🎬 Añadir el video hero (opcional, premium)

El hero muestra la imagen `heroPoster` por defecto. Cuando el video cinematográfico esté listo:

1. Guárdalo como `assets/video/hero.mp4` (optimizado para web, ~5 MB, sin audio).
2. Listo — el sitio lo detecta y lo reproduce de fondo automáticamente.

---

## 📁 Estructura

```
marco-torres-design-web/
├── index.html          Estructura de la página
├── css/styles.css      Estilos (dark premium artesanal)
├── js/config.js        ← ÚNICO archivo a editar (contenido)
├── js/main.js          Interacciones (no editar)
├── assets/img/         Fotos grandes (WebP) + cursor
├── assets/thumbs/      Miniaturas del catálogo (WebP)
├── assets/video/       Video hero (opcional)
└── deploy.sh           Publicación en 1 comando
```

---

## 🔍 Ver el sitio en local

```bash
python3 -m http.server 8080
# abre http://localhost:8080
```

---

*Producido con el flujo de agencia web premium · Marcos Torres Design · 2026*
