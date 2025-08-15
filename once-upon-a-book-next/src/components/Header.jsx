"use client";



import { useCart } from "../app/cartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBook, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header({ onCartClick }) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg fixed top-0 left-0 right-0 z-50">
              <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBook} className="text-[#cc9fa4] w-8 h-8 align-middle" />
                  <h1 className="text-[#8a7462] text-2xl font-bold font-playfair">Once Upon a Book</h1>
                </div>
    
                <ul className="hidden md:flex gap-8">
                  <li><a href="#home" className="text-[#655548] hover:text-[#cc9fa4] transition-colors duration-300">Início</a></li>
                  <li><a href="#books" className="text-[#655548] hover:text-[#cc9fa4] transition-colors duration-300">Livros</a></li>
                  <li><a href="#about" className="text-[#655548] hover:text-[#cc9fa4] transition-colors duration-300">Sobre</a></li>
                  <li><a href="#register" className="text-[#655548] hover:text-[#cc9fa4] transition-colors duration-300">Cadastro</a></li>
                  <li><a href="#contact" className="text-[#655548] hover:text-[#cc9fa4] transition-colors duration-300">Contato</a></li>
                </ul>
    
                <div className="flex items-center gap-4">
                  <button className="relative p-2 text-[#8a7462] hover:text-[#cc9fa4] transition-colors duration-300" onClick={onCartClick}>
                    <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                    <span id="cartCount" className="absolute -top-2 -right-2 bg-[#cc9fa4] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{totalItems}</span>
                  </button>
                  <button id="hamburger" className="md:hidden text-[#8a7462]">
                    <FontAwesomeIcon icon={faBars} className="text-xl" />
                  </button>
                </div>
              </nav>
    
              <div id="mobileMenu" className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform -translate-x-full transition-transform duration-300 z-50 md:hidden">
                <div className="p-6">
                  <h2 className="text-[#8a7462] text-xl font-bold mb-6">Menu</h2>
                  <ul className="space-y-4">
                    <li><a href="#home" className="block text-[#655548] hover:text-[#cc9fa4] transition-colors duration-300">Início</a></li>
                    <li><a href="#books" className="block text-[#655548] hover:text-[#cc9fa4] transition-colors duration-300">Livros</a></li>
                    <li><a href="#about" className="block text-[#655548] hover:text-[#cc9fa4] transition-colors duration-300">Sobre</a></li>
                    <li><a href="#register" className="block text-[#655548] hover:text-[#cc9fa4] transition-colors duration-300">Cadastro</a></li>
                    <li><a href="#contact" className="block text-[#655548] hover:text-[#cc9fa4] transition-colors duration-300">Contato</a></li>
                  </ul>
                </div>
              </div>
            </header>
  );
}