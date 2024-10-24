// Layout principal de la aplicación
"use client"
import "../../styles/globals.css";
import { ShoppingCartIcon, EnvelopeIcon, UserCircleIcon, HomeIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import Footer from "@/components/Footer";
import { ReactNode } from 'react';
import { CartProvider } from "@/context/CartContext";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <CartProvider>
    <html lang="es">
      <body className="bg-gray-100 flex flex-col min-h-screen">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-600">Tecno House</h1>
            {/* Barra de búsqueda centrada */}
            <div className="flex flex-1 justify-center">
              <div className="flex items-center w-full max-w-md">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="border border-gray-300 rounded-l-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white rounded-r-md py-2 px-4 hover:bg-blue-700 transition duration-200">
                  Buscar
                </button>
              </div>
            </div>
            {/* Secciones de navegación */}
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Button asChild variant="link" className="flex items-center hover:underline">
                    <a href="/" className="flex items-center">
                      <HomeIcon className="h-5 w-5 mr-1" />
                      Inicio
                    </a>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="link" className="flex items-center hover:underline">
                    <a href="/contacto" className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 mr-1" />
                      Contacto
                    </a>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="link" className="flex items-center hover:underline">
                    <a href="/login" className="flex items-center">
                      <UserCircleIcon className="h-5 w-5 mr-1" />
                      Ingresar
                    </a>
                  </Button>
                </li>
                <li>
                <Link href="/cart">
                <Button variant="link" className="flex items-center hover:underline">
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>Carrito</span>
                  </Button>
                </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <Footer/>
      </body>
    </html>
    </CartProvider>
  );
}