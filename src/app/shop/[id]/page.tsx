// src/app/shop/[id]/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  ImageUrl: string;
}

interface ProductDetailPageProps {
  params: { id: string }; // Aseguramos que los parámetros incluyen el 'id'
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = params; // Obtenemos el ID desde los parámetros
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const productRef = doc(db, 'products', id);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          setProduct({
            id: productSnapshot.id,
            ...productSnapshot.data(),
          } as Product);
        } else {
          console.error('El producto no existe');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={product.ImageUrl}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded mb-4 md:mb-0"
        />
        <div className="md:ml-6 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>
          <Button
            className="bg-blue-400 hover:bg-blue-600 rounded-xl"
            onClick={() => addToCart({ id: product.id, name: product.name, ImageUrl: product.ImageUrl, price: product.price, quantity: 1 })}
          >
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
