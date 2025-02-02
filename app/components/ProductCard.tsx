export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-3xl font-bold">{product?.name}</h1>
      <p className="text-gray-600">{product?.description}</p>
      <p className="text-lg font-semibold">Fiyat: ${product?.price}</p>
    </div>
  );
}
