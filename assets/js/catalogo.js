// ===== DATOS DE PRODUCTOS =====
const products = [
  {
    id: 1,
    title: "CINTURÓN",
    price: 200.00,
    category: "accesorios",
    description: "Cinturón artesanal de cuero genuino en tono marrón oscuro, con hebilla plateada resistente. Diseño ancho y duradero, perfecto para complementar jeans o pantalones formales. Ajustable para un fit personalizado.",
    features: [
      "Cuero vegano sintético",
      "Balas metálicas",
      "Hebilla doble ajustable",
      "Acabado en acero inoxidable",
      "Ajustable a tallas más chicas"
    ],
    image: "/assets/img/cinturon.jpg",
    hasVariants: false
  },
  {
    id: 2,
    title: "CAMISA",
    price: 499.00,
    category: "playeras",
    description: "Camiseta blanca de algodón puro, con cuello redondo y diseño minimalista. Perfecta para combinar con cualquier outfit, ya sea casual o deportivo. Incluye accesorios estilizados como cámara vintage y zapatos blancos para inspiración de estilo. Talla M.",
    features: [
      "Premium t-shirt",
      "Color: Blanco",
      "100% Algodón peinado pesado",
      "Cuello de canalé",
      "Corte holgado",
      "Tacto suave",
      "Hecho en México"
    ],
    image: "/assets/img/camisa_blanca.jpg",
    hasVariants: true
  },
  {
    id: 3,
    title: "PLAYERA",
    price: 399.00,
    category: "playeras",
    description: "Camiseta de algodón negro de alta calidad, con cuello redondo y corte clásico. Ideal para un look casual y versátil. Material suave y transpirable para uso diario. Disponible en talla XL.",
    features: [
      "Color: Negro",
      "100% Algodón peinado",
      "Cuello de canalé",
      "Corte ajustado",
      "Tacto suave",
      "Hecho en México"
    ],
    image: "/assets/img/playera_negra.jpg",
    hasVariants: true
  },
  {
    id: 4,
    title: "PANTALON",
    price: 150.00,
    originalPrice: 399.00,
    category: "pantalones",
    onSale: true,
    description: "Jeans de denim azul medio con corte recto y bolsillos funcionales. Fabricados con tela resistente y cómoda, ideales para un estilo everyday. Ajuste relajado para mayor comodidad en actividades diarias.",
    features: [
      "95% Algodón 5% Elastano",
      "Corte unisex",
      "Cierre ajustable trasero",
      "Gráfico impreso delantero",
      "Hecho en México"
    ],
    image: "/assets/img/pantalon.jpg",
    hasVariants: true
  }
];

// ===== ESTADO =====
let cart = [];
let currentCurrency = 'MXN';
const exchangeRate = { MXN: 1, USD: 0.058 };

// ===== ELEMENTOS DEL DOM =====
const productsGrid = document.getElementById('productsGrid');
const sortSelect = document.getElementById('sort');
const categorySelect = document.getElementById('category');

// ===== FUNCIONES =====

// Formatear precio según moneda
function formatPrice(price) {
  const converted = price * exchangeRate[currentCurrency];
  return new Intl.NumberFormat(currentCurrency === 'MXN' ? 'es-MX' : 'en-US', {
    style: 'currency',
    currency: currentCurrency,
    minimumFractionDigits: 2
  }).format(converted);
}

// Renderizar productos
function renderProducts(productsToRender) {
  productsGrid.innerHTML = '';

  productsToRender.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card h-100';
    card.dataset.category = product.category;

    const priceHTML = product.onSale
      ? `<span class="original">${formatPrice(product.originalPrice)}</span> ${formatPrice(product.price)}`
      : `${formatPrice(product.price)}`;

    // siempre mostramos ambos botones; el de carrito invoca la misma función incluso si hay variantes
    const actionInfo = `<button class="btn btn-outline-secondary btn-sm w-100" onclick="openQuickView(${product.id})">Ver más información</button>`;
    const actionAdd = `<button class="btn btn-danger btn-sm w-100" onclick="addToCart(${product.id})">Añadir al carrito</button>`;

    // guardar texto breve para mostrar en la tarjeta (100 caracteres max)
    const shortDesc = product.description.length > 100
      ? product.description.slice(0, 100).trim() + '…'
      : product.description;

    card.innerHTML = `
      <div class="product-image">
        ${product.image ? `<img src="${product.image}" alt="${product.title}">` : '👕'}
      </div>
      <div class="product-info p-3">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">${priceHTML}</p>
        <p class="product-description">${shortDesc}</p>
        <ul class="product-features">
          ${product.features.slice(0, 3).map(f => `<li>${f}</li>`).join('')}
        </ul>
        <div class="d-flex flex-column gap-2 mt-2">
          ${actionInfo}
          ${actionAdd}
        </div>
      </div>
    `;

    // Envolver en columna Bootstrap
    const col = document.createElement('div');
    col.className = 'col';
    col.appendChild(card);
    productsGrid.appendChild(col);
  });
}

// Abrir modal Quick View
function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const priceHTML = product.onSale
    ? `<span class="original">${formatPrice(product.originalPrice)}</span> ${formatPrice(product.price)}`
    : `${formatPrice(product.price)}`;

  document.getElementById('modalBody').innerHTML = `
    <div class="row g-4">
      <div class="col-md-6">
        <div class="modal-image rounded d-flex align-items-center justify-content-center" style="min-height:300px; background: linear-gradient(135deg,#2a2a2a,#3a3a3a); font-size:4rem; color:#b0b0b0;">
          ${product.image ? `<img src="${product.image}" alt="${product.title}" class="img-fluid rounded">` : '👕'}
        </div>
      </div>
      <div class="col-md-6">
        <h2 class="text-uppercase fw-bold">${product.title}</h2>
        <p class="modal-price fs-4 fw-bold text-danger mt-2">${priceHTML}</p>
        <p class="text-secondary">${product.description}</p>
        <p class="fw-bold">ALL FASHION IS UNISEX</p>
        <ul class="list-unstyled mt-3">
          ${product.features.map(f => `
            <li class="py-2 border-bottom text-secondary">
              <span class="text-success fw-bold me-2">✓</span>${f}
            </li>
          `).join('')}
        </ul>
        <div class="d-flex gap-3 mt-4">
          ${product.hasVariants
      ? `<button class="btn btn-outline-secondary flex-fill" onclick="alert('Selecciona tus opciones en la página del producto')">Seleccionar opciones</button>`
      : `<button class="btn btn-danger flex-fill" onclick="addToCart(${product.id}); closeModal();">Añadir al carrito</button>`
    }
          <button class="btn btn-outline-secondary flex-fill" onclick="closeModal()">Continuar</button>
        </div>
      </div>
    </div>
  `;

  const modalEl = document.getElementById('quickViewModal');
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

// Cerrar modal
function closeModal() {
  const modalEl = document.getElementById('quickViewModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
}

// Añadir al carrito
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  showToast(`✅ ${product.title} añadido al carrito`);
}

// Actualizar contador del carrito
function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) cartCountEl.textContent = total;
}

// Mostrar toast Bootstrap
function showToast(message) {
  document.getElementById('toastMessage').textContent = message;
  const toastEl = document.getElementById('toast');
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 });
  toast.show();
}

// Filtrar y ordenar productos
function filterAndSortProducts() {
  let filtered = [...products];

  const category = categorySelect.value;
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  const sortBy = sortSelect.value;
  switch (sortBy) {
    case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
    case 'name-asc': filtered.sort((a, b) => a.title.localeCompare(b.title)); break;
  }

  renderProducts(filtered);
}

// ===== EVENTOS =====
sortSelect.addEventListener('change', filterAndSortProducts);
categorySelect.addEventListener('change', filterAndSortProducts);

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  updateCartCount();
});

// Funciones globales para los onclick en HTML
window.openQuickView = openQuickView;
window.closeModal = closeModal;
window.addToCart = addToCart;