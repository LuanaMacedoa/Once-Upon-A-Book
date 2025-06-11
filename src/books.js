import { CartManager } from './cartManager.js';
import { FormManager } from './formManager.js';

const booksData = [
    {
        id: 1,
        title: "Amor Teoricamente",
        author: " Ali Hazelwood",
        price: 39.90,
        category: "romance",
        image: "./src/assets/img/amor-teoricamente.jpeg",
        rating: 4.5,
        description: "Romance universitário."
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
        title: "Uma Janela Sombria",
        author: "Rachel Gillig",
        price: 52.90,
        category: "fantasia",
        image: "./src/assets/img/uma-janela-sombria.jpeg",
        rating: 4.0,
        description: "Um fantasia envolvente cheio de mistérios."
    },
    {
        id: 4,
        title: "De Sangue e Cinzas",
        author: "Jennifer L. Armentrout",
        price: 35.90,
        category: "fantasia",
        image: "./src/assets/img/de-sangue-e-cinzas.jpeg",
        rating: 5.0,
        description: "O início de uma saga famosa e espetacular."
    },
    {
        id: 5,
        title: "Quarta Asa",
        author: "Rebecca Yarros",
        price: 89.90,
        category: "fantasia",
        image: "./src/assets/img/quarta-asa.jpeg",
        rating: 4.8,
        description: "A épica jornada pelo Instituto Basgiath."
    },
    {
        id: 6,
        title: "Uma Vida e Tanto",
        author: "Emily Henry",
        price: 42.90,
        category: "ficção",
        image: "./src/assets/img/uma-vida-e-tanto.jpeg",
        rating: 4.3,
        description: "O mais novo da rainha do romance."
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
        category: "fantasia",
        image: "./src/assets/img/era-uma-vez-um-coracao-partido.jpeg",
        rating: 4.6,
        description: "Uma história de amor emocionante."
    },
    {
        id: 9,
        title: "Os Sete Maridos de Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        price: 48.90,
        category: "ficção",
        image: "./src/assets/img/os-sete-maridos-de-evelyn-hugo.jpeg",
        rating: 4.9,
        description: "A fascinante vida de uma lenda de Hollywood."
    }
];

let booksState = {
    books: booksData,
    filteredBooksCache: new Map(),
    currentFilter: 'all',
    cartManager: new CartManager(),
    formManager: new FormManager()
};

function finalizePurchase() {
    const cartItems = booksState.cartManager.getTotalItems();
    console.log("Cart Items:", cartItems); 
    
    if (cartItems.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de finalizar a compra.");
        return;
    }

    alert("Compra finalizada com sucesso! Obrigado por comprar conosco.");
    booksState.cartManager.clearCart();
    console.log("Cart cleared.");
    renderBooks();
}

function getFilteredBooks(category) {
    if (booksState.filteredBooksCache.has(category)) {
        return booksState.filteredBooksCache.get(category);
    }

    let filtered;
    if (category === 'all') {
        filtered = [...booksState.books];
    } else {
        filtered = booksState.books.filter(book => book.category === category);
    }
    
    booksState.filteredBooksCache.set(category, filtered);
    return filtered;
}
    
function renderBooks(category = 'all') {
    const booksGrid = document.getElementById('booksGrid');
    const books = getFilteredBooks(category);
    booksGrid.innerHTML = '';

    const bookElements = books.map((book, index) => {
        return createBookElement(book, index);
    });

    bookElements.forEach(element => {
        booksGrid.appendChild(element);
    });

    addStaggeredAnimation();
}

function createBookElement(book, index) {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book-item bg-[#f7f6f4] border-2 border-[#e4d6d8] rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-[#cc9fa4] hover:bg-[#ede3e5] opacity-0 transform translate-y-8 flex flex-col h-full';
    bookDiv.setAttribute('data-category', book.category);
    bookDiv.style.transitionDelay = `${index * 100}ms`;

    const stars = generateStars(book.rating);

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
            <button onclick="addToCart(${book.id})" 
                    class="w-full bg-[#cc9fa4] text-white py-2 rounded-lg hover:bg-[#a67a80] transition-colors duration-300 transform hover:scale-105 text-sm font-medium">
                Adicionar ao Carrinho
            </button>
        </div>
    `;

    return bookDiv;
}

function generateStars(rating) {
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

function addStaggeredAnimation() {
    const bookItems = document.querySelectorAll('.book-item');
    const itemsArray = [...bookItems];
    
    const timeouts = itemsArray.map((item, index) => {
        return setTimeout(() => {
            item.classList.remove('opacity-0', 'translate-y-8');
            item.classList.add('opacity-100', 'translate-y-0');
        }, index * 100);
    });

    return timeouts;
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const buttonArray = [...filterButtons];
    
    const eventHandlers = buttonArray.map(button => {
        const handler = () => {
            buttonArray.forEach(btn => {
                btn.classList.remove('active', 'bg-[#cc9fa4]', 'text-white', 'border-[#cc9fa4]');
                btn.classList.add('bg-[#ede3e5]', 'text-[#8a7462]', 'border-[#e4d6d8]');
            });

            button.classList.add('active', 'bg-[#cc9fa4]', 'text-white', 'border-[#cc9fa4]');
            button.classList.remove('bg-[#ede3e5]', 'text-[#8a7462]', 'border-[#e4d6d8]');

            const category = button.getAttribute('data-category');
            booksState.currentFilter = category;
            renderBooks(category);
        };

        button.addEventListener('click', handler);
        return { button, handler }; 
    });

    return eventHandlers;
}

function addToCart(bookId) {
    const book = booksState.books.find(b => b.id === bookId);
    if (book) {
        booksState.cartManager.addItem(book);
        showAddedFeedback(bookId);
    }
}

function showAddedFeedback(bookId) {
    const button = document.querySelector(`button[onclick="addToCart(${bookId})"]`);
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

function getBooksStatistics() {
    return booksState.books.reduce((stats, book) => {
        stats.categories[book.category] = (stats.categories[book.category] || 0) + 1;
        
        stats.totalValue += book.price;
        stats.highestPrice = Math.max(stats.highestPrice, book.price);
        stats.lowestPrice = Math.min(stats.lowestPrice, book.price);
        
        stats.totalRating += book.rating;
        stats.bookCount++;
        
        return stats;
    }, {
        categories: {},
        totalValue: 0,
        highestPrice: 0,
        lowestPrice: Infinity,
        totalRating: 0,
        bookCount: 0,
        averagePrice: 0,
        averageRating: 0
    });
}

function searchBooks(query) {
    if (!query) return booksState.books;
    
    const searchTerm = query.toLowerCase();
    return booksState.books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm)
    );
}

function getBooksForCategory(category) {
    return getFilteredBooks(category).map(book => ({
        ...book,
        formattedPrice: `R$ ${book.price.toFixed(2).replace('.', ',')}`,
        categoryDisplayName: getCategoryDisplayName(book.category),
        ratingStars: generateStars(book.rating),
        isAffordable: book.price <= 50.00
    }));
}

function getRecommendations(currentBookId, limit = 3) {
    const currentBook = booksState.books.find(book => book.id === currentBookId);
    if (!currentBook) return [];

    return booksState.books
        .filter(book => book.id !== currentBookId)
        .map(book => ({
            ...book,
            score: calculateSimilarityScore(currentBook, book)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

function calculateSimilarityScore(book1, book2) {
    let score = 0;
    if (book1.category === book2.category) score += 3;
    if (Math.abs(book1.price - book2.price) <= 10) score += 2;
    if (Math.abs(book1.rating - book2.rating) <= 0.5) score += 1;
    return score;
}

function getCategoryDisplayName(category) {
    const displayNames = {
        'romance': 'Romance',
        'fantasia': 'Fantasia',
        'misterio': 'Mistério',
        'biografia': 'Biografia',
        'ficção': 'Ficção'
    };
    return displayNames[category] || category;
}

function initBooksManager() {
    renderBooks();
    setupFilters();
}

function toggleCart() {
    const cartSidebar = document.getElementById("cartSidebar");
    cartSidebar.classList.toggle("translate-x-0");
    cartSidebar.classList.toggle("translate-x-full");
}

export { 
    initBooksManager,
    renderBooks, 
    addToCart, 
    finalizePurchase,
    searchBooks,
    getBooksStatistics,
    getRecommendations,
    toggleCart,
    getBooksForCategory
};

window.addToCart = addToCart;
window.toggleCart = toggleCart;
window.finalizePurchase = finalizePurchase;
window.enhancedCartManager = booksState.cartManager;

document.addEventListener('DOMContentLoaded', function() {
    initBooksManager();
    
    const finalizeButton = document.getElementById('finalizePurchaseButton');
    if (finalizeButton) {
        console.log("Finalize button found, adding event listener");
        finalizeButton.onclick = function() {
            console.log("Finalizar Compra button clicked");
            finalizePurchase();
        };
    } else {
        console.error("Finalizar Compra button not found");
    }
});