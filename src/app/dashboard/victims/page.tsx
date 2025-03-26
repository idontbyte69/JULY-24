'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function VictimsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const victims = [
    {
      id: 1,
      name: 'John Doe',
      location: 'Dhaka, Savar',
      age: 35,
      status: 'Deceased',
      submittedDate: '2023-08-15',
      verificationStatus: 'pending'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      location: 'Chittagong, Anwara',
      age: 28,
      status: 'Injured',
      submittedDate: '2023-08-16',
      verificationStatus: 'pending'
    },
    // Add more sample data as needed
  ]

  const filteredVictims = victims.filter(victim => {
    const matchesSearch = victim.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         victim.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || victim.verificationStatus === filter
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-200">Victim Records</h1>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Add New Record
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, location..."
              className="w-full px-4 py-2 bg-gray-800/50 border border-red-900/20 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 bg-gray-800/50 border border-red-900/20 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Records</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="declined">Declined</option>
            </select>
            <button className="px-4 py-2 bg-gray-800/50 border border-red-900/20 rounded-md text-gray-200 hover:bg-gray-800/70">
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Victims Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-red-900/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Verification</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredVictims.map((victim) => (
                <tr key={victim.id} className="hover:bg-gray-800/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{victim.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{victim.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{victim.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      victim.status === 'Deceased' ? 'bg-red-900/20 text-red-500' :
                      victim.status === 'Injured' ? 'bg-yellow-900/20 text-yellow-500' :
                      'bg-green-900/20 text-green-500'
                    }`}>
                      {victim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{victim.submittedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      victim.verificationStatus === 'pending' ? 'bg-yellow-900/20 text-yellow-500' :
                      victim.verificationStatus === 'verified' ? 'bg-green-900/20 text-green-500' :
                      'bg-red-900/20 text-red-500'
                    }`}>
                      {victim.verificationStatus.charAt(0).toUpperCase() + victim.verificationStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-red-500 hover:text-red-400 mr-3">View</button>
                    <button className="text-gray-400 hover:text-gray-300">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing 1 to {filteredVictims.length} of {filteredVictims.length} results
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-800/50 border border-red-900/20 rounded-md text-gray-200 hover:bg-gray-800/70">
              Previous
            </button>
            <button className="px-4 py-2 bg-gray-800/50 border border-red-900/20 rounded-md text-gray-200 hover:bg-gray-800/70">
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 