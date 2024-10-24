//Página del carrito
// src/pages/cart.tsx
"use client"
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <p className="text-center p-4">El carrito está vacío.</p>;
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Carrito de Compras</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="border p-4 rounded shadow bg-white">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-gray-700">Cantidad: {item.quantity}</p>
            <p className="text-lg font-semibold">Precio: ${item.price.toFixed(2)}</p>
            <Button 
              className="mt-2 bg-red-400 hover:bg-red-600 text-white rounded-xl"
              onClick={() => removeFromCart(item.id)}
            >
              Eliminar
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
        <Link href="/checkout">
        <Button className="m-2 bg-green-400 hover:bg-green-600 text-white rounded-xl" >
          Comprar
        </Button>
        </Link>

        <Button 
          className="m-2 bg-blue-400 hover:bg-blue-600 text-white rounded-xl" 
          onClick={clearCart}
        >
          Vaciar Carrito
        </Button>
        
      </div>
    </div>
  );
};

export default CartPage;
