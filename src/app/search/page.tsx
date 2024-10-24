// src/pages/search.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/firebaseConfig";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/types";

const SearchPage: React.FC = () => {
  const [results, setResults] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const products = await searchProducts(query);
        setResults(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        Resultados de búsqueda para: "{query}"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
