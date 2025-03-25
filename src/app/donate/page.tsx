'use client'

import { useState } from 'react'

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')

  const predefinedAmounts = [100, 500, 1000, 2000, 5000]

  const handleDonate = (amount: number) => {
    // Here you would integrate with your payment gateway
    console.log(`Processing donation of ${amount} BDT`)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full bg-gray-800">
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Support the Victims
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Your donation can help provide essential support to victims and their families
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Donation Options */}
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Make a Donation</h2>
              
              {/* Predefined Amounts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`p-4 rounded-lg border ${
                      selectedAmount === amount
                        ? 'border-red-500 bg-red-500/10 text-red-500'
                        : 'border-gray-700 text-gray-300 hover:border-red-500'
                    }`}
                  >
                    {amount} BDT
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label htmlFor="customAmount" className="block text-sm font-medium text-gray-300 mb-2">
                  Custom Amount
                </label>
                <input
                  type="number"
                  id="customAmount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount(null)
                  }}
                  placeholder="Enter amount in BDT"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Donate Button */}
              <button
                onClick={() => handleDonate(selectedAmount || Number(customAmount))}
                className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Donate Now
              </button>
            </div>

            {/* Payment Methods */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Payment Methods</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 p-3 border border-gray-700 rounded-lg">
                  <span className="text-gray-300">bKash</span>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-gray-700 rounded-lg">
                  <span className="text-gray-300">Nagad</span>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-gray-700 rounded-lg">
                  <span className="text-gray-300">Rocket</span>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-gray-700 rounded-lg">
                  <span className="text-gray-300">Card</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Impact & Information */}
          <div className="space-y-8">
            {/* Impact Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Your Impact</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Emergency Relief</h3>
                    <p className="text-gray-400">Provide immediate assistance to victims and their families</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Medical Support</h3>
                    <p className="text-gray-400">Help cover medical expenses for injured victims</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Legal Aid</h3>
                    <p className="text-gray-400">Support legal proceedings and justice for victims</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparency Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Transparency</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Donations</span>
                  <span className="text-white font-semibold">৳1,234,567</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Beneficiaries</span>
                  <span className="text-white font-semibold">150+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Success Rate</span>
                  <span className="text-white font-semibold">98%</span>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    We maintain complete transparency in our operations. All donations are tracked and reported regularly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 