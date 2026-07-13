/* =============================================================
   MARCOS TORRES · CONFIGURACIÓN DEL SITIO
   -------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar.
   Cambia textos, contacto y catálogo aquí. No toques el HTML.
   ============================================================= */

window.SITE_CONFIG = {

  /* ---------- MARCA ---------- */
  marca: {
    nombre: "Marcos Torres",
    tagline: "Convirtiendo el tiempo en verdaderas obras de arte",
    subtitulo: "Relojes artesanales de lujo · Hechos a mano en Miami",
    // El hero usa este video de fondo si el archivo existe (FASE 2).
    // Mientras tanto muestra la imagen 'heroPoster'.
    heroVideo: "assets/video/hero.mp4",       // súbelo aquí cuando esté listo
    heroPoster: "assets/img/hero-bg.webp",      // imagen de respaldo del hero
  },

  /* ---------- CONTACTO ----------
     ⚠️ REEMPLAZA con los datos reales de Marcos.
     El teléfono va con código de país y SIN símbolos: 1305XXXXXXX */
  contacto: {
    whatsapp: "17862414630",                   // +1 (786) 241-4630 · Miami
    email: "marcos880729@icloud.com",          // email de contacto de Marcos
    instagram: "artesaniacuba_oficial",        // sin @
    ciudad: "Miami, Florida",
  },

  /* ---------- SOBRE EL ARTISTA ---------- */
  artista: {
    titulo: "El artesano detrás del tiempo",
    retrato: "assets/img/marcos-retrato.webp",
    parrafos: [
      "Marcos Torres transforma la madera y el tiempo en piezas únicas. Cada reloj nace a mano, pensado para contar una historia: la tuya.",
      "Desde su taller en Miami, une la tradición artesanal cubana con un acabado de lujo — negro profundo, vetas naturales y detalles en dorado que convierten cada hora en un recuerdo.",
      "No fabrica relojes en serie. Crea obras irrepetibles, personalizadas para cada persona, momento y ocasión.",
    ],
    valores: [
      { icono: "◆", titulo: "Diseño exclusivo", texto: "Cada pieza es única e irrepetible." },
      { icono: "✦", titulo: "Personalizado para ti", texto: "Lo diseñamos a partir de tu idea." },
      { icono: "❖", titulo: "Calidad premium", texto: "Materiales nobles y acabado de lujo." },
      { icono: "♥", titulo: "Hecho con pasión", texto: "Artesanía real, hecha a mano." },
    ],
  },

  /* ---------- CATÁLOGO ----------
     Para agregar una pieza: copia un bloque { ... } y cambia los campos.
     'img' = foto grande · 'thumb' = miniatura (ambas en assets/) */
  catalogo: [
    {
      nombre: "Cuba — Tiempo y Madera",
      categoria: "Edición limitada",
      descripcion: "El mapa de Cuba tallado en madera sobre fondo negro. Un homenaje a la raíz, hecho a mano.",
      img: "assets/img/cuba.webp",
      thumb: "assets/thumbs/cuba.webp",
    },
    {
      nombre: "Café — Ritual de la Mañana",
      categoria: "Serie Sabores",
      descripcion: "Granos de café reales embebidos en resina, madera de roble y una cafetera que parece flotar.",
      img: "assets/img/cafe.webp",
      thumb: "assets/thumbs/cafe.webp",
    },
    {
      nombre: "Piano de Cola",
      categoria: "Serie Música",
      descripcion: "Un piano de cola en negro laca con teclado real. Convirtiendo el tiempo en obras de arte.",
      img: "assets/img/piano.webp",
      thumb: "assets/thumbs/piano.webp",
    },
    {
      nombre: "Mascota Personalizada",
      categoria: "Personalizado",
      descripcion: "La silueta de tu mascota con su nombre. Un recuerdo eterno del mejor compañero.",
      img: "assets/img/mascota.webp",
      thumb: "assets/thumbs/mascota.webp",
    },
    {
      nombre: "Médico — Diseños que Cuentan Historias",
      categoria: "Regalo profesional",
      descripcion: "Estetoscopio real y dedicatoria personalizada. El regalo perfecto para celebrar una carrera.",
      img: "assets/img/medico.webp",
      thumb: "assets/thumbs/medico.webp",
    },
    {
      nombre: "Aniversario — Favorite Time",
      categoria: "Personalizado",
      descripcion: "Un mensaje grabado para esa persona. Porque sigue siendo tu momento favorito.",
      img: "assets/img/aniversario.webp",
      thumb: "assets/thumbs/aniversario.webp",
    },
    {
      nombre: "Clutch de Gala",
      categoria: "Serie Moda",
      descripcion: "Un bolso de fiesta convertido en reloj, con cadena dorada. Elegancia que marca la hora.",
      img: "assets/img/cartera.webp",
      thumb: "assets/thumbs/cartera.webp",
    },
    {
      nombre: "La Hora de la Cena",
      categoria: "Serie Sabores",
      descripcion: "Madera natural y un tenedor suspendido en el aire. Arte cinético para tu mesa.",
      img: "assets/img/tenedor.webp",
      thumb: "assets/thumbs/tenedor.webp",
    },
    {
      nombre: "Colaboración Zarova Vodka",
      categoria: "Colaboraciones de marca",
      descripcion: "Pieza de exhibición creada para Zarova Vodka. Branding de lujo hecho a mano.",
      img: "assets/img/zarova.webp",
      thumb: "assets/thumbs/zarova.webp",
    },
  ],

  /* ---------- CÓMO ENCARGAR (4 pasos) ---------- */
  encargos: {
    titulo: "Encarga tu pieza única",
    subtitulo: "Un proceso simple para crear algo que no existe en ningún otro lugar.",
    pasos: [
      { n: "01", titulo: "Cuéntame tu idea", texto: "Escríbeme qué quieres representar: una persona, profesión, pasión o momento." },
      { n: "02", titulo: "Diseño a medida", texto: "Convierto tu idea en un boceto y definimos materiales, tamaño y detalles." },
      { n: "03", titulo: "Creación artesanal", texto: "Fabrico tu reloj a mano, pieza por pieza, con acabado premium." },
      { n: "04", titulo: "Entrega", texto: "Recibes una obra de arte única, lista para regalar o lucir." },
    ],
  },

  /* ---------- SEO / NEGOCIO (Schema.org LocalBusiness) ---------- */
  seo: {
    titulo: "Marcos Torres · Relojes Artesanales de Lujo | Miami",
    descripcion: "Relojes artesanales de lujo hechos a mano en Miami. Piezas únicas y personalizadas que convierten el tiempo en obras de arte.",
    url: "https://altiora-cu.github.io/marco-torres-design-web/", // ⚠️ se ajusta al publicar
  },
};
