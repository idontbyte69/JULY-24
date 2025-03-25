import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JULY-24',
  description: 'Supporting victims and their families',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-900 bg-gradient-radish`}>
        <div className="fixed inset-0 bg-gradient-radish-overlay noise-texture pointer-events-none" aria-hidden="true" />
        <Navbar />
        <main className="flex-grow pt-16 relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 