"use client";

import { useParams } from "next/navigation";
import { useProduct } from "../useProduct";
import ProductCard from "@/app/examples/dynamic-route/ProductCard";

export default function ProductPage() {
  const params = useParams();
  const prodID = params?.prodID ? String(params.prodID) : "";

  const { product, loading, error } = useProduct(prodID);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return <ProductCard product={product} />;
}
