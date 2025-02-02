export default function ProductPage({ params }: { params: { prodID: string } }) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Ürün Sayfası - ID: {params.prodID}</h1>
        <p>Bu sayfa, ID’ye göre değişiyor.</p>
      </div>
    );
  }
  