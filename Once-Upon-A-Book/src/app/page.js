"use client";
import React, { useState } from 'react';
import { booksData } from './booksData';
import BookList from '../components/BookList';
import Header from '../components/Header';
import CartSidebar from '../components/CartSidebar';
import SuccessModal from '../components/SuccessModal';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader, faPercentage, faTruck, faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
  const [category, setCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalCadastroOpen, setModalCadastroOpen] = useState(false);

  // Filtra os livros conforme a categoria selecionada
  let filteredBooks = booksData;
  if (category === 'romance') {
    filteredBooks = booksData.filter(book => [
      'Amor Teoricamente',
      'Orgulho e Preconceito'
    ].includes(book.title));
  } else if (category === 'fantasia') {
    filteredBooks = booksData.filter(book => [
      'Uma Janela Sombria',
      'De Sangue Cinzas',
      'Quarta Rosa',
      'Era Uma Vez um Coração Partido'
    ].includes(book.title));
  } else if (category === 'misterio') {
    filteredBooks = booksData.filter(book => [
      'Verity'
    ].includes(book.title));
  } else if (category === 'ficção') {
    filteredBooks = booksData.filter(book => [
      'Uma Vida e Tanto',
      'Os Sete Maridos de Evelyn Hugo'
    ].includes(book.title));
  } else if (category !== 'all') {
    filteredBooks = booksData.filter(book => book.category && book.category.toLowerCase() === category);
  }

  // Função para trocar categoria com fade
  const handleCategoryChange = (newCategory) => {
    if (newCategory === category) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCategory(newCategory);
      setIsTransitioning(false);
    }, 300);
  };

  // Handler para abrir/fechar o carrinho
  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  return (
    <>
      <Head>
        <title>Once Upon a Book - Sua Livraria Online</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`.font-poppins { font-family: 'Poppins', sans-serif; } .font-playfair { font-family: 'Playfair Display', serif; }`}</style>
      </Head>

      <Header onCartClick={handleCartOpen} />
      <CartSidebar open={cartOpen} onClose={handleCartClose} />

      <main>
        {/* Hero */}
        <section className="w-full bg-gradient-to-b from-[#f7f6f4] to-[#c7bbad] min-h-[70vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-[#8a7462] font-playfair mb-8">Bem-vindo à Once Upon a Book</h1>
          <p className="text-xl md:text-2xl text-[#655548] mb-10">Descubra mundos incríveis através da leitura</p>
          <a href="#books" className="inline-block px-10 py-5 rounded-full bg-[#cc9fa4] text-white font-bold text-lg shadow-lg hover:bg-[#a67a80] transition-all duration-300">Ver Catálogo</a>
        </section>

        {/* Livros e filtros */}
        <section id="books" className="py-16 md:py-24 bg-white w-full">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-center text-3xl md:text-4xl mb-12 text-[#8a7462] font-bold font-playfair">Nossos Livros</h2>
            <div className="flex justify-center gap-4 mb-8">
              {['all', 'romance', 'fantasia', 'misterio', 'ficção'].map(cat => (
                <button
                  key={cat}
                  className={`filter-btn px-6 py-2 rounded-full font-bold transition-all duration-300 ${category === cat ? 'bg-[#cc9fa4] text-white' : 'bg-[#f7f6f4] text-[#8a7462]'}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <BookList books={filteredBooks} />
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section id="about" className="py-16 md:py-24 bg-[#f7f6f4] w-full">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <p className="text-lg text-[#655548]">Somos uma livraria online apaixonada por conectar leitores aos melhores livros.</p>
            <div className="flex justify-center">
              <div className="w-80 h-60 md:w-96 md:h-72 bg-gradient-to-r from-[#ede3e5] to-[#a6998a] rounded-2xl flex items-center justify-center shadow-2xl">
                <FontAwesomeIcon icon={faBookReader} className="text-[#8a7462] text-6xl md:text-7xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Cadastro */}
        <section id="register" className="py-16 md:py-24 bg-white w-full">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#8a7462] mb-8 text-2xl font-semibold">Vantagens de se cadastrar:</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 bg-[#f7f6f4] rounded-2xl">
                  <FontAwesomeIcon icon={faPercentage} className="text-[#cc9fa4]" />
                  <span>Descontos Exclusivos</span>
                </div>
                <div className="flex items-center gap-4 p-6 bg-[#f7f6f4] rounded-2xl">
                  <FontAwesomeIcon icon={faTruck} className="text-[#cc9fa4]" />
                  <span>Frete Grátis</span>
                </div>
                <div className="flex items-center gap-4 p-6 bg-[#f7f6f4] rounded-2xl">
                  <FontAwesomeIcon icon={faStar} className="text-[#cc9fa4]" />
                  <span>Programa de Pontos</span>
                </div>
              </div>
            </div>
            <form
              className="bg-[#f7f6f4] p-6 rounded-2xl"
              onSubmit={e => {
                e.preventDefault();
                setModalCadastroOpen(true);
              }}
            >
              <input type="text" placeholder="Nome completo" required className="w-full mb-4 p-2 border" />
              <input type="email" placeholder="E-mail" required className="w-full mb-4 p-2 border" />
              <button type="submit" className="w-full bg-[#cc9fa4] text-white py-2 rounded-lg">Criar Conta</button>
              <SuccessModal
                open={modalCadastroOpen}
                onClose={() => setModalCadastroOpen(false)}
                title="Conta Criada com Sucesso!"
                message="Bem-vindo à nossa livraria online!"
                showLogin={true}
              />
            </form>
          </div>
        </section>

        {/* Contato */}
        <section id="contact" className="py-16 md:py-24 bg-[#ede3e5] w-full">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form className="bg-white p-6 rounded-2xl shadow-2xl">
              <input type="text" placeholder="Seu nome" className="w-full mb-4 p-2 border" />
              <input type="email" placeholder="Seu e-mail" className="w-full mb-4 p-2 border" />
              <textarea placeholder="Sua mensagem" rows="5" className="w-full mb-4 p-2 border"></textarea>
              <button type="submit" className="w-full bg-[#cc9fa4] text-white py-2 rounded-lg">Enviar Mensagem</button>
            </form>
            <div className="hidden flex-col items-center justify-center bg-[#f7f6f4] p-8 rounded-2xl shadow-2xl">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-5xl mb-4" />
              <h3 className="text-[#8a7462] text-xl font-bold mb-2">Obrigado!</h3>
              <p className="text-[#655548] text-center">Sua mensagem foi enviada com sucesso!</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
