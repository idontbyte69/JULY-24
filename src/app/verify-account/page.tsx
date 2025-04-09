'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyAccountPage() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [timer, setTimer] = useState(300) // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    // Retrieve email from localStorage
    const pendingData = localStorage.getItem('pendingVerification')
    if (pendingData) {
      try {
        const data = JSON.parse(pendingData)
        setEmail(data.email)
        console.log('Verification page loaded for email:', data.email)
      } catch (e) {
        console.error('Error parsing pending verification data:', e)
        setError('Could not retrieve user information. Please sign up again.')
        router.push('/sign-up')
      }
    } else {
      console.log('No pending verification data found, redirecting to sign-up.')
      setError('No verification pending. Please sign up first.')
      // Optional: Redirect if no pending data
      // router.push('/sign-up')
    }
  }, [router])

  useEffect(() => {
    // Countdown timer
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setCanResend(true)
    }
  }, [timer])

  const handleResendCode = async () => {
    if (!email || !canResend) return
    console.log('Resending code for:', email)
    setIsLoading(true)
    setError('')
    try {
      // --- Resend Logic (Optional - Placeholder) ---
      // In a real app, call an API endpoint to resend the code
      // await fetch('/api/auth/resend-verification', { method: 'POST', body: JSON.stringify({ email }) })
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      console.log('Code resent successfully (simulated)')
      setTimer(300) // Reset timer
      setCanResend(false)
    } catch (err) {
      console.error('Error resending code:', err)
      setError('Failed to resend code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('User email not found. Cannot verify.')
      console.error('Verification handleSubmit: Email is missing from state.')
      return
    }
    setError('')
    setIsLoading(true)
    console.log(`[Verification Page] Submitting verification code: ${code} for email: ${email}`)

    // Ensure code is exactly 6 digits (redundant check, but safe)
    if (code.length !== 6 || !/^[0-9]{6}$/.test(code)) {
      setError('Verification code must be 6 digits.')
      console.error('[Verification Page] Invalid code format before sending:', code)
      setIsLoading(false)
      return
    }

    const payload = { email, code }
    console.log('[Verification Page] Sending payload to /api/auth/verify:', payload)

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      console.log('[Verification Page] Raw API response status:', response.status)
      const data = await response.json()
      console.log('[Verification Page] Parsed API response data:', data)

      if (!response.ok) {
        console.error('[Verification Page] API response not OK:', data)
        throw new Error(data.error || 'Verification failed')
      }

      console.log('[Verification Page] Verification successful via API, redirecting...')
      localStorage.removeItem('pendingVerification')
      router.push('/sign-in')
    } catch (error) {
      console.error('[Verification Page] Error during verification fetch:', error)
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-red-900/20">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-red-500">
            Verify Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter the 6-digit code sent to your {email ? `(${email})` : 'email/phone'}.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="code" className="sr-only">Verification Code</label>
              <input
                id="code"
                name="code"
                type="text" // Use text to allow easier input, validation can check length/digits
                maxLength={6}
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-lg bg-gray-900 text-center tracking-[0.5em] font-mono"
                placeholder="_ _ _ _ _ _"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))} // Allow only digits
              />
            </div>
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
          )}

          <div className="text-center text-gray-400">
            {timer > 0 ? (
              <p>Time remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
            ) : (
              <p>Didn't receive the code?</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || code.length !== 6}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition duration-150 ease-in-out"
            >
              {isLoading ? 'Verifying...' : 'Verify Account'}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleResendCode}
            disabled={!canResend || isLoading}
            className="text-sm text-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  )
} 