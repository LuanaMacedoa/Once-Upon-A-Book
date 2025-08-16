"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const STORAGE_KEY = "ouab_cart_items";

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  function addItem(book) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        return [...prev, { ...book, quantity: 1 }];
      }
    });
  }

  function removeItem(bookId) {
    setCart((prev) => prev.filter((item) => item.id !== bookId));
  }

  function updateQuantity(bookId, newQuantity) {
    if (newQuantity <= 0) {
      removeItem(bookId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  }

  function getTotalItems() {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, clearCart, calculateTotal, getTotalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
