'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function DonatePage() {
  const [selectedCause, setSelectedCause] = useState('general')
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [showMobileBanking, setShowMobileBanking] = useState(false)

  const mobileBankingOptions = [
    {
      id: 'bKash',
      name: 'bKash',
      icon: '📱',
      number: '01XXXXXXXXX',
    },
    {
      id: 'nagad',
      name: 'Nagad',
      icon: '📱',
      number: '01XXXXXXXXX',
    },
    {
      id: 'rocket',
      name: 'Rocket',
      icon: '📱',
      number: '01XXXXXXXXX',
    },
    {
      id: 'upay',
      name: 'Upay',
      icon: '📱',
      number: '01XXXXXXXXX',
    },
  ]

  const causes = [
    {
      id: 'general',
      title: 'General Fund',
      description: 'Support our overall mission and operational costs',
      icon: '🎯',
    },
    {
      id: 'victims',
      title: 'Victim Support',
      description: 'Help provide immediate assistance to victims and their families',
      icon: '🤝',
    },
    {
      id: 'medical',
      title: 'Medical Aid',
      description: 'Support medical expenses and rehabilitation for victims',
      icon: '🏥',
    },
    {
      id: 'legal',
      title: 'Legal Support',
      description: 'Help with legal fees and justice proceedings',
      icon: '⚖️',
    },
    {
      id: 'education',
      title: 'Education Fund',
      description: 'Support education for victims and their children',
      icon: '📚',
    },
    {
      id: 'counseling',
      title: 'Counseling Services',
      description: 'Help provide mental health support and counseling',
      icon: '💭',
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would integrate with a payment gateway
      // For demo purposes, we'll simulate a successful donation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      alert('Thank you for your donation! We will send you a confirmation email shortly.')
      setAmount('')
    } catch (err) {
      alert('There was an error processing your donation. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">
            Support Our Cause
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your donation helps us provide support, resources, and assistance to those affected by the events of July 24.
          </p>
        </div>

        {/* Donation Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Cause Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              Select a Cause
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {causes.map((cause) => (
                <button
                  key={cause.id}
                  onClick={() => setSelectedCause(cause.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedCause === cause.id
                      ? 'border-red-500 bg-red-900/20'
                      : 'border-gray-700 hover:border-red-500/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{cause.icon}</div>
                  <h3 className="text-lg font-medium text-gray-200">{cause.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{cause.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Donation Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-red-900/20">
            <h2 className="text-2xl font-semibold text-gray-200 mb-6">
              Make a Donation
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
                  Amount (BDT)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">৳</span>
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    required
                    min="1"
                    className="appearance-none block w-full pl-7 pr-12 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-gray-800 text-gray-200"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPaymentMethod('card')
                      setShowMobileBanking(false)
                    }}
                    className={`flex items-center justify-center p-3 border rounded-md transition-colors ${
                      selectedPaymentMethod === 'card'
                        ? 'border-red-500 bg-red-900/20'
                        : 'border-gray-700 hover:border-red-500/50'
                    }`}
                  >
                    <span className="text-2xl">💳</span>
                    <span className="ml-2 text-gray-300">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPaymentMethod('bank')
                      setShowMobileBanking(false)
                    }}
                    className={`flex items-center justify-center p-3 border rounded-md transition-colors ${
                      selectedPaymentMethod === 'bank'
                        ? 'border-red-500 bg-red-900/20'
                        : 'border-gray-700 hover:border-red-500/50'
                    }`}
                  >
                    <span className="text-2xl">🏦</span>
                    <span className="ml-2 text-gray-300">Bank</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPaymentMethod('mobile')
                      setShowMobileBanking(true)
                    }}
                    className={`flex items-center justify-center p-3 border rounded-md transition-colors ${
                      selectedPaymentMethod === 'mobile'
                        ? 'border-red-500 bg-red-900/20'
                        : 'border-gray-700 hover:border-red-500/50'
                    }`}
                  >
                    <span className="text-2xl">📱</span>
                    <span className="ml-2 text-gray-300">Mobile</span>
                  </button>
                </div>
              </div>

              {/* Mobile Banking Options */}
              {showMobileBanking && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-200">Select Mobile Banking Service</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {mobileBankingOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className="flex items-center justify-center p-3 border border-gray-700 rounded-md hover:border-red-500 transition-colors"
                      >
                        <span className="text-2xl mr-2">{option.icon}</span>
                        <div className="text-left">
                          <div className="text-gray-200 font-medium">{option.name}</div>
                          <div className="text-sm text-gray-400">{option.number}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Donate Now'}
                </button>
              </div>
            </form>

            {/* Additional Information */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h3 className="text-lg font-medium text-gray-200 mb-4">
                Other Ways to Support
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🏥</span>
                  <div>
                    <h4 className="text-gray-200 font-medium">Medical Supplies</h4>
                    <p className="text-sm text-gray-400">Donate medical supplies and equipment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">👕</span>
                  <div>
                    <h4 className="text-gray-200 font-medium">Clothing & Essentials</h4>
                    <p className="text-sm text-gray-400">Donate clothes, food, and other essential items</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🤝</span>
                  <div>
                    <h4 className="text-gray-200 font-medium">Volunteer</h4>
                    <p className="text-sm text-gray-400">Join our volunteer program to help directly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">
            Our Commitment to Transparency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-red-900/20">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-200 mb-2">Regular Reports</h3>
              <p className="text-gray-400">Monthly updates on fund allocation and impact</p>
            </div>
            <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-red-900/20">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-200 mb-2">Accountability</h3>
              <p className="text-gray-400">Independent audits and transparent financial records</p>
            </div>
            <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-red-900/20">
              <div className="text-3xl mb-4">💫</div>
              <h3 className="text-lg font-medium text-gray-200 mb-2">Impact Tracking</h3>
              <p className="text-gray-400">Real-time updates on how your donation helps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 