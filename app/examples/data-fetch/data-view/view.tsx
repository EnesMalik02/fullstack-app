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

    if (loading) return <p>Yükleniyor...</p>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Ürün Listesi</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id} className="p-4 border-b border-gray-300">
                        <ul className="text-base">
                            <li className="text-lg font-semibold">{product.title}</li>
                            <li className="text-sm text-gray-600">{product.description}</li>
                            <li className="flex items-center justify-between">
                                <img src={product.image} alt={product.title} className="w-24 h-24 object-contain" />
                                <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                    Satın Al
                                </button>
                            </li>
                            <li className="text-lg font-bold text-green-600">{product.price} $</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
