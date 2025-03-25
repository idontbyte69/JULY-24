'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className={`${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm border-b border-red-900/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-red-500">JULY 24</span>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`text-sm font-medium ${pathname === '/' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}>
                Home
              </Link>
              <Link href="/about" className={`text-sm font-medium ${pathname === '/about' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}>
                About
              </Link>
              <Link href="/victims" className={`text-sm font-medium ${pathname === '/victims' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}>
                Victims
              </Link>
              <Link href="/donate" className={`text-sm font-medium ${pathname === '/donate' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}>
                Donate
              </Link>
              <Link href="/contact" className={`text-sm font-medium ${pathname === '/contact' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}>
                Contact
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="block md:hidden p-2 text-gray-300 hover:text-red-500" 
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/about' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/victims" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/victims' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Victims
              </Link>
              <Link 
                href="/donate" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/donate' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Donate
              </Link>
              <Link 
                href="/contact" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/contact' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
} 