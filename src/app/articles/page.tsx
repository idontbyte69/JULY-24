'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState('articles')

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Articles & Gallery</h1>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-lg">
            Write New Article
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          <button
            className={`px-4 py-2 rounded-lg transition shadow-lg ${
              activeTab === 'articles'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-red-500'
            }`}
            onClick={() => setActiveTab('articles')}
          >
            Articles
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition shadow-lg ${
              activeTab === 'gallery'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-red-500'
            }`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery
          </button>
        </div>

        {/* Articles Content */}
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-red-900/20 shadow-lg">
              <div className="h-48 bg-gray-700/50 relative">
                {/* Placeholder for article image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-100 mb-2">
                  The Heroes of July 24: Remembering the Victims
                </h2>
                <p className="text-gray-400 mb-4">
                  A tribute to those who lost their lives and the brave individuals who stepped up during the tragedy.
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>By Jane Smith</span>
                  <span>2023-08-01</span>
                </div>
                <Link href="/articles/heroes-of-july-24" className="mt-4 inline-block text-red-500 hover:text-red-400">
                  Read More →
                </Link>
              </div>
            </article>

            <article className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-red-900/20 shadow-lg">
              <div className="h-48 bg-gray-700/50 relative">
                {/* Placeholder for article image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-100 mb-2">
                  Community Resilience in the Face of Adversity
                </h2>
                <p className="text-gray-400 mb-4">
                  How local communities have come together to support one another in the aftermath of July 24.
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>By John Doe</span>
                  <span>2023-08-15</span>
                </div>
                <Link href="/articles/community-resilience" className="mt-4 inline-block text-red-500 hover:text-red-400">
                  Read More →
                </Link>
              </div>
            </article>
          </div>
        )}

        {/* Gallery Content */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Gallery items would go here */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-red-900/20 shadow-lg relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 