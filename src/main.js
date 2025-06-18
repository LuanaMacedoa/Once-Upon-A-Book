import './books.js'

import { CartManager } from './cartManager.js';

import "./style.css";


const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.toggle('translate-x-full');
}

document.getElementById('hamburger').addEventListener('click', function () {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('-translate-x-full');
});

document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.add('-translate-x-full');
  });
});

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



const enhancedCartManager = new CartManager();

document.addEventListener("DOMContentLoaded", () => {
  const enhancedCartManager = new CartManager();

  const finalizarBtn = document.getElementById("finalizarCompra");

  if (finalizarBtn) {
    finalizarBtn.addEventListener("click", () => {
      if (enhancedCartManager.cart.length === 0) {
        alert("Seu carrinho está vazio.");
      } else {
        alert("Compra finalizada com sucesso!");
        enhancedCartManager.clearCart();
      }
    });
  }
});