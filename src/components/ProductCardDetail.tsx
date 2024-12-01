import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  ImageUrl: string;
}

interface ProductCardDetailProps {
  product: Product;
  onAddToCart: (product: { id: string; name: string; ImageUrl: string; price: number; quantity: number }) => void;
}

const ProductCardDetail: React.FC<ProductCardDetailProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name: product.name,
      ImageUrl: product.ImageUrl,
      price: product.price,
      quantity: 1,
    });

    toast(`${product.name} agregado al carrito`, {
      description: `Se ha agregado "${product.name}" a tu carrito de compras.`,
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-2xl border border-blue-100 transition-all duration-300 hover:shadow-3xl">
      <div className="relative w-full md:w-96 h-96 mb-6 md:mb-0 md:mr-8 overflow-hidden rounded-2xl shadow-lg">
        <img
          src={product.ImageUrl}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="flex flex-col justify-between w-full bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div>
          <h1 className="text-4xl font-bold text-blue-700 mb-4 tracking-tight">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>
        </div>
        <div>
          <p className="text-3xl font-extrabold text-blue-600 mb-6">
            ${product.price.toFixed(2)}
          </p>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 px-4 transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg"
            onClick={handleAddToCart}
          >
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDetail;