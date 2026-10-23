/* =============================================================
   MARCOS TORRES · CONFIGURACIÓN DEL SITIO
   -------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar.
   Cambia textos, contacto, catálogo, «Tu reloj» e Instagram aquí.
   No toques el HTML.
   Regla de Legal (22/10/2026): ningún nombre de famoso, de cliente
   ni de marca sin el permiso escrito firmado.
   ============================================================= */

window.SITE_CONFIG = {

  /* ---------- MARCA ---------- */
  marca: {
    nombre: "Marcos Torres",
    tagline: "Convirtiendo el tiempo en obras de arte",
    taglineAcento: "obras de arte",           // parte del titular que va en cursiva dorada
    // Línea pequeña encima del titular. Marcos pidió cambiarla (audio del 11/10) sin decir a qué: pendiente.
    subtitulo: "Relojes artesanales de lujo",
    heroTexto: "Relojes de pared y de mesa hechos a mano en Miami, en madera, resina, acrílico y metal, con la historia de quien los encarga.",
    heroVideo: "assets/video/hero.mp4",              // horizontal (escritorio)
    heroVideoMobile: "assets/video/hero-mobile.mp4", // vertical (teléfono)
    heroPoster: "assets/img/hero-poster.webp",       // imagen para compartir (1200×630)
    // El fondo de respaldo del hero (assets/img/hero-bg.webp) está en css/styles.css
  },

  /* ---------- CONTACTO ----------
     Con código de país y SIN símbolos. Alimenta todos los botones de WhatsApp. */
  contacto: {
    whatsapp: "17862414630",                   // +1 (786) 241-4630 · Miami
    email: "marcos880729@icloud.com",
    instagram: "markidesign_",                 // cuenta del catálogo
    instagramPersonal: "marki_marki_88",       // cuenta principal del artista
    ciudad: "Miami, Florida",
  },

  /* ---------- MENSAJES DE WHATSAPP ----------
     {pieza} se sustituye por el nombre de la pieza. */
  mensajes: {
    encargo: "Hola Marcos, vi tu sala en la web y quiero encargar una pieza con mi historia.",
    flotante: "Hola Marcos, vi tu página y quiero encargar una pieza.",
    pie: "Hola Marcos, vi tu página y me interesa una pieza.",
    pieza: "Hola Marcos, vi «{pieza}» en tu web y quiero una pieza así con mi historia.",
  },

  /* ---------- MENÚ ---------- */
  menu: {
    enlaces: [
      { texto: "La sala", destino: "index.html#sala" },
      { texto: "Tu reloj", destino: "index.html#tu-reloj" },
      { texto: "Redes", destino: "index.html#redes" },
    ],
    cta: "Encargar pieza",
    abrir: "Abrir menú",
    cerrar: "Cerrar menú",
    whatsapp: "Escribir a Marcos por WhatsApp",
  },

  /* ---------- VITRINA (detalle de una pieza) ---------- */
  vitrina: {
    formato: "Formato",
    materiales: "Materiales",
    relojDe: "Reloj de",
    cta: "Quiero una así",
    parecida: "Contar algo parecido",
    anterior: "Pieza anterior",
    siguiente: "Pieza siguiente",
    cerrar: "Cerrar",
    abrir: "Ver de cerca:",
  },

  /* ---------- PORTADA ---------- */
  portada: {
    ctaPrincipal: "Encargar pieza",
    ctaSecundario: "Recorrer la sala",
    salaTitulo: "Una luz para cada pieza",
    salaTexto: "Recorre la colección como en una galería. Toca una pieza para verla de cerca.",
    salaCompleta: "Ver la colección completa",
    cierreTitulo: "¿Qué historia quieres colgar en tu pared?",
    cierreAcento: "colgar",
    cierreCta: "Encargar pieza",
  },

  /* ---------- SOBRE EL ARTISTA ---------- */
  artista: {
    eyebrow: "El artesano",
    titulo: "El artesano detrás del tiempo",
    retrato: "assets/img/marcos-retrato.webp",          // 900 px
    retratoPequeno: "assets/img/marcos-retrato-600.webp", // 600 px, para teléfonos
    retratoAlt: "Marcos Torres de traje gris en una terraza frente a la bahía de Miami, de noche",
    parrafos: [
      "Marcos Torres transforma la madera y el tiempo en piezas únicas. Cada reloj nace a mano, pensado para contar una historia: la tuya.",
      "Desde su taller en Miami, une la tradición artesanal cubana con un acabado de lujo: negro profundo, vetas naturales y detalles en dorado que convierten cada hora en un recuerdo.",
      "No fabrica relojes en serie. Crea obras irrepetibles, personalizadas para cada persona, momento y ocasión.",
    ],
    valores: [
      { titulo: "Diseño exclusivo", texto: "Cada pieza es única e irrepetible." },
      { titulo: "Personalizado para ti", texto: "Lo diseñamos a partir de tu idea." },
      { titulo: "Materiales nobles", texto: "Maderas finas, resinas, acrílicos y metales." },
      { titulo: "Hecho a mano", texto: "Artesanía real, pieza por pieza." },
    ],
  },

  /* ---------- CATÁLOGO ----------
     Para agregar una pieza: copia un bloque { ... } y cambia los campos.
     img = foto (WebP, máx ~1600 px) · ancho/alto = medidas reales de esa foto
     historia = tema para «Tu reloj» (Raíces, Rituales, Pasiones, Familia, Amor, Marcas)
     tipo = Pared o Mesa. Sin rayas largas en los nombres. */
  catalogo: [
    {
      nombre: "Cuba", sub: "Tiempo y madera", categoria: "Edición limitada",
      historia: "Raíces", tipo: "Pared", material: "Madera sobre acrílico negro",
      descripcion: "La isla recortada en madera sobre disco negro mate, con el XII y el VI en dorado. Para quien lleva Cuba de memoria.",
      img: "assets/img/cuba.webp", ancho: 592, alto: 740,
    },
    {
      nombre: "Café", sub: "Ritual de la mañana", categoria: "Serie Sabores",
      historia: "Rituales", tipo: "Mesa", material: "Roble, granos de café y acrílico",
      descripcion: "Granos de café tostado fijados sobre la esfera negra, con la cafetera y la taza montadas en la tabla de roble. El desayuno entero, hecho reloj.",
      img: "assets/img/cafe.webp", ancho: 720, alto: 900,
    },
    {
      nombre: "Piano de cola", sub: "Teclas talladas a mano", categoria: "Serie Música",
      historia: "Pasiones", tipo: "Mesa", material: "Acrílico laca negra y teclas talladas",
      descripcion: "La silueta de un piano de cola en negro laca, con las teclas talladas una a una en el borde inferior. Para quien tiene música en casa.",
      img: "assets/img/piano.webp", ancho: 880, alto: 1100,
    },
    {
      nombre: "Mascota", sub: "En esta pieza, Paris", categoria: "Personalizado",
      historia: "Familia", tipo: "Mesa", material: "Silueta en acrílico a partir de tu foto",
      descripcion: "Su silueta recortada a partir de tu foto, con el nombre en dorado sobre el pecho.",
      img: "assets/img/mascota.webp", ancho: 800, alto: 1000,
    },
    {
      nombre: "Aniversario", sub: "Favorite Time", categoria: "Personalizado",
      historia: "Amor", tipo: "Mesa", material: "Acrílico, resina y grabado",
      descripcion: "Disco negro partido por una franja clara con la dedicatoria grabada y, a cada lado, un símbolo de la pareja. Se personaliza entero.",
      img: "assets/img/aniversario.webp", ancho: 850, alto: 1062,
    },
    {
      nombre: "Clutch de gala", sub: "Cierre de boquilla dorado", categoria: "Serie Moda",
      historia: "Pasiones", tipo: "Pared", material: "Acrílico negro y metal dorado",
      descripcion: "Un bolso de fiesta con cierre de boquilla dorado, colgado de su propia cadena. Índices y manecillas en dorado sobre negro.",
      img: "assets/img/cartera.webp", ancho: 760, alto: 950,
    },
    {
      nombre: "La hora de la cena", sub: "Un tenedor como manecilla", categoria: "Serie Sabores",
      historia: "Rituales", tipo: "Pared", material: "Nogal y cubertería real",
      descripcion: "Un tenedor real hace de manecilla sobre un disco de nogal, servido en su bandeja de madera. Pensado para la cocina o el comedor.",
      img: "assets/img/tenedor.webp", ancho: 560, alto: 700,
    },
    {
      // La foto deja ver la marca de la botella: pendiente de Legal. El texto no la nombra.
      nombre: "Colaboración de marca", sub: "Expositor de travertino", categoria: "Para empresas",
      historia: "Marcas", tipo: "Mesa", material: "Travertino, acrílico y metal",
      descripcion: "Expositor de travertino con arco negro y esfera dorada, hecho por encargo para una marca de bebidas. Ejemplo del trabajo para empresas.",
      img: "assets/img/colaboracion-travertino.webp", ancho: 700, alto: 874,
    },
  ],

  /* ---------- PÁGINA DEL CATÁLOGO ---------- */
  coleccion: {
    titulo: "La colección",
    texto: "Piezas únicas, hechas a mano. Toca una para verla de cerca.",
    volver: "Volver a la portada",
  },

  /* ---------- CÓMO ENCARGAR + «TU RELOJ» ---------- */
  encargos: {
    eyebrow: "Encargos",
    titulo: "Encarga tu pieza única",
    subtitulo: "Un proceso simple para crear algo que no existe en ningún otro lugar.",
    pasos: [
      { n: "01", titulo: "Cuéntame tu idea", texto: "Escríbeme qué quieres representar: una persona, profesión, pasión o momento." },
      { n: "02", titulo: "Diseño a medida", texto: "Convierto tu idea en un boceto y definimos materiales, tamaño y detalles." },
      { n: "03", titulo: "Creación artesanal", texto: "Fabrico tu reloj a mano, pieza por pieza." },
      { n: "04", titulo: "Entrega", texto: "Recibes una obra única, lista para regalar o colgar." },
    ],
  },

  /* Constructor «Tu reloj»: cada opción tiene el valor que se ve y la frase que entra en el mensaje.
     Mensaje: mensajeInicio + tipo + « que cuente » + frase + mensajeMaterial + material + nota. */
  tuReloj: {
    titulo: "Empieza tu reloj aquí",
    intro: "Tres respuestas y el mensaje para Marcos queda listo.",
    preguntas: [
      { grupo: "historia", pregunta: "¿Qué quieres contar?", inicial: "Raíces", opciones: [
        { valor: "Raíces", frase: "mis raíces" },
        { valor: "Rituales", frase: "un ritual de mi día" },
        { valor: "Pasiones", frase: "una de mis pasiones" },
        { valor: "Familia", frase: "a alguien de mi familia" },
        { valor: "Amor", frase: "una historia de amor" },
        { valor: "Marcas", frase: "mi marca o mi empresa" },
      ] },
      { grupo: "tipo", pregunta: "¿Dónde va a vivir?", inicial: "Pared", opciones: [
        { valor: "Pared", frase: "pared" },
        { valor: "Mesa", frase: "mesa" },
      ] },
      { grupo: "material", pregunta: "¿Qué material te llama?", inicial: "Madera", opciones: [
        { valor: "Madera", frase: "madera" },
        { valor: "Resina", frase: "resina" },
        { valor: "Acrílico", frase: "acrílico" },
        { valor: "Metal", frase: "metal" },
        { valor: "No lo sé", frase: "" },
      ] },
    ],
    notaEtiqueta: "En una frase, tu historia",
    notaOpcional: "(opcional)",
    notaEjemplo: "Por ejemplo: el pueblo donde nació mi abuela",
    notaMax: 180,
    mensajeInicio: "Hola Marcos, quiero un reloj de",
    mensajeCuente: "que cuente",
    mensajeMaterial: ", en",
    piezaParecida: "Una pieza parecida:",
    mensajeEtiqueta: "Tu mensaje",
    cta: "Enviar a Marcos por WhatsApp",
    nota: "Se abre WhatsApp con el mensaje listo. Tú decides si lo envías.",
  },

  /* ---------- INSTAGRAM ----------
     Reels elegidos por Frank (23/10/2026). Se insertan con el embed oficial de Instagram
     y su script (embed.js) solo se descarga cuando la sección entra en pantalla.
     Sin pie de foto a propósito: el texto del reel podría nombrar a clientes. */
  instagram: {
    titulo: "El taller, colgado en Instagram",
    texto: "Reels del taller, colgados como en una sala. Se cargan desde Instagram al llegar aquí.",
    cargando: "Cargando el reel…",
    verEnInstagram: "Ver el reel en Instagram",
    anterior: "Reel anterior",
    siguiente: "Reel siguiente",
    cuentas: [
      { usuario: "markidesign_", etiqueta: "Catálogo" },
      { usuario: "marki_marki_88", etiqueta: "Cuenta personal" },
    ],
    reels: [
      // "https://www.instagram.com/reel/DW0AnY9jZOf/",  retirado 23/10/2026 hasta que Legal decida (botella de licor de marca)
      "https://www.instagram.com/reel/DVcjmtpjdeN/",
      "https://www.instagram.com/reel/DZGgNONt_h0/",
      "https://www.instagram.com/reel/DG1hiiGp74R/",
      "https://www.instagram.com/reel/Dag1ZEZNCZd/",
      "https://www.instagram.com/reel/DXSpXS3Df6K/",
      "https://www.instagram.com/reel/DdVEAPOtJJF/",
    ],
  },

  /* ---------- PIE ---------- */
  pie: {
    tag: "Relojes de pared y de mesa, hechos a mano",
    legal: "Marcos Torres. Todas las piezas son únicas y hechas a mano.",
  },

  /* ---------- SEO / NEGOCIO (Schema.org) ---------- */
  seo: {
    titulo: "Marcos Torres · Relojes Artesanales de Lujo | Miami",
    descripcion: "Relojes artesanales de lujo hechos a mano en Miami. Piezas únicas y personalizadas que convierten el tiempo en obras de arte.",
    url: "https://altiora-cu.github.io/marco-torres-design-web/", // el sitio publicado; cambiar si se pone dominio propio
  },
};
