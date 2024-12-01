// index.tsx
"use client"
import React, { useState } from 'react';
import ProductList from '@/components/ProductList';
import { Search } from 'lucide-react';
import "../../styles/globals.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <h2 className="text-3xl font-bold text-gray-800">
              Descubre Nuestros Productos
            </h2>
            
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Carga del componente de la lista de productos */}
          <ProductList searchQuery={searchQuery} />
        </div>
      </main>
    </div>
  );
}