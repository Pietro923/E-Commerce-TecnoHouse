// Componente para items en el carrito
// src/components/CartItem.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, imageUrl }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = () => {
    removeFromCart(id);
  };

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <div className="flex items-center border-b border-gray-200 py-4 transition-all duration-300 hover:bg-gray-50 rounded-lg px-2">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-20 h-20 object-cover mr-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105" 
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-blue-600 font-semibold mb-2">Precio: ${price.toFixed(2)}</p>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={handleDecrease}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="text-gray-700 font-medium min-w-[40px] text-center">
            {quantity}
          </span>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={handleIncrease}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <p className="text-lg font-bold text-gray-900">
          ${(price * quantity).toFixed(2)}
        </p>
        
        <Button 
          variant="destructive" 
          size="icon" 
          className="h-10 w-10 rounded-full"
          onClick={handleRemove}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;