"use client"
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  ShoppingCart, 
  Package, 
  MapPin, 
  User, 
  DollarSign, 
  CheckCircle2 
} from 'lucide-react';

export default function Checkout() {
  const [shippingMethod, setShippingMethod] = useState('standard');
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <ShoppingCart className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <p className="text-red-500 font-semibold">
            Error: El contexto del carrito no está disponible
          </p>
        </div>
      </div>
    );
  }

  const { cart } = cartContext;

  // Calcular totales
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === 'express' ? 15.00 : 5.00;
  const totalPrice = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Detalles de Compra */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
            <CreditCard className="mr-3 text-blue-600" />
            Detalles de Compra
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500">No tienes productos en tu carrito</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Package className="text-blue-500 w-6 h-6" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-500 text-sm">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-blue-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Método de Envío */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  <MapPin className="inline-block mr-2 text-blue-600" />
                  Método de Envío
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <label 
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      shippingMethod === 'standard' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="hidden"
                    />
                    <div className="flex justify-between items-center">
                      <span>Estándar (5-7 días)</span>
                      <span className="font-bold">$5.00</span>
                    </div>
                  </label>
                  <label 
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      shippingMethod === 'express' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="shipping" 
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="hidden"
                    />
                    <div className="flex justify-between items-center">
                      <span>Express (2-3 días)</span>
                      <span className="font-bold">$15.00</span>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Columna Derecha: Resumen de Orden */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
            <DollarSign className="mr-3 text-green-600" />
            Resumen de Orden
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Envío</span>
              <span className="font-semibold">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            className="w-full mt-6 bg-green-500 hover:bg-green-600 flex items-center justify-center"
            disabled={cart.length === 0}
          >
            <CheckCircle2 className="mr-2" />
            Confirmar Compra
          </Button>
        </div>
      </div>
    </div>
  );
}