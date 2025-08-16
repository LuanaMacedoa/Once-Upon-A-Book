"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../app/cartContext';

export default function BookList({ books }) {
  const { addItem } = useCart();

  const [added, setAdded] = React.useState({});

  const handleAdd = (book) => {
    addItem(book);
    setAdded((prev) => ({ ...prev, [book.id]: true }));
    setTimeout(() => {
      setAdded((prev) => ({ ...prev, [book.id]: false }));
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto" id="booksGrid">
      {books.map((book) => (
        <div key={book.id} className="book-item bg-white border-2 border-[#e4d6d8] rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-[#cc9fa4] hover:bg-[#ede3e5] flex flex-col h-full">
          <div className="flex justify-center mb-4">
            <Image
              src={book.image}
              alt={book.title}
              width={112}
              height={144}
              className="w-28 h-36 object-cover rounded-xl shadow-lg"
              priority
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-[#8a7462] text-lg font-bold mb-2 line-clamp-2">{book.title}</h3>
            <p className="text-[#655548] text-sm mb-2">{book.author}</p>
            <p className="text-[#655548] text-xs mb-3 opacity-75 line-clamp-2">{book.description}</p>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#8a7462] font-bold">R$ {book.price.toFixed(2).replace('.', ',')}</span>
              <div className="flex text-yellow-400 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.floor(book.rating) ? '★' : '☆'}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAdd(book)}
                className={`w-full py-2 rounded-lg text-sm font-medium text-center transition-colors duration-300 transform hover:scale-105 ${added[book.id] ? 'bg-green-500 text-white' : 'bg-[#cc9fa4] text-white hover:bg-[#a67a80]'}`}
              >
                {added[book.id] ? 'Adicionado!' : 'Adicionar ao carrinho'}
              </button>
              <Link href={`/produto/${book.id}`} legacyBehavior>
                <a className="w-full block bg-[#ede3e5] text-[#8a7462] py-2 rounded-lg hover:bg-[#cc9fa4] hover:text-white transition-colors duration-300 transform hover:scale-105 text-sm font-medium text-center border border-[#cc9fa4]">
                  Ver detalhes
                </a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
