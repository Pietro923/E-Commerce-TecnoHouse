import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Trash2, ShoppingCart, X } from 'lucide-react';

interface CartPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPage = ({ isOpen, onClose }: CartPageProps) => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[400px] sm:w-[540px] bg-white shadow-xl"
      >
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center text-2xl font-bold text-gray-800">
            <ShoppingCart className="mr-3 text-blue-600" />
            Carrito de Compras
          </SheetTitle>
          <SheetDescription className="text-gray-500">
            Revisa los artículos que has seleccionado
          </SheetDescription>
        </SheetHeader>

        <div className="max-h-[70vh] overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500">Tu carrito está vacío</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li 
                  key={item.id} 
                  className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-600">
                        Cantidad: {item.quantity} 
                        <span className="ml-2 text-sm text-gray-500">
                          (${item.price.toFixed(2)} c/u)
                        </span>
                      </p>
                      <p className="font-bold text-blue-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold text-gray-800">Total</p>
              <p className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</p>
            </div>
            <div className="flex space-x-3">
              <Link href="/checkout" className="flex-grow">
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={onClose}
                >
                  Finalizar Compra
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={clearCart}
              >
                <X className="mr-2 w-4 h-4" /> Vaciar Carrito
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartPage;