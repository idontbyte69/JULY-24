'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-gray-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-red-500 font-bold text-xl">
            JULY 24
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-red-500 transition">
              Home
            </Link>
            <Link href="/victims" className="text-gray-300 hover:text-red-500 transition">
              Victims
            </Link>
            <Link href="/articles" className="text-gray-300 hover:text-red-500 transition">
              Articles & Gallery
            </Link>
            <Link href="/support" className="text-gray-300 hover:text-red-500 transition">
              Support
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-red-500 transition">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/donate"
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
            >
              Donate Now
            </Link>
            <Link
              href="/sign-in"
              className="text-gray-300 hover:text-red-500 transition"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300 hover:text-red-500 transition">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 text-gray-300 hover:text-red-500 transition">
            Home
          </Link>
          <Link href="/victims" className="block px-3 py-2 text-gray-300 hover:text-red-500 transition">
            Victims
          </Link>
          <Link href="/articles" className="block px-3 py-2 text-gray-300 hover:text-red-500 transition">
            Articles & Gallery
          </Link>
          <Link href="/support" className="block px-3 py-2 text-gray-300 hover:text-red-500 transition">
            Support
          </Link>
          <Link href="/about" className="block px-3 py-2 text-gray-300 hover:text-red-500 transition">
            About
          </Link>
        </div>
      </div>
    </nav>
  )
} 