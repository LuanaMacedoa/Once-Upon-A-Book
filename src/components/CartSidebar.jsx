"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../app/cartContext';

function CartSidebar({ open, onClose }) {
  const { cart, updateQuantity, removeItem, clearCart, calculateTotal } = useCart();
  return (
    <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform ${open ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-50`}>
      <div className="p-6 border-b border-[#e4d6d8]">
        <div className="flex items-center justify-between">
          <h2 className="text-[#8a7462] text-2xl font-bold">Carrinho</h2>
          <button onClick={onClose} className="text-[#8a7462] hover:text-[#cc9fa4] ml-2">
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ height: "calc(100vh - 200px)" }}>
        {cart.length === 0 ? (
          <div className="text-center py-12 text-[#655548]">
            <span className="flex justify-center mb-4">
              <FontAwesomeIcon icon={faShoppingCart} className="text-[#cc9fa4]" style={{fontSize: '64px'}} />
            </span>
            <p>Seu carrinho está vazio</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item flex items-center gap-4 p-4 border-b border-[#e4d6d8]">
              <img src={item.image} alt={item.title} className="w-12 h-16 object-cover rounded" />
              <div className="flex-1">
                <h4 className="text-[#8a7462] font-semibold text-sm">{item.title}</h4>
                <p className="text-[#655548] text-xs">{item.author}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)} className="w-7 h-7 bg-[#e4d6d8] text-[#8a7462] rounded flex items-center justify-center text-lg font-bold hover:bg-[#cc9fa4] hover:text-white transition-colors" aria-label="Diminuir quantidade">-</button>
                  <span className="text-[#8a7462] font-semibold px-3 text-base select-none">{item.quantity || 1}</span>
                  <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)} className="w-7 h-7 bg-[#cc9fa4] text-white rounded flex items-center justify-center text-lg font-bold hover:bg-[#a67a80] transition-colors" aria-label="Aumentar quantidade">+</button>
                </div>
                <p className="text-[#8a7462] font-bold mt-1">R$ {(item.price * (item.quantity || 1)).toFixed(2).replace('.', ',')}</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-2 transition-colors">
                <FontAwesomeIcon icon={faTrash} className="text-xl" />
              </button>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="p-6 border-t border-[#e4d6d8] bg-[#f7f6f4]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#8a7462] font-bold">Total:</span>
            <span className="text-[#8a7462] font-bold text-xl">R$ {calculateTotal().toFixed(2).replace('.', ',')}</span>
          </div>
          <button className="w-full bg-[#cc9fa4] text-white py-4 rounded-lg font-bold transition-all duration-300 hover:bg-[#a67a80] hover:-translate-y-1 shadow-lg hover:shadow-xl mb-2" onClick={() => { alert('Compra finalizada com sucesso! Obrigado por comprar conosco.'); clearCart(); }}>Finalizar Compra</button>
          <button onClick={clearCart} className="w-full bg-[#ede3e5] text-[#8a7462] py-4 rounded-lg font-bold transition-all duration-300 hover:bg-[#cc9fa4] hover:text-white mb-2 mt-2 border border-[#cc9fa4]">Limpar Carrinho</button>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;
