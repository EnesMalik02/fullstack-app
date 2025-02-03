'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Rocket, Layout, Database, Link as LinkIcon, Server, BarChart3 } from 'lucide-react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'examples' | 'applications' | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const examples = [
    { label: 'JSON Örnekleri', icon: <Database className="w-6 h-6" />, href: '/json', description: 'JSON veri yapısı ve işleme örnekleri' },
    { label: 'Sayfa İşlemleri', icon: <Layout className="w-6 h-6" />, href: '/page-process', description: 'Sayfa yönlendirme ve işlem örnekleri' },
    { label: 'API Entegrasyonu', icon: <Server className="w-6 h-6" />, href: '/api', description: 'REST API entegrasyon örnekleri' },
    { label: 'Dinamik Rotalar', icon: <LinkIcon className="w-6 h-6" />, href: '/dynamic-route', description: 'Dinamik sayfa rotaları ve parametreler' },
    { label: 'Veri Çekme', icon: <BarChart3 className="w-6 h-6" />, href: '/data-fetch', description: 'Asenkron veri çekme işlemleri' }
  ]

  const applications = [
    { label: 'Dashboard', icon: <BarChart3 className="w-6 h-6" />, href: '/projects', description: 'Proje analitikleri ve yönetim paneli' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-10"
        >
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4 flex items-center justify-center gap-4">
            <Rocket className="w-12 h-12 inline-block text-blue-600" />
            Next.js Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
            Modern web geliştirme için kapsamlı örnekler ve uygulamalar
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('examples')}
            className={`px-8 py-4 rounded-2xl font-medium text-lg flex items-center gap-2 transition-all ${
              activeTab === 'examples'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-lg hover:shadow-blue-500/20'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Örnekler
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('applications')}
            className={`px-8 py-4 rounded-2xl font-medium text-lg flex items-center gap-2 transition-all ${
              activeTab === 'applications'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-lg hover:shadow-purple-500/20'
            }`}
          >
            <Layout className="w-5 h-5" />
            Uygulamalar
          </motion.button>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl min-h-[24rem]"
          >
            {activeTab === 'examples' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                  Örnekler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {examples.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <motion.div
                        onHoverStart={() => setHoveredCard(index)}
                        onHoverEnd={() => setHoveredCard(null)}
                        whileHover={{ scale: 1.03 }}
                        className="relative group bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-600 rounded-xl text-white">{item.icon}</div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">{item.label}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                  <Layout className="w-8 h-8 text-purple-600" />
                  Uygulamalar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {applications.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="relative group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-purple-600 rounded-xl text-white">{item.icon}</div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">{item.label}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!activeTab && (
              <div className="h-96 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <Rocket className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Başlamak için yukarıdan bir kategori seçin
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}