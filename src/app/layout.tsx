"use client";
import "../../styles/globals.css";
import { ShoppingCartIcon, EnvelopeIcon, UserCircleIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { ReactNode, useState } from "react";
import { CartProvider } from "@/context/CartContext";
import Link from "next/link";
import SearchBar from '@/components/SearchBar';
import { Toaster } from "@/components/ui/sonner";
import CartPage from "@/app/cart/page"; // Importa el CartPage

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isCartOpen, setCartOpen] = useState(false); // Estado para manejar si el carrito está abierto o no

  const handleCartToggle = () => {
    setCartOpen(prev => !prev); // Alterna el estado del carrito
  };

  return (
    <CartProvider>
      <html lang="es">
        <body className="bg-gray-100 flex flex-col min-h-screen">
          <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-blue-600">Tecno House</h1>
              {/* Barra de búsqueda centrada */}
              <SearchBar />
              {/* Secciones de navegación */}
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Button asChild variant="link" className="flex items-center hover:underline">
                      <Link href="/" className="flex items-center">
                        <HomeIcon className="h-5 w-5 mr-1" />
                        Inicio
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button asChild variant="link" className="flex items-center hover:underline">
                      <Link href="/contacto" className="flex items-center">
                        <EnvelopeIcon className="h-5 w-5 mr-1" />
                        Contacto
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button asChild variant="link" className="flex items-center hover:underline">
                      <Link href="/login" className="flex items-center">
                        <UserCircleIcon className="h-5 w-5 mr-1" />
                        Ingresar
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button onClick={handleCartToggle} variant="link" className="flex items-center hover:underline">
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span>Carrito</span>
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <main className="flex-grow">
            {children}
            {/* Aquí se renderiza el carrito directamente */}
            <CartPage isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
          </main>
          <Toaster />
          <Footer />
        </body>
      </html>
    </CartProvider>
  );
}
