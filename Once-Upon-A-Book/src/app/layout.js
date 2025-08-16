"use client";
import { Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";


import { CartProvider } from "./cartContext";
import LayoutWithCart from "../components/LayoutWithCart";



const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable}`}>
      <body className={`${geistMono.variable} antialiased`}>
          <CartProvider>
            <LayoutWithCart>{children}</LayoutWithCart>
          </CartProvider>
      </body>
    </html>
  );
}
