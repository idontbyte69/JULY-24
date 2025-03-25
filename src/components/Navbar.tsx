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

  const toggleMenu = () => {
    console.log('Current menu state:', isOpen)
    setIsOpen(!isOpen)
    console.log('New menu state:', !isOpen)
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <nav className={`${
          isScrolled ? 'bg-gray-900/95 backdrop-blur-sm border-b border-red-900/20' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-10">
              <Link href="/" className="flex items-center">
                <span className="text-3xl font-bold text-red-500">JULY 24</span>
              </Link>

              {/* Desktop menu */}
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className={`text-base font-medium ${pathname === '/' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}>
                  Home
                </Link>
                <Link href="/about" className={`text-base font-medium ${pathname === '/about' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}>
                  About
                </Link>
                <Link href="/victims" className={`text-base font-medium ${pathname === '/victims' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}>
                  Victims
                </Link>
                <Link href="/articles" className={`text-base font-medium ${pathname === '/articles' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}>
                  Articles & Gallery
                </Link>
                <Link href="/support" className={`text-base font-medium ${pathname === '/support' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}>
                  Support
                </Link>
                <Link 
                  href="/donate" 
                  className={`px-3 py-1.5 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 transition-colors ${
                    pathname === '/donate' ? 'bg-red-700' : ''
                  }`}
                >
                  Donate
                </Link>
                <Link 
                  href="/sign-in" 
                  className={`text-base font-medium ${pathname === '/sign-in' ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
                >
                  Sign In
                </Link>
              </div>

              {/* Mobile menu button */}
              <button 
                className="block md:hidden p-1 text-gray-300 hover:text-red-500" 
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <svg 
                  className="h-5 w-5" 
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
        </nav>
      </div>

      {/* Spacer div to push content below navbar */}
      <div className="h-10"></div>

      {/* Mobile menu panel */}
      <div 
        className={`fixed top-10 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } md:hidden`}
      >
        <div className="px-2 pt-1 pb-2 space-y-0.5">
          <Link 
            href="/" 
            className={`block px-3 py-1.5 rounded-md text-sm font-medium ${
              pathname === '/' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`block px-3 py-1.5 rounded-md text-sm font-medium ${
              pathname === '/about' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/victims" 
            className={`block px-3 py-1.5 rounded-md text-sm font-medium ${
              pathname === '/victims' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Victims
          </Link>
          <Link 
            href="/articles" 
            className={`block px-3 py-1.5 rounded-md text-sm font-medium ${
              pathname === '/articles' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Articles & Gallery
          </Link>
          <Link 
            href="/support" 
            className={`block px-3 py-1.5 rounded-md text-sm font-medium ${
              pathname === '/support' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Support
          </Link>
          <Link 
            href="/donate" 
            className={`block px-3 py-1.5 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 ${
              pathname === '/donate' ? 'bg-red-700' : ''
            }`}
            onClick={() => setIsOpen(false)}
          >
            Donate
          </Link>
          <Link 
            href="/sign-in" 
            className={`block px-3 py-1.5 rounded-md text-sm font-medium ${
              pathname === '/sign-in' ? 'text-red-500 bg-red-900/20' : 'text-gray-300 hover:text-red-500 hover:bg-gray-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  )
} 