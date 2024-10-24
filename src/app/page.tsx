// index.tsx
import ProductList from '@/components/ProductList';
import "../../styles/globals.css";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="p-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Productos Destacados</h2>
          {/* Carga del componente de la lista de productos */}
          <ProductList searchQuery={''} />
        </div>
        <div className="container mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4">SALE SALE SALE</h2>
          <ProductList searchQuery={''} />
        </div>
        <div className="container mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4">Todos los productos</h2>
          <ProductList searchQuery={''} />
        </div>
        
      </main>
    </div>
  );
}
