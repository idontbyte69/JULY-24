'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyAccountPage() {
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [email, setEmail] = useState<string | null>(null)

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed')
      }

      setIsVerified(true)
      setEmail(data.user.email)
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/sign-in')
      }, 3000)
    } catch (error) {
      console.error('Verification error:', error)
      setError(error instanceof Error ? error.message : 'Verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-200">
            {isVerified ? 'Email Verified!' : 'Verify Your Account'}
          </h2>
          {isVerified && email && (
            <p className="mt-2 text-center text-sm text-gray-400">
              Your email {email} has been verified successfully. Redirecting to login...
            </p>
          )}
        </div>

        {!isVerified && (
          <form onSubmit={handleVerification} className="mt-8 space-y-6">
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-300">
                Verification Code
              </label>
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Enter the 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Verify Account'
                )}
              </button>
            </div>
          </form>
        )}

        {!isLoading && !isVerified && !error && (
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Didn't receive a code?{' '}
              <button
                onClick={() => router.push('/resend-verification')}
                className="text-red-500 hover:text-red-400"
              >
                Resend Code
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 