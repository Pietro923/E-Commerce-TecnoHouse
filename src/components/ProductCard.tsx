// src/components/ProductCard.tsx
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { Heart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  description, 
  price, 
  imageUrl, 
  inStock = true 
}) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to detail page

    if (!inStock) {
      toast.error("Producto agotado", {
        description: "Lo sentimos, este producto no está disponible en este momento."
      });
      return;
    }

    addToCart({
      id, 
      name, 
      price, 
      quantity: 1, 
      imageUrl
    });

    toast.success(`${name} agregado al carrito`, {
      description: `Se ha agregado "${name}" a tu carrito de compras.`,
      duration: 2000,
    });
  };

  const handleNavigateToDetail = () => {
    router.push(`/shop/${id}`);
  };

  return (
    <div 
      className="relative border p-4 rounded-lg shadow-md bg-white flex flex-col transition-all duration-300 hover:shadow-xl group"
      onClick={handleNavigateToDetail}
    >
      {/* Wishlist/Favorite Button */}
      <button 
        className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          // Implement wishlist functionality
          toast("Añadido a favoritos", {
            description: `"${name}" ha sido agregado a tus favoritos.`
          });
        }}
      >
        <Heart 
          className="text-gray-400 hover:text-red-500 transition-colors" 
          fill="currentColor" 
          size={24} 
        />
      </button>

      {/* Product Image with Next.js Image component */}
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
        <img 
          src={imageUrl} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          priority={false}
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold bg-red-500 px-3 py-1 rounded">
              Agotado
            </span>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mb-2 line-clamp-2">{name || 'Sin nombre'}</h2>
      <p className="text-gray-700 mb-2 line-clamp-3">{description || 'Sin descripción'}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <p className="text-lg font-semibold">
          {price ? `$${price.toFixed(2)}` : '0.00'}
        </p>
        <Button 
          variant={inStock ? "default" : "ghost"}
          className={`
            ${inStock 
              ? 'bg-blue-400 hover:bg-blue-600' 
              : 'text-gray-400 cursor-not-allowed'}
            rounded-xl
          `}
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          {inStock ? 'Agregar al Carrito' : 'Agotado'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;