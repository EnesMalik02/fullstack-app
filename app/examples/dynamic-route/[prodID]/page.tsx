"use client";

import { useProduct } from "../useProduct";
import ProductCard from "@/app/examples/dynamic-route/ProductCard";

type Props = {
  params: {
    prodID: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ProductPage({ params, searchParams }: Props) {
  const prodID = params?.prodID || "";

  const { product, loading, error } = useProduct(prodID);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return <ProductCard product={product} />;
}
