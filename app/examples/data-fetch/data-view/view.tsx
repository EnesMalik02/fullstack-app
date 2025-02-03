'use client'

import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export function useProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return { products, loading };
}

export default function ProductListView() {
  const { products, loading } = useProductList();

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl font-medium">Yükleniyor...</p>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
        Ürün Listesi
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col"
          >
            <div className="flex justify-center mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex-1">
              {product.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {product.price} $
              </span>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
                Satın Al
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
