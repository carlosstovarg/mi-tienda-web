
        // Catálogo de Productos con las Imágenes de Google Drive que proporcionaste
        const products = [
            { id: 1, name: "Nitro-X Forte", category: "fertilizante", price: 1250, image: "https://lh3.googleusercontent.com/d/1SVqvW1bH8QYCgjsG5JIqwc3Ji2DL1dCm", desc: "46% Nitrógeno soluble con tecnología de absorción rápida." },
            { id: 2, name: "Phos-Precision", category: "fertilizante", price: 1420, image: "https://lh3.googleusercontent.com/d/18-wwEN2iWYJ2DvXVhFU5oBKe0HM0HVaj", desc: "Acelerador de biomasa radicular de alta solubilidad." },
            { id: 3, name: "K-Ultra Liquid", category: "fertilizante", price: 1580, image: "https://lh3.googleusercontent.com/d/1TQk8gOrN9yxTmYgjGC7F-LL4DtP7QZe", desc: "Potasio grado cristalino para mayor peso y brix en fruto." },
            { id: 4, name: "Amino-Max S12", category: "bio", price: 890, image: "https://lh3.googleusercontent.com/d/1GSK7L6ivQ7B5EdYVMOOiJn3RTAX-7M65", desc: "L-aminoácidos libres para recuperación post-estrés técnico." },
            { id: 5, name: "Zinc-Core 15", category: "bio", price: 1100, image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=400", desc: "Zinc quelatado con EDTA para prevenir clorosis severa." },
            { id: 6, name: "Calcium-Flow", category: "bio", price: 1340, image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400", desc: "Calcio líquido estructural para firmeza de tejidos vivos." }
        ];

        let cart = [];
        let currentHeroSlide = 0;

        function renderProducts(filter = 'todos') {
            const grid = document.getElementById('product-grid');
            grid.innerHTML = '';
            const filtered = filter === 'todos' ? products : products.filter(p => p.category === filter);
            
            filtered.forEach(p => {
                grid.innerHTML += `
                    <div class="product-card bg-white border border-slate-100 rounded-3xl overflow-hidden flex flex-col">
                        <div class="relative overflow-hidden h-52">
                            <img src="${p.image}" class="w-full h-full object-cover" alt="${p.name}">
                            <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-emerald-600 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">${p.category}</span>
                        </div>
                        <div class="p-6 flex flex-col flex-1">
                            <h4 class="text-xl font-bold text-slate-900 mb-2">${p.name}</h4>
                            <p class="text-slate-400 text-xs leading-relaxed mb-6 flex-1">${p.desc}</p>
                            <div class="flex items-center justify-between pt-4 border-t border-slate-50">
                                <div>
                                    <p class="font-black text-lg text-slate-900">$${p.price.toLocaleString()} MXN</p>
                                </div>
                                <button onclick="addToCart(${p.id})" class="bg-slate-900 text-white hover:bg-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md active:scale-90">
                                    ＋
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        function addToCart(id) {
            const product = products.find(p => p.id === id);
            const exists = cart.find(item => item.id === id);
            if (exists) { exists.quantity++; } else { cart.push({ ...product, quantity: 1 }); }
            updateCartUI();
            const count = document.getElementById('cart-count');
            count.classList.add('scale-150');
            setTimeout(() => count.classList.remove('scale-150'), 200);
        }

        function updateCartUI() {
            const container = document.getElementById('cart-items');
            const totalEl = document.getElementById('cart-total');
            const countEl = document.getElementById('cart-count');
            
            if (cart.length === 0) {
                container.innerHTML = `<p class="text-slate-400 text-center py-10 font-medium text-sm">Tu carrito está vacío.</p>`;
                totalEl.innerText = '$0.00 MXN';
                countEl.innerText = '0';
                return;
            }

            let html = ''; let total = 0; let itemsCount = 0;
            cart.forEach((item, index) => {
                html += `
                    <div class="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <img src="${item.image}" class="w-16 h-16 rounded-xl object-cover shadow-sm">
                        <div class="flex-1 min-w-0">
                            <p class="font-black text-slate-900 text-sm truncate">${item.name}</p>
                            <p class="text-xs font-bold text-emerald-600 mb-2">$${item.price.toLocaleString()}</p>
                            <div class="flex items-center space-x-2">
                                <button onclick="changeQty(${index}, -1)" class="w-6 h-6 bg-white border rounded-md flex items-center justify-center text-xs font-bold">-</button>
                                <span class="text-xs font-black w-4 text-center">${item.quantity}</span>
                                <button onclick="changeQty(${index}, 1)" class="w-6 h-6 bg-white border rounded-md flex items-center justify-center text-xs font-bold">+</button>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-xs font-black text-slate-900">$${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                    </div>
                `;
                total += item.price * item.quantity;
                itemsCount += item.quantity;
            });

            container.innerHTML = html;
            totalEl.innerText = `$${total.toLocaleString()} MXN`;
            countEl.innerText = itemsCount;
        }

        function changeQty(index, delta) {
            cart[index].quantity += delta;
            if (cart[index].quantity <= 0) cart.splice(index, 1);
            updateCartUI();
        }

        function toggleCart() {
            const drawer = document.getElementById('cart-drawer');
            const overlay = document.getElementById('cart-overlay');
            const isOpen = drawer.classList.contains('open');
            if (!isOpen) {
                drawer.classList.add('open');
                overlay.classList.remove('hidden');
                setTimeout(() => overlay.classList.add('opacity-100'), 10);
            } else {
                drawer.classList.remove('open');
                overlay.classList.remove('opacity-100');
                setTimeout(() => overlay.classList.add('hidden'), 400);
            }
        }

        function filterProducts(cat) {
            renderProducts(cat);
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('bg-white', 'text-emerald-600', 'shadow-sm');
                btn.classList.add('text-slate-500');
                if ((cat === 'todos' && btn.innerText === 'Todos') || btn.innerText.toLowerCase().includes(cat)) {
                    btn.classList.add('bg-white', 'text-emerald-600', 'shadow-sm');
                }
            });
        }

        function moveHero(dir) {
            currentHeroSlide = (currentHeroSlide + dir + 3) % 3;
            document.getElementById('hero-slider').style.transform = `translateX(-${currentHeroSlide * 100}%)`;
        }

        // Lógica mejorada para Checkout / Cotización formal
        function checkout() {
            if (cart.length === 0) return;
            
            // Genera la descripción del pedido directamente en el cuadro de texto del formulario
            let details = "Hola, me interesa recibir una cotización formal para los siguientes productos de mi carrito:\n";
            cart.forEach(item => {
                details += `- ${item.name} (${item.quantity} unidades)\n`;
            });
            
            document.getElementById('form-comments').value = details;
            
            // Cierra el drawer del carrito
            toggleCart();
            
            // Envía la pantalla a la sección de contacto suavemente
            const contactSection = document.getElementById('contacto');
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Resalta el campo del nombre para guiar al usuario
            setTimeout(() => {
                const nameInput = document.getElementById('form-name');
                nameInput.focus();
                nameInput.classList.add('ring-2', 'ring-emerald-500');
                setTimeout(() => nameInput.classList.remove('ring-2', 'ring-emerald-500'), 1500);
            }, 800);
        }

        window.onload = () => {
            renderProducts();
            
            // Configura autoplay automático del slider
            setInterval(() => moveHero(1), 6000);
            
            // Escucha de envío del formulario
            document.getElementById('quote-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('form-name').value;
                alert(`¡Muchas gracias, ${name}! Tu cotización formal ha sido enviada con éxito. Un ejecutivo comercial se comunicará contigo en breve para coordinar el envío.`);
                document.getElementById('quote-form').reset();
                cart = [];
                updateCartUI();
            });
        }
    