'use client'

import DashboardLayout from '@/components/DashboardLayout'

export default function DashboardPage() {
  const stats = [
    { name: 'Total Victims', value: '156' },
    { name: 'Pending Verifications', value: '23' },
    { name: 'Active Nominees', value: '89' },
    { name: 'Total Donations', value: '৳ 1.2M' },
  ]

  const cards = [
    {
      title: 'User Management',
      description: 'Manage and verify user accounts across all roles.',
      href: '/dashboard/users'
    },
    {
      title: 'Content Approval',
      description: 'Review and approve articles and gallery submissions.',
      href: '/dashboard/content'
    },
    {
      title: 'Victim Verification',
      description: 'Verify and manage victim profiles and reports.',
      href: '/dashboard/victims'
    },
    {
      title: 'Fund Management',
      description: 'Oversee and manage donation funds and disbursements.',
      href: '/dashboard/funds'
    },
    {
      title: 'UNO Management',
      description: 'Manage and assign UNO profiles for sub-districts.',
      href: '/dashboard/uno'
    },
    {
      title: 'NGO Verification',
      description: 'Verify and manage NGO profiles and activities.',
      href: '/dashboard/ngo'
    },
    {
      title: 'Reporting and Analytics',
      description: 'Generate reports and analyze data across the platform.',
      href: '/dashboard/reports'
    },
    {
      title: 'System Configuration',
      description: 'Manage system settings and configurations.',
      href: '/dashboard/settings'
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-200">Dashboard Overview</h1>
          <p className="mt-2 text-gray-400">Welcome back, Admin</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-gray-800/50 backdrop-blur-sm border border-red-900/20 rounded-lg p-6"
            >
              <dt className="text-sm font-medium text-gray-400">{stat.name}</dt>
              <dd className="mt-2 text-3xl font-semibold text-gray-200">{stat.value}</dd>
            </div>
          ))}
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="block bg-gray-800/30 border border-red-900/10 rounded-lg p-6 hover:bg-gray-800/50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-200">{card.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{card.description}</p>
            </a>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/30 border border-red-900/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-200">New victim profile submitted</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-900/20 text-red-500">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 