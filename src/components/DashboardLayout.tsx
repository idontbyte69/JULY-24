'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()

  const navigation = [
    { name: 'Overview', href: '/dashboard' },
    { name: 'Victim Records', href: '/dashboard/victims' },
    { name: 'Nominee Records', href: '/dashboard/nominees' },
    { name: 'Content Approval', href: '/dashboard/content' },
    { name: 'Donor Management', href: '/dashboard/donors' },
    { name: 'UNO Accounts', href: '/dashboard/uno' },
    { name: 'Security & Audit', href: '/dashboard/security' },
    { name: 'Settings', href: '/dashboard/settings' },
  ]

  const handleSignOut = () => {
    // Add sign out logic here
    router.push('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800/30 min-h-screen p-4 fixed left-0 top-0 bottom-0 flex flex-col">
          <div className="mb-6">
            <Link href="/" className="text-2xl font-bold text-red-500">
              JULY 24
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-red-900/20 text-red-500'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Profile and Sign Out Section */}
          <div className="border-t border-gray-700 pt-4 mt-4 space-y-2">
            <Link
              href="/dashboard/profile"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                pathname === '/dashboard/profile'
                  ? 'bg-red-900/20 text-red-500'
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              Profile Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800/50 hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 