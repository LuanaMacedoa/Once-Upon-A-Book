"use client";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";
import { useCart } from "../app/cartContext";

export default function LayoutWithCart({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={getTotalItems()} onCartClick={() => setCartOpen(true)} />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
  <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
