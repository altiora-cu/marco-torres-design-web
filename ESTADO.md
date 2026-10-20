# ESTADO DEL PROYECTO — Marcos Torres Design
**Actualizado:** 20 de octubre, 2026

---

## 🟢 Estado general: EN LÍNEA Y FUNCIONANDO

**Sitio publicado:** https://altiora-cu.github.io/marco-torres-design-web/
Responde HTTP 200. Todos los commits están subidos (`main` sincronizado con `origin/main`).

---

## ✅ Lo que está terminado

| Área | Estado |
|---|---|
| **Banner hero** | Video de museo, 593 KB desktop / 538 KB móvil. No recorta en teléfono. |
| **Paleta** | Dark premium artesanal (#0d0b09 + dorado #c9a45c) |
| **Catálogo** | 13 piezas publicadas, en `catalogo.html` + galería en portada |
| **Sección artista** | Retrato + bio de Marcos. Foto estirada: corregida |
| **Encargos** | Proceso por pasos + formulario → WhatsApp |
| **Contacto real** | WhatsApp +1 (786) 241-4630 · marcos880729@icloud.com · @markidesign_ |
| **SEO** | Title, descripción y URL canónica configurados |
| **Rendimiento** | Banner 3× más liviano, no bloquea en conexión lenta |
| **Local (`file://`)** | Carga correctamente con doble clic |

---

## 📋 Pendientes

### Para el cliente
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

**Ver el sitio antes de publicar:** doble clic en `index.html`.

---

## 📈 Valor del proyecto

Paquete web premium con assets generados por IA: **$2,500–5,000 USD** en el mercado
de Miami. El proceso completo quedó documentado y es replicable con el próximo
cliente (ver `FLUJO-AGENCIA-WEB-PREMIUM.md`).

**Siguiente paso comercial sugerido:** pedirle a Marcos un testimonio en video o
escrito sobre el proceso. Es el activo que vende el próximo sitio.
