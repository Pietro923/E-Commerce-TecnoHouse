"use client";
import "../../styles/globals.css";
import { ShoppingCartIcon, EnvelopeIcon, UserCircleIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { ReactNode, useState } from "react";
import { CartProvider, useCart } from "@/context/CartContext";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import CartPage from "@/app/cart/page";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isCartOpen, setCartOpen] = useState(false);

  const handleCartToggle = () => {
    setCartOpen((prev) => !prev);
  };

  return (
    
    <CartProvider>
      <html>
      <body>
      <div className="bg-gray-50 flex flex-col min-h-screen">
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-blue-600 tracking-tight"
            >
              Tecno House
            </motion.h1>
             
            <nav>
              <ul className="flex space-x-4">
                {[
                  { href: "/", icon: HomeIcon, label: "Inicio" },
                  { href: "/contacto", icon: EnvelopeIcon, label: "Contacto" },
                  { href: "/login", icon: UserCircleIcon, label: "Ingresar" }
                ].map((item) => (
                  <li key={item.href}>
                    <Button 
                      asChild 
                      variant="ghost" 
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <Link href={item.href} className="flex items-center">
                        <item.icon className="h-5 w-5 mr-2 text-blue-500" />
                        {item.label}
                      </Link>
                    </Button>
                  </li>
                ))}
                
                <li>
                  <Button
                    onClick={handleCartToggle}
                    variant="ghost"
                    className="hover:bg-blue-50 relative transition-colors"
                  >
                    <ShoppingCartIcon className="h-5 w-5 text-blue-500" />
                    <span className="ml-2">Carrito</span>
                    <CartCountBadge />
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <AnimatePresence>
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow"
          >
            {children}
            
            <AnimatePresence>
              {isCartOpen && (
                <CartPage 
                  isOpen={isCartOpen} 
                  onClose={() => setCartOpen(false)} 
                />
              )}
            </AnimatePresence>
          </motion.main>
        </AnimatePresence>

        <Toaster />
        <Footer />
      </div>
        </body>
      </html>
    </CartProvider>
  );
}

function CartCountBadge() {
  const { cartCount } = useCart();
  
  if (cartCount === 0) return null;

  return (
    <motion.span 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center"
    >
      {cartCount}
    </motion.span>
  );
}

export { Layout };