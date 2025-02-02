import { useState, useEffect } from "react";

export function useProduct(prodID: string | undefined) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!prodID) return;

    fetch(`/api/products?prodID=${prodID}`) // ✅ API üzerinden çağırıyoruz
      .then((res) => {
        if (!res.ok) throw new Error("Ürün bulunamadı");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [prodID]);

  return { product, loading, error };
}
