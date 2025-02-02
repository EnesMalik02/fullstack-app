export default function NotFoundPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-500">404 - Sayfa Bulunamadı</h1>
        <p className="text-lg text-gray-600">Üzgünüz, aradığınız sayfa mevcut değil.</p>
        <a href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Anasayfaya Dön</a>
      </div>
    );
  }
  