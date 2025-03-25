'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyAccountPage() {
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      setUserData(JSON.parse(storedData))
    } else {
      router.push('/sign-up')
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Simulate verification code check
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would verify the code with your backend
      if (verificationCode === '123456') { // Demo verification code
        // Update user data with verification status
        const updatedUserData = {
          ...userData,
          isVerified: true,
          verifiedAt: new Date().toISOString(),
        }
        localStorage.setItem('userData', JSON.stringify(updatedUserData))
        
        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        setError('Invalid verification code')
      }
    } catch (err) {
      setError('Failed to verify account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendCode = async () => {
    setError('')
    setIsSubmitting(true)

    try {
      // Simulate resending verification code
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset timer
      setTimeLeft(300)
      
      // In a real app, you would trigger the verification code sending through your backend
      alert('Verification code has been resent!')
    } catch (err) {
      setError('Failed to resend verification code. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
            Verify your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            We've sent a verification code to your{' '}
            {userData.verificationType === 'email' ? 'email' : 'phone'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-300">
              Verification Code
            </label>
            <input
              id="verificationCode"
              name="verificationCode"
              type="text"
              required
              maxLength={6}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="text-center text-sm text-gray-400">
            {timeLeft > 0 ? (
              <p>
                Resend code in {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isSubmitting}
                className="font-medium text-red-500 hover:text-red-400"
              >
                Resend verification code
              </button>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Verifying...' : 'Verify Account'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-400">
          <p>Demo verification code: 123456</p>
        </div>
      </div>
    </div>
  )
} 