// ============================================
// AGROTECH | script.js
// Lógica principal de la aplicación
// ============================================

// ---------- Catálogo Maestro de Productos ----------
const products = [
    { id: 1, name: "Nitro-X Forte",    category: "fertilizante", price: 1250, image: "https://lh3.googleusercontent.com/d/1SVqvW1bH8QYCgjsG5JIqwc3Ji2DL1dCm", desc: "46% Nitrógeno soluble con tecnología de absorción rápida." },
    { id: 2, name: "Phos-Precision",   category: "fertilizante", price: 1420, image: "https://lh3.googleusercontent.com/d/18-wwEN2iWYJ2DvXVhFU5oBKe0HM0HVaj", desc: "Acelerador de biomasa radicular de alta solubilidad." },
    { id: 3, name: "K-Ultra Liquid",   category: "fertilizante", price: 1580, image: "https://lh3.googleusercontent.com/d/1TQk8gOrN9yxTmYgjGC7F-LL4DtP7QZe", desc: "Potasio grado cristalino para mayor peso y brix en fruto." },
    { id: 4, name: "Amino-Max S12",    category: "bio",          price:  890, image: "https://lh3.googleusercontent.com/d/1GSK7L6ivQ7B5EdYVMOOiJn3RTAX-7M65", desc: "L-aminoácidos libres para recuperación post-estrés." },
    { id: 5, name: "Zinc-Core 15",     category: "bio",          price: 1100, image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=400", desc: "Zinc quelatado con EDTA para prevenir clorosis." },
    { id: 6, name: "Calcium-Flow",     category: "bio",          price: 1340, image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400", desc: "Calcio líquido estructural para firmeza de tejidos." },
    { id: 7, name: "Iron-Strong",      category: "bio",          price: 1150, image: "https://images.unsplash.com/photo-1532187875605-1838d7370334?auto=format&fit=crop&q=80&w=400", desc: "Hierro de alta asimilación para metabolismo energético." },
    { id: 8, name: "Mg-Force Plus",    category: "fertilizante", price:  980, image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=400", desc: "Magnesio esencial para la síntesis de clorofila." },
];

// ---------- Estado Global ----------
let cart = [];
let currentHeroSlide = 0;

// ============================================
//  TIENDA — Renderizado de productos
// ============================================

/**
 * Renderiza las tarjetas de productos en el grid.
 * @param {string} filter - Categoría a mostrar ('todos' | 'fertilizante' | 'bio')
 */
function renderProducts(filter = 'todos') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const filtered = filter === 'todos'
        ? products
        : products.filter(p => p.category === filter);

    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="product-card group bg-white border border-slate-100 rounded-3xl overflow-hidden flex flex-col">
                <div class="relative overflow-hidden h-56">
                    <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="${p.name}">
                    <div class="absolute top-4 left-4">
                        <span class="bg-white/90 backdrop-blur-md text-emerald-600 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">${p.category}</span>
                    </div>
                </div>
                <div class="p-8 flex flex-col flex-1">
                    <h4 class="text-xl font-bold text-slate-900 mb-2 leading-tight">${p.name}</h4>
                    <p class="text-slate-400 text-xs leading-relaxed mb-6 flex-1">${p.desc}</p>
                    <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                        <div>
                            <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Precio Unitario</p>
                            <p class="font-black text-lg text-slate-900">$${p.price.toLocaleString()}</p>
                        </div>
                        <button onclick="addToCart(${p.id})" class="bg-slate-900 text-white hover:bg-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90">
                            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

/**
 * Filtra productos y actualiza los botones de filtro.
 * @param {string} cat - Categoría seleccionada
 */
function filterProducts(cat) {
    renderProducts(cat);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'text-emerald-600', 'shadow-sm');
        btn.classList.add('text-slate-500');

        const btnText = btn.innerText.toLowerCase();
        if ((cat === 'todos' && btnText === 'todos') || btnText.includes(cat)) {
            btn.classList.add('bg-white', 'text-emerald-600', 'shadow-sm');
            btn.classList.remove('text-slate-500');
        }
    });
}

// ============================================
//  CARRITO — Lógica completa
// ============================================

/**
 * Agrega un producto al carrito o incrementa su cantidad.
 * @param {number} id - ID del producto
 */
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const exists  = cart.find(item => item.id === id);

    if (exists) {
        exists.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();

    // Animación visual del contador
    const count = document.getElementById('cart-count');
    count.classList.add('scale-[1.8]', 'bg-orange-500');
    setTimeout(() => count.classList.remove('scale-[1.8]', 'bg-orange-500'), 300);
}

/** Actualiza toda la interfaz del carrito (items, total, contador). */
function updateCartUI() {
    const container = document.getElementById('cart-items');
    const totalEl   = document.getElementById('cart-total');
    const countEl   = document.getElementById('cart-count');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 text-slate-400">
                <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" class="mb-4 opacity-20">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p class="font-bold">Tu carrito está vacío.</p>
            </div>`;
        totalEl.innerText = '$0.00 MXN';
        countEl.innerText = '0';
        return;
    }

    let html = '', total = 0, itemsCount = 0;

    cart.forEach((item, index) => {
        html += `
            <div class="flex items-center space-x-5 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                <img src="${item.image}" class="w-20 h-20 rounded-2xl object-cover shadow-sm">
                <div class="flex-1 min-w-0">
                    <p class="font-black text-slate-900 text-sm truncate">${item.name}</p>
                    <p class="text-xs font-bold text-emerald-600 mb-2">$${item.price.toLocaleString()}</p>
                    <div class="flex items-center space-x-3">
                        <button onclick="changeQty(${index}, -1)" class="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold hover:border-emerald-500 transition-colors">-</button>
                        <span class="text-xs font-black w-4 text-center">${item.quantity}</span>
                        <button onclick="changeQty(${index}, 1)"  class="w-7 h-7 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-bold hover:border-emerald-500 transition-colors">+</button>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-xs font-black text-slate-900">$${(item.price * item.quantity).toLocaleString()}</p>
                    <button onclick="removeItem(${index})" class="text-[10px] font-black text-rose-500 uppercase mt-2 tracking-widest">Quitar</button>
                </div>
            </div>`;
        total      += item.price * item.quantity;
        itemsCount += item.quantity;
    });

    container.innerHTML = html;
    totalEl.innerText   = `$${total.toLocaleString()} MXN`;
    countEl.innerText   = itemsCount;
}

/**
 * Cambia la cantidad de un item del carrito.
 * Si llega a 0, lo elimina.
 */
function changeQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCartUI();
}

/** Elimina un item del carrito por su índice. */
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

/** Abre o cierra el drawer lateral del carrito. */
function toggleCart() {
    const drawer  = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    const isOpen  = drawer.classList.contains('open');

    if (!isOpen) {
        drawer.classList.add('open');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('opacity-100'), 10);
        document.body.style.overflow = 'hidden';
    } else {
        drawer.classList.remove('open');
        overlay.classList.remove('opacity-100');
        setTimeout(() => {
            overlay.classList.add('hidden');
            document.body.style.overflow = '';
        }, 500);
    }
}

/** Simula el proceso de cotización formal. */
function checkout() {
    if (cart.length === 0) return;
    const btn = event.target;
    btn.innerText = "PROCESANDO SOLICITUD...";
    btn.disabled  = true;

    // Aquí podrías guardar el pedido en Firebase (ver firebase.js)
    setTimeout(() => {
        const folio = Math.floor(Math.random() * 90000 + 10000);
        alert(`¡SOLICITUD REGISTRADA! Su folio de cotización es #AG-${folio}. Un ejecutivo técnico le contactará en menos de 2 horas.`);
        cart = [];
        updateCartUI();
        toggleCart();
        btn.innerText = "INICIAR COTIZACIÓN FORMAL";
        btn.disabled  = false;
    }, 1500);
}

// ============================================
//  SLIDER HERO
// ============================================

/**
 * Mueve el slider del hero.
 * @param {number} dir - Dirección: 1 (siguiente) o -1 (anterior)
 */
function moveHero(dir) {
    const totalSlides = 3;
    currentHeroSlide = (currentHeroSlide + dir + totalSlides) % totalSlides;
    document.getElementById('hero-slider').style.transform = `translateX(-${currentHeroSlide * 100}%)`;
}

// ============================================
//  FORMULARIO DE CONTACTO
// ============================================

/**
 * Envía el formulario de contacto a Firebase Firestore.
 * Si Firebase no está configurado, muestra un mensaje de éxito simulado.
 */
async function submitContact() {
    const name    = document.getElementById('form-name').value.trim();
    const email   = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();
    const status  = document.getElementById('form-status');

    if (!name || !email || !message) {
        status.textContent = '⚠️ Por favor completa todos los campos.';
        status.className   = 'text-center text-sm font-bold text-orange-500 block';
        return;
    }

    status.textContent = 'Enviando...';
    status.className   = 'text-center text-sm font-bold text-slate-400 block';

    try {
        // Intentar guardar en Firebase si está configurado
        if (window.saveContact) {
            await window.saveContact({ name, email, message, timestamp: new Date().toISOString() });
        }
        // Limpiar formulario
        document.getElementById('form-name').value    = '';
        document.getElementById('form-email').value   = '';
        document.getElementById('form-message').value = '';

        status.textContent = '✅ ¡Mensaje enviado! Te contactaremos pronto.';
        status.className   = 'text-center text-sm font-bold text-emerald-600 block';
    } catch (error) {
        console.error('Error al enviar:', error);
        status.textContent = '❌ Hubo un error. Intenta de nuevo o llámanos directamente.';
        status.className   = 'text-center text-sm font-bold text-rose-500 block';
    }
}

// ============================================
//  INICIALIZACIÓN
// ============================================
window.onload = () => {
    renderProducts();
    // Autoplay del slider cada 7 segundos
    setInterval(() => moveHero(1), 7000);
};
