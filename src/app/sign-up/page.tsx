'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    organizationName: '',
    address: '',
    emergencyContact: '',
    verificationMethod: 'email'
  })
  const [error, setError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    
    console.log('Form submitted with data:', formData)
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsSubmitting(false)
      return
    }
    
    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsSubmitting(false)
      return
    }
    
    try {
      console.log('Sending registration request to API...')
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      console.log('Registration response status:', response.status)
      const data = await response.json()
      console.log('Registration response data:', data)
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }
      
      // Store user data in localStorage for verification
      localStorage.setItem('pendingVerification', JSON.stringify({
        email: formData.email,
        verificationMethod: formData.verificationMethod
      }))
      
      // Redirect to verification page
      router.push('/verify-account')
    } catch (error) {
      console.error('Registration error:', error)
      setError(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-200">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <Link href="/sign-in" className="font-medium text-red-500 hover:text-red-400">
              sign in to your account
            </Link>
          </p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="">Select your role</option>
                <option value="victim">Victim</option>
                <option value="family">Family Member</option>
                <option value="volunteer">Volunteer</option>
                <option value="organization">Organization</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Organization Name (if role is organization) */}
            {formData.role === 'organization' && (
              <div>
                <label htmlFor="organizationName" className="block text-sm font-medium text-gray-300">
                  Organization Name
                </label>
                <input
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                  placeholder="Enter organization name"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                />
              </div>
            )}

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Enter your address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {/* Emergency Contact */}
            <div>
              <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-300">
                Emergency Contact
              </label>
              <input
                id="emergencyContact"
                name="emergencyContact"
                type="tel"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Enter emergency contact number"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            {/* Verification Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Verification Method
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="verificationType"
                    value="email"
                    checked={formData.verificationMethod === 'email'}
                    onChange={(e) => setFormData({ ...formData, verificationMethod: e.target.value })}
                    className="form-radio h-4 w-4 text-red-500 border-gray-700 bg-gray-800"
                  />
                  <span className="ml-2 text-sm text-gray-300">Email</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="verificationType"
                    value="phone"
                    checked={formData.verificationMethod === 'phone'}
                    onChange={(e) => setFormData({ ...formData, verificationMethod: e.target.value })}
                    className="form-radio h-4 w-4 text-red-500 border-gray-700 bg-gray-800"
                  />
                  <span className="ml-2 text-sm text-gray-300">Phone</span>
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 