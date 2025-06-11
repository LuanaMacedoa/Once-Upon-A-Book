export class CartManager {
    constructor() {
        this.cart = this.loadFromStorage();
        this.STORAGE_KEY = 'ouab_cart_items';
        this.initializeCart();
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Erro ao carregar carrinho:', error);
            return [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart));
        } catch (error) {
            console.error('Erro ao salvar carrinho:', error);
        }
    }

    calculateTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
    }

    getTotalItems() {
        return this.cart.reduce((total, item) => {
            return total + (item.quantity || 1);
        }, 0);
    }

    findItem(bookId) {
        return this.cart.filter(item => item.id === bookId)[0];
    }

    removeItem(bookId) {
        this.cart = this.cart.filter(item => item.id !== bookId);
        this.saveToStorage();
        this.updateDisplay();
    }

    updateQuantity(bookId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(bookId);
            return;
        }

        this.cart = this.cart.map(item => 
            item.id === bookId 
                ? { ...item, quantity: newQuantity }
                : item
        );
        this.saveToStorage();
        this.updateDisplay();
    }

    addItem(book) {
        const existingItem = this.findItem(book.id);
        
        if (existingItem) {
            this.updateQuantity(book.id, (existingItem.quantity || 1) + 1);
        } else {
            this.cart.push({ ...book, quantity: 1 });
            this.saveToStorage();
            this.updateDisplay();
        }
    }

    renderCartItems() {
        const cartContainer = document.getElementById('cartItems');
        if (!cartContainer) return;

        if (this.cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="text-center py-12 text-[#655548]">
                    <i class="fas fa-shopping-cart text-[#cc9fa4] text-5xl mb-4"></i>
                    <p>Seu carrinho está vazio</p>
                </div>
            `;
            return;
        }

        const itemsHTML = this.cart.map(item => `
            <div class="cart-item flex items-center gap-4 p-4 border-b border-[#e4d6d8]">
                <img src="${item.image}" alt="${item.title}" class="w-12 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="text-[#8a7462] font-semibold text-sm">${item.title}</h4>
                    <p class="text-[#655548] text-xs">${item.author}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button onclick="enhancedCartManager.updateQuantity(${item.id}, ${(item.quantity || 1) - 1})" 
                                class="w-6 h-6 bg-[#e4d6d8] text-[#8a7462] rounded flex items-center justify-center text-sm hover:bg-[#cc9fa4] hover:text-white transition-colors">-</button>
                        <span class="text-[#8a7462] font-semibold px-2">${item.quantity || 1}</span>
                        <button onclick="enhancedCartManager.updateQuantity(${item.id}, ${(item.quantity || 1) + 1})" 
                                class="w-6 h-6 bg-[#cc9fa4] text-white rounded flex items-center justify-center text-sm hover:bg-[#a67a80] transition-colors">+</button>
                    </div>
                    <p class="text-[#8a7462] font-bold mt-1">R$ ${((item.price * (item.quantity || 1)).toFixed(2)).replace('.', ',')}</p>
                </div>
                <button onclick="enhancedCartManager.removeItem(${item.id})" 
                        class="text-red-500 hover:text-red-700 p-2 transition-colors">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        cartContainer.innerHTML = itemsHTML;
    }

    updateDisplay() {
        this.renderCartItems();
        this.updateCounter();
        this.updateTotal();
    }

    updateCounter() {
        const counter = document.getElementById('cartCount');
        if (counter) {
            counter.textContent = this.getTotalItems();
        }
    }

    updateTotal() {
        const totalElement = document.getElementById('cartTotal');
        if (totalElement) {
            const total = this.calculateTotal();
            totalElement.textContent = total.toFixed(2).replace('.', ',');
        }
    }

    getCartStats() {
        const categories = {};
        this.cart
            .filter(item => item.quantity > 0)
            .forEach(item => {
                categories[item.category] = (categories[item.category] || 0) + item.quantity;
            });

        return {
            totalItems: this.getTotalItems(),
            totalValue: this.calculateTotal(),
            categories: categories,
            uniqueBooks: this.cart.length
        };
    }

    clearCart() {
        this.cart = [];
        this.saveToStorage();
        this.updateDisplay();
    }

    initializeCart() {
        this.updateDisplay();
    }

    exportCartData() {
        return {
            items: this.cart,
            stats: this.getCartStats(),
            timestamp: new Date().toISOString()
        };
    }
}
