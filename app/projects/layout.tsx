'use client'

import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100">
        {/* Projects Özel Navbar */}
        <nav className="bg-gray-800 shadow-lg fixed top-0 w-full z-50 transition-all duration-500">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            {/* Projects için özel logo */}
            <Link href="/projects" className="text-3xl font-extrabold tracking-wider text-white hover:text-green-400 transition-colors">
              🚀 ProjectsHub
            </Link>
            
            {/* Navbar Linkleri */}
            <div className={`flex space-x-6 text-lg transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {/* <Link href="/projects" className="text-gray-300 hover:text-green-400 transition-colors font-medium">
                🛠️ Tüm Projeler
              </Link>
              <Link href="/projects/new" className="text-gray-300 hover:text-green-400 transition-colors font-medium">
                ➕ Yeni Proje
              </Link> */}
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
        <footer className="bg-gray-800 shadow-inner mt-8 text-gray-300 py-6">
          <div className="container mx-auto text-center">
            <p className="opacity-80 text-sm">
              © {new Date().getFullYear()} ProjectsHub |  
              <Link href="/projects/about" className="text-green-400 hover:underline ml-1">
                Hakkımızda
              </Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
