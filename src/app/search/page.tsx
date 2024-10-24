import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { searchProducts } from '@/lib/firebaseConfig';
import { Product } from '@/types/types';

export default function SearchResults() {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (q && typeof q === 'string') {
        try {
          const products = await searchProducts(q);
          setResults(products);
        } catch (error) {
          console.error("Error fetching search results: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [q]);

  if (loading) {
    return <div className="text-center">Cargando resultados...</div>;
  }

  if (results.length === 0) {
    return <div className="text-center">No se encontraron resultados para "{q}".</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Resultados de búsqueda para: "{q}"</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {results.map((product) => (
          <li key={product.id} className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-green-600 font-bold">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
