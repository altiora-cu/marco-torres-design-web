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
    tagline: "Convirtiendo el tiempo en obras de arte",
    subtitulo: "Relojes artesanales de lujo",
    // El hero usa este video de fondo si el archivo existe (FASE 2).
    // Mientras tanto muestra la imagen 'heroPoster'.
    heroVideo: "assets/video/hero.mp4",        // versión horizontal (desktop)
    heroVideoMobile: "assets/video/hero-mobile.mp4", // versión vertical (teléfono)
    heroPoster: "assets/img/hero-poster.webp",  // primer frame del video hero
  },

  /* ---------- CONTACTO ----------
     Datos reales de Marcos, ya en uso: alimentan el boton flotante de WhatsApp,
     el formulario de encargos, el pie de pagina y la ficha de negocio de Google.
     Si algun dia cambia el telefono: con codigo de pais y SIN simbolos. */
  contacto: {
    whatsapp: "17862414630",                   // +1 (786) 241-4630 · Miami
    email: "marcos880729@icloud.com",          // email de contacto de Marcos
    instagram: "markidesign_",                 // sin @ · instagram.com/markidesign_
    ciudad: "Miami, Florida",
  },

  /* ---------- SOBRE EL ARTISTA ---------- */
  artista: {
    titulo: "El artesano\ndetrás del tiempo",
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
      descripcion: "La isla recortada en madera sobre disco negro mate, con el XII y el VI en dorado. Para quien lleva Cuba de memoria.",
      img: "assets/img/cuba.webp",
      thumb: "assets/thumbs/cuba.webp",
    },
    {
      nombre: "Café — Ritual de la Mañana",
      categoria: "Serie Sabores",
      descripcion: "Granos de café tostado fijados sobre la esfera negra, con la cafetera y la taza montadas en la tabla de roble. El desayuno entero, hecho reloj.",
      img: "assets/img/cafe.webp",
      thumb: "assets/thumbs/cafe.webp",
    },
    {
      nombre: "Piano de Cola",
      categoria: "Serie Música",
      descripcion: "La silueta de un piano de cola en negro laca, con las teclas talladas una a una en el borde inferior. Para quien tiene música en casa.",
      img: "assets/img/piano.webp",
      thumb: "assets/thumbs/piano.webp",
    },
    {
      nombre: "Mascota Personalizada",
      categoria: "Personalizado",
      descripcion: "Su silueta recortada a partir de tu foto, con el nombre en dorado sobre el pecho. En esta pieza, Paris.",
      img: "assets/img/mascota.webp",
      thumb: "assets/thumbs/mascota.webp",
    },
    {
      nombre: "Aniversario — Favorite Time",
      categoria: "Personalizado",
      descripcion: "Disco negro partido por una franja clara con la dedicatoria grabada, y a cada lado un símbolo de la pareja. Se personaliza entero.",
      img: "assets/img/aniversario.webp",
      thumb: "assets/thumbs/aniversario.webp",
    },
    {
      nombre: "Clutch de Gala",
      categoria: "Serie Moda",
      descripcion: "Un bolso de fiesta con cierre de boquilla dorado, colgado de su propia cadena. Índices y manecillas en dorado sobre negro.",
      img: "assets/img/cartera.webp",
      thumb: "assets/thumbs/cartera.webp",
    },
    {
      nombre: "La Hora de la Cena",
      categoria: "Serie Sabores",
      descripcion: "Un tenedor real hace de manecilla sobre un disco de nogal, servido en su bandeja de madera. Pensado para la cocina o el comedor.",
      img: "assets/img/tenedor.webp",
      thumb: "assets/thumbs/tenedor.webp",
    },
    {
      nombre: "Colaboración Zarova Vodka",
      categoria: "Colaboraciones de marca",
      descripcion: "Expositor de travertino con arco negro y esfera dorada, creado por encargo para Zarova Vodka. Ejemplo del trabajo para marcas.",
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
    url: "https://altiora-cu.github.io/marco-torres-design-web/", // el sitio publicado; cambiar si se pone dominio propio
  },
};
