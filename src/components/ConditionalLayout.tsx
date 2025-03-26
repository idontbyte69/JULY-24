'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-red-900/30 to-gray-900">
      {!isDashboard && <Navbar />}
      <main className={!isDashboard ? "pt-16" : ""}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  )
} 