'use client'

import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Github, Menu, X } from 'lucide-react'

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <html lang="en" className="dark:bg-gray-900">
      <body
        className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden"
      >
        {/* NAVBAR */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`fixed top-0 w-full z-50 h-16 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
              : 'bg-transparent'
          }`}
        >
          <div className="container mx-auto h-full">
            <div className="flex justify-between items-center h-full px-6">
              {/* Logo */}
              <Link href="/">
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                  <Rocket className="w-8 h-8 text-blue-600" />
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Next.js Hub
                  </span>
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-6">
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </motion.div>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                  >
                    Başla
                  </motion.button>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700"
              >
                <div className="container mx-auto px-6 py-4 space-y-4">
                  <Link href="https://github.com" className="block py-2">
                    Github
                  </Link>
                  <button className="w-full px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium">
                    Başla
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* MAIN CONTENT */}
        <main
          className="container mx-auto px-6 pt-16"
          style={{ height: 'calc(100vh - 8rem)' }} // 4rem header + 4rem footer = 8rem toplam
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full overflow-hidden"
          >
            {children}
          </motion.div>
        </main>

        {/* FOOTER */}
        <motion.footer className="fixed bottom-0 w-full h-16 border-t border-gray-200 dark:border-gray-800 flex items-center">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">Next.js Hub</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                Gizlilik
              </Link>
              <Link href="/terms" className="hover:text-blue-600 transition-colors">
                Kullanım Şartları
              </Link>
              <p>© {new Date().getFullYear()} Tüm hakları saklıdır.</p>
            </div>
          </div>
        </motion.footer>
      </body>
    </html>
  )
}
