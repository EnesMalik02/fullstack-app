'use client' 
// Bu ifade, Next.js 13’te client-side etkileşim (useState, onClick vb.) kullanabilmemiz için gerekir

import { useState } from 'react'
// data.json dosyasını direkt import edebiliriz
import data from '../../../data/data.json'

export default function HomePage() {
  // Başlangıçta ID=1 kullanıcısı görüntülenecek
  const [currentId, setCurrentId] = useState<number>(1)

  // state içindeki ID değerine uygun kaydı bul
  // JSON içinde o ID'ye sahip bir obje bulunamazsa 'undefined' dönebilir
  const currentUser = data.find((item) => item.id === currentId)

  // Butona tıklandığında ID değerini değiştir
  const handleChangeId = (id: number) => {
    setCurrentId(id)
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Kullanıcı Verisi</h1>
      
      {/* Eğer currentUser bulunursa bilgileri yazdır, bulunmazsa "Kayıt yok" mesajı ver */}
      {currentUser ? (
        <div className="mb-4">
          <p><strong>ID:</strong> {currentUser.id}</p>
          <p><strong>Name:</strong> {currentUser.name}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
        </div>
      ) : (
        <p>Kullanıcı bulunamadı.</p>
      )}

      <div className="space-x-2">
        <button
          onClick={() => handleChangeId(1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          1
        </button>
        <button
          onClick={() => handleChangeId(2)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          2
        </button>
        <button
          onClick={() => handleChangeId(3)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          3
        </button>
      </div>
    </div>
  )
}
