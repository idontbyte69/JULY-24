'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm border-b border-red-900/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-red-500">JULY 24</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/about' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              }`}
            >
              About
            </Link>
            <Link 
              href="/victims" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/victims' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              }`}
            >
              Victims
            </Link>
            <Link 
              href="/donate" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/donate' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              }`}
            >
              Donate
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/contact' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-sm border-b border-red-900/20">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/about' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
            }`}
          >
            About
          </Link>
          <Link
            href="/victims"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/victims' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
            }`}
          >
            Victims
          </Link>
          <Link
            href="/donate"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/donate' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
            }`}
          >
            Donate
          </Link>
          <Link
            href="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/contact' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
} 