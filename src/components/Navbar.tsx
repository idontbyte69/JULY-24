'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-red-900/20 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-red-500">JULY-24</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              }`}
            >
              About
            </Link>
            <Link
              href="/victims"
              className={`text-sm font-medium transition-colors ${
                isActive('/victims') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              }`}
            >
              Victims
            </Link>
            <Link
              href="/support"
              className={`text-sm font-medium transition-colors ${
                isActive('/support') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              }`}
            >
              Support
            </Link>
            <Link
              href="/articles"
              className={`text-sm font-medium transition-colors ${
                isActive('/articles') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              }`}
            >
              Articles
            </Link>
            <Link
              href="/donate"
              className={`text-sm font-medium transition-colors ${
                isActive('/donate') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
              }`}
            >
              Donate
            </Link>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
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
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-sm border-b border-red-900/20">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
            }`}
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="/victims"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/victims') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
            }`}
            onClick={closeMenu}
          >
            Victims
          </Link>
          <Link
            href="/support"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/support') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
            }`}
            onClick={closeMenu}
          >
            Support
          </Link>
          <Link
            href="/articles"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/articles') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
            }`}
            onClick={closeMenu}
          >
            Articles
          </Link>
          <Link
            href="/donate"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/donate') ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
            }`}
            onClick={closeMenu}
          >
            Donate
          </Link>
          <Link
            href="/sign-in"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700"
            onClick={closeMenu}
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  )
} 