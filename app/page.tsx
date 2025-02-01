// app/page.tsx

import Link from 'next/link'

export default function HomePage() {
  const buttons = [
    { label: 'Json', href: '/pages/json' },
    { label: 'Page Process', href: '/pages/page-process' },
    { label: 'API', href: '/pages/api' },
    // İstediğiniz sayıda buton ekleyin
  ]

  return (
    <div>
      <section className="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Ana Sayfa
      </h1>
      <p className="text-gray-600 mb-10 text-center max-w-xl">
        Bu alanda eklediğiniz butonlar görünecek. 
        İsimlerini ve yönlendirme adreslerini kod içinde kolayca değiştirebilirsiniz.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl w-full">
        {buttons.map((btn, index) => (
          <Link
            href={btn.href}
            key={index}
            className="
              block
              bg-blue-600
              text-white
              font-medium
              py-3
              px-4
              rounded
              text-center
              hover:bg-blue-700
              transition-colors
              shadow
            "
          >
            {btn.label}
          </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
