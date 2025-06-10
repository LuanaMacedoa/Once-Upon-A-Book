const booksData = [
    {
        id: 1,
        title: "Amor Teoricamente",
        author: " Ali Hazelwood",
        price: 39.90,
        category: "romance",
        image: "./src/assets/img/amor-teoricamente.jpeg",
        rating: 4.5,
        description: "romance universitário."
    },
    {
        id: 2,
        title: "Orgulho e Preconceito",
        author: "Jane Austen",
        price: 45.50,
        category: "romance",
        image: "./src/assets/img/orgulho-e-preconceito.jpeg",
        rating: 5.0,
        description: "O clássico romance que conquistou gerações."
    },
    {
        id: 3,
        title: "A Garota do Lago",
        author: "Charlie Donlea",
        price: 52.90,
        category: "misterio",
        image: "./src/assets/img/uma-janela-sombria.jpeg",
        rating: 4.0,
        description: "Um thriller envolvente cheio de mistérios."
    },
    {
        id: 4,
        title: "Harry Potter e a Pedra Filosofal",
        author: "J.K. Rowling",
        price: 35.90,
        category: "fantasia",
        image: "./src/assets/img/de-sangue-e-cinzas.jpeg",
        rating: 5.0,
        description: "O início da saga mágica mais famosa do mundo."
    },
    {
        id: 5,
        title: "O Senhor dos Anéis",
        author: "J.R.R. Tolkien",
        price: 89.90,
        category: "fantasia",
        image: "./src/assets/img/quarta-asa.jpeg",
        rating: 4.8,
        description: "A épica jornada pela Terra Média."
    },
    {
        id: 6,
        title: "Steve Jobs",
        author: "Walter Isaacson",
        price: 42.90,
        category: "biografia",
        image: "./src/assets/img/uma-vida-e-tanto.jpeg",
        rating: 4.3,
        description: "A biografia autorizada do visionário da Apple."
    },
    {
        id: 7,
        title: "Verity",
        author: "Colleen Hoover",
        price: 38.90,
        category: "misterio",
        image: "./src/assets/img/verity.jpeg",
        rating: 4.2,
        description: "Um thriller psicológico perturbador."
    },
    {
        id: 8,
        title: "Era Uma Vez um Coração Partido",
        author: "Stephanie Meyer",
        price: 55.90,
        category: "romance",
        image: "./src/assets/img/era-uma-vez-um-coracao-partido.jpeg",
        rating: 4.6,
        description: "Uma história de amor emocionante."
    },
    {
        id: 9,
        title: "Os Sete Maridos de Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        price: 48.90,
        category: "biografia",
        image: "./src/assets/img/os-sete-maridos-de-evelyn-hugo.jpeg",
        rating: 4.9,
        description: "A fascinante vida de uma lenda de Hollywood."
    }
];


class BooksManager {
    constructor() {
        this.books = booksData;
        this.filteredBooksCache = new Map();
        this.currentFilter = 'all';
        this.cart = [];
    }

  
    getFilteredBooks(category) {
        
        if (this.filteredBooksCache.has(category)) {
            return this.filteredBooksCache.get(category);
        }

        
        let filtered;
        if (category === 'all') {
            filtered = [...this.books];
        } else {
            filtered = this.books.filter(book => book.category === category);
        }

        
        this.filteredBooksCache.set(category, filtered);
        return filtered;
    }
    
    renderBooks(category = 'all') {
        const booksGrid = document.getElementById('booksGrid');
        const books = this.getFilteredBooks(category);
        booksGrid.innerHTML = '';

        books.forEach((book, index) => {
            const bookElement = this.createBookElement(book, index);
            booksGrid.appendChild(bookElement);
        });

        this.addStaggeredAnimation();
    }    
    createBookElement(book, index) {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-item bg-[#f7f6f4] border-2 border-[#e4d6d8] rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-[#cc9fa4] hover:bg-[#ede3e5] opacity-0 transform translate-y-8 flex flex-col h-full';
        bookDiv.setAttribute('data-category', book.category);
        bookDiv.style.transitionDelay = `${index * 100}ms`;

        const stars = this.generateStars(book.rating);

        bookDiv.innerHTML = `
            <div class="flex justify-center mb-4">
                <img src="${book.image}" alt="${book.title}" 
                     class="w-28 h-36 object-cover rounded-xl shadow-lg"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDEyOCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTYwIiBmaWxsPSIjRTVFN0VCIi8+CjxwYXRoIGQ9Ik00NCA2NEg4NFY5Nkg0NFY2NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K'; this.onerror=null;">
            </div>
            <div class="flex-grow">
                <h3 class="text-[#8a7462] text-lg font-bold mb-2 line-clamp-2">${book.title}</h3>
                <p class="text-[#655548] text-sm mb-2">${book.author}</p>
                <p class="text-[#655548] text-xs mb-3 opacity-75 line-clamp-2">${book.description}</p>
            </div>
            <div class="mt-auto">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-[#8a7462] font-bold">R$ ${book.price.toFixed(2).replace('.', ',')}</span>
                    <div class="flex text-yellow-400 text-sm">
                        ${stars}
                    </div>
                </div>
                <button onclick="booksManager.addToCart(${book.id})" 
                        class="w-full bg-[#cc9fa4] text-white py-2 rounded-lg hover:bg-[#a67a80] transition-colors duration-300 transform hover:scale-105 text-sm font-medium">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;

        return bookDiv;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let starsHTML = '';
  
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        

        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }

        return starsHTML;
    }

    addStaggeredAnimation() {
        const bookItems = document.querySelectorAll('.book-item');
        bookItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('opacity-0', 'translate-y-8');
                item.classList.add('opacity-100', 'translate-y-0');
            }, index * 100);
        });
    }
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-[#cc9fa4]', 'text-white', 'border-[#cc9fa4]');
                    btn.classList.add('bg-[#ede3e5]', 'text-[#8a7462]', 'border-[#e4d6d8]');
                });

                button.classList.add('active', 'bg-[#cc9fa4]', 'text-white', 'border-[#cc9fa4]');
                button.classList.remove('bg-[#ede3e5]', 'text-[#8a7462]', 'border-[#e4d6d8]');

                const category = button.getAttribute('data-category');
                this.currentFilter = category;
                this.renderBooks(category);
            });
        });
    }
    // funções carrinho 
    addToCart(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            this.cart.push(book);
            this.updateCartCount();
            this.updateCartTotal();
            this.renderCartItems();
            this.showAddedFeedback(bookId);
        }
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        cartCount.textContent = this.cart.length;
    }

    updateCartTotal() {
        const total = this.cart.reduce((sum, book) => sum + book.price, 0);
        const cartTotal = document.getElementById('cartTotal');
        cartTotal.textContent = total.toFixed(2).replace('.', ',');
    }

    renderCartItems() {
        const cartItems = document.getElementById('cartItems');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="text-center py-12 text-[#655548]">
                    <i class="fas fa-shopping-cart text-[#cc9fa4] text-5xl mb-4"></i>
                    <p>Seu carrinho está vazio</p>
                </div>
            `;
            return;
        }

        const cartHTML = this.cart.map((book, index) => `
            <div class="flex items-center gap-4 p-4 border-b border-[#e4d6d8]">
                <img src="${book.image}" alt="${book.title}" class="w-16 h-20 object-cover rounded">
                <div class="flex-1">
                    <h4 class="text-[#8a7462] font-semibold">${book.title}</h4>
                    <p class="text-[#655548] text-sm">${book.author}</p>
                    <p class="text-[#8a7462] font-bold">R$ ${book.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <button onclick="booksManager.removeFromCart(${index})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        cartItems.innerHTML = cartHTML;
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.updateCartCount();
        this.updateCartTotal();
        this.renderCartItems();
    }

    showAddedFeedback(bookId) {
        const button = document.querySelector(`button[onclick="booksManager.addToCart(${bookId})"]`);
        if (button) {
            const originalText = button.textContent;
            button.textContent = "Adicionado!";
            button.classList.add('bg-green-500', 'hover:bg-green-600');
            button.classList.remove('bg-[#cc9fa4]', 'hover:bg-[#a67a80]');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('bg-green-500', 'hover:bg-green-600');
                button.classList.add('bg-[#cc9fa4]', 'hover:bg-[#a67a80]');
            }, 2000);
        }
    }

    init() {
        this.renderBooks();
        this.setupFilters();
        this.renderCartItems();
    }
}

const booksManager = new BooksManager();

document.addEventListener('DOMContentLoaded', function() {
    booksManager.init();
});
