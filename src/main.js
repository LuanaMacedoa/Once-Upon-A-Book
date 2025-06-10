import "./style.css";

renderMensagens();

let cart = [];
let cartCount = 0;
let cartTotal = 0;
function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  cartSidebar.classList.toggle("translate-x-0");
  cartSidebar.classList.toggle("translate-x-full");
}

function addToCart(book) {
  cart.push(book);
  cartCount++;
  cartTotal += book.price;
  updateCartUI();
}

function updateCartUI() {
  document.getElementById("cartCount").textContent = cartCount;
  document.getElementById("cartTotal").textContent = cartTotal
    .toFixed(2)
    .replace(".", ",");

  const cartItems = document.getElementById("cartItems");
  if (cartCount === 0) {
    cartItems.innerHTML = `
                    <div class="text-center py-12 text-text-light">
                        <i class="fas fa-shopping-cart text-primary-pink text-5xl mb-4"></i>
                        <p>Seu carrinho está vazio</p>
                    </div>
                `;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
                    <div class="flex items-center gap-4 p-4 border-b border-primary-pink">
                        <img src="${item.image}" alt="${
          item.title
        }" class="w-16 h-20 object-cover rounded">
                        <div class="flex-1">
                            <h4 class="font-semibold text-text-dark">${
                              item.title
                            }</h4>
                            <p class="text-dark-pink">R$ ${item.price
                              .toFixed(2)
                              .replace(".", ",")}</p>
                        </div>
                        <button onclick="removeFromCart(${
                          item.id
                        })" class="text-red-500 hover:text-red-700 transition-colors">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `
      )
      .join("");
  }
}

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  const spans = hamburger.querySelectorAll("span");

  spans[0].classList.toggle("rotate-45");
  spans[0].classList.toggle("translate-y-2");
  spans[1].classList.toggle("opacity-0");
  spans[2].classList.toggle("-rotate-45");
  spans[2].classList.toggle("-translate-y-2");

  mobileMenu.classList.toggle("-translate-x-full");
  mobileMenu.classList.toggle("translate-x-0");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.remove("bg-dark-pink", "text-white", "border-dark-pink");
      b.classList.add(
        "bg-light-pink",
        "text-primary-brown",
        "border-primary-pink"
      );
    });

    btn.classList.remove(
      "bg-light-pink",
      "text-primary-brown",
      "border-primary-pink"
    );
    btn.classList.add("bg-dark-pink", "text-white", "border-dark-pink");
  });
});
