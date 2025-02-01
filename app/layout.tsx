'use client'

import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'


export default function RootLayout({ children }: { children: ReactNode }) {
  // Sayfa yüklendiğinde butonları animasyonla göstermek için state
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true) // Sayfa yüklendiğinde animasyonu tetikle
  }, [])

  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900">
        {/* NAVBAR */}
        <nav className="bg-gray-900 text-white p-4 fixed top-0 w-full shadow-lg z-50">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-wider">
              🌐 MyBrand
            </Link>
            
            {/* Navbar Linkleri */}
            <div className={`flex space-x-6 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <Link href="/" className="nav-link">🏠 Ana Sayfa</Link>
            </div>
          </div>
        </nav>

        {/* ANA İÇERİK */}
        <main className="container mx-auto p-6 pt-24 min-h-screen">
          <div className={`transition-all transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} duration-700`}>
            {children}
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-gray-300 text-center py-4 text-sm">
          <p className="opacity-80">© {new Date().getFullYear()} My Next.js App</p>
        </footer>
      </body>
    </html>
  )
}
