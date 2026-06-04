// ============================================================
//  CONFIGURACIÓN — Edita solo este bloque para personalizar
// ============================================================

// Tu número de WhatsApp (con código de país, sin espacios ni +)
const WA_NUMBER = "56995476138"; // <-- Reemplaza con tu número real

// Carpeta donde guardarás las fotos de las prendas
// Las imágenes deben estar en: fotos/nombre-del-archivo.jpg
const IMG_FOLDER = "fotos/";

// ============================================================
//  ARRAY DE PRODUCTOS
//  Para agregar: copia un objeto { } y pégalo al final
//  Para quitar:  borra el objeto completo
//  Para editar:  cambia los valores entre comillas
// ============================================================

const productos = [
  {
    nombre: "Polo Ralph Lauren",
    talla: "M",
    precio: "$18.000",
    foto: "bonsai.jpg",   // nombre exacto del archivo en /fotos/
  },
  {
    nombre: "Camiseta Tommy Hilfiger",
    talla: "L",
    precio: "$15.000",
    foto: "tommy-camiseta.jpg",
  },
  {
    nombre: "Jeans Levi's 501",
    talla: "32×30",
    precio: "$35.000",
    foto: "levis-501.jpg",
  },
  {
    nombre: "Chaqueta Gap Denim",
    talla: "S",
    precio: "$42.000",
    foto: "gap-denim.jpg",
  },
  {
    nombre: "Hoodie Nike Classic",
    talla: "XL",
    precio: "$28.000",
    foto: "nike-hoodie.jpg",
  },
  {
    nombre: "Vestido Banana Republic",
    talla: "S",
    precio: "$32.000",
    foto: "banana-republic-vestido.jpg",
  },
  {
    nombre: "Blusa Zara EE.UU.",
    talla: "M",
    precio: "$22.000",
    foto: "zara-blusa.jpg",
  },
  {
    nombre: "Shorts Abercrombie",
    talla: "M",
    precio: "$19.000",
    foto: "abercrombie-shorts.jpg",
  },
];

// ============================================================
//  GENERACIÓN DE TARJETAS — No necesitas tocar nada aquí
// ============================================================

function buildWhatsAppURL(nombre, precio) {
  const mensaje = `Hola, me interesa la prenda *${nombre}* · Precio: ${precio}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

function createCard(producto, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.animationDelay = `${0.05 * index}s`;

  // Imagen o placeholder
  const imgWrap = document.createElement("div");
  imgWrap.classList.add("card-img-wrap");

  const imgSrc = IMG_FOLDER + producto.foto;
  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = producto.nombre;
  img.loading = "lazy";

  // Si la imagen falla, muestra placeholder de texto
  img.onerror = function () {
    imgWrap.innerHTML = `<div class="card-img-placeholder">${producto.nombre}</div>`;
  };

  const badge = document.createElement("span");
  badge.classList.add("card-badge");
  badge.textContent = "Disponible";

  imgWrap.appendChild(img);
  imgWrap.appendChild(badge);

  // Info
  const info = document.createElement("div");
  info.classList.add("card-info");

  const nombre = document.createElement("p");
  nombre.classList.add("card-name");
  nombre.textContent = producto.nombre;

  const talla = document.createElement("p");
  talla.classList.add("card-size");
  talla.textContent = `Talla ${producto.talla}`;

  const precio = document.createElement("p");
  precio.classList.add("card-price");
  precio.textContent = producto.precio;

  const btn = document.createElement("a");
  btn.classList.add("card-btn");
  btn.textContent = "Comprar";
  btn.href = buildWhatsAppURL(producto.nombre, producto.precio);
  btn.target = "_blank";
  btn.rel = "noopener noreferrer";

  info.appendChild(nombre);
  info.appendChild(talla);
  info.appendChild(precio);
  info.appendChild(btn);

  card.appendChild(imgWrap);
  card.appendChild(info);

  return card;
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  grid.innerHTML = "";

  productos.forEach((producto, i) => {
    const card = createCard(producto, i);
    grid.appendChild(card);
  });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", renderProducts);

// ============================================================
//  LIGHTBOX — Ver imagen ampliada al hacer clic
// ============================================================

const lightbox        = document.getElementById("lightbox");
const lightboxImg     = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose   = document.getElementById("lightbox-close");
const lightboxBd      = document.getElementById("lightbox-backdrop");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightboxCaption.textContent = alt;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  // Limpiar src después de la transición para no mostrar imagen anterior
  setTimeout(() => { lightboxImg.src = ""; }, 300);
}

// Delegar el clic en la imagen de cada tarjeta
document.addEventListener("click", function (e) {
  const imgWrap = e.target.closest(".card-img-wrap");
  if (imgWrap) {
    const img = imgWrap.querySelector("img");
    if (img && img.src && !img.src.endsWith("/")) {
      openLightbox(img.src, img.alt);
    }
  }
});

// Cerrar con el botón X
lightboxClose.addEventListener("click", closeLightbox);

// Cerrar al hacer clic en el fondo o en la imagen
lightboxBd.addEventListener("click", closeLightbox);
lightboxImg.addEventListener("click", closeLightbox);

// Cerrar con la tecla Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
});
