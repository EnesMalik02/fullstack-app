'use client'
import 'tailwindcss/tailwind.css'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { useState } from 'react'

// Diğer içerik bileşenlerini import ediyoruz
import PageTwo from './pagetwo'
import PageThree from './pagethree'


export default function RootLayout({ children }: { children: ReactNode }) {
  // currentPage: "home" | "pageTwo" | "pageThree"
  // Başlangıç olarak "home" seçili
  const [currentPage, setCurrentPage] = useState<'home' | 'pageTwo' | 'pageThree'>('home')

  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        {/* NAVBAR */}
        <header className="bg-white shadow p-4">
          <nav className="container mx-auto flex gap-4 items-center">
            <span className="text-xl font-bold text-blue-600">
              My Next.js App
            </span>
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-1 rounded ${
                currentPage === 'home' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('pageTwo')}
              className={`px-3 py-1 rounded ${
                currentPage === 'pageTwo' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Page Two
            </button>
            <button
              onClick={() => setCurrentPage('pageThree')}
              className={`px-3 py-1 rounded ${
                currentPage === 'pageThree' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Page Three
            </button>
          </nav>
        </header>

        {/* ANA İÇERİK */}
        <main className="container mx-auto p-4 flex-grow">
          {currentPage === 'home' && children /* page.tsx içeriği */}
          {currentPage === 'pageTwo' && <PageTwo />}
          {currentPage === 'pageThree' && <PageThree />}
        </main>

        {/* FOOTER */}
        <footer className="bg-white text-center p-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} My Next.js App
          </p>
        </footer>
      </body>
    </html>
  )
}
