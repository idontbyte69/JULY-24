'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      console.log('[Sign In Page] Sending login request:', formData)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('[Sign In Page] API Response:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Login failed. Please check your credentials.')
      }

      console.log('[Sign In Page] Login successful, redirecting...')
      if (data.token) {
        localStorage.setItem('authToken', data.token)
        console.log('[Sign In Page] Token stored in localStorage.')
      } else {
        console.warn('[Sign In Page] No token received from API on successful login.')
        setError('Login succeeded but no session token was received. Please try again.')
        setIsLoading(false)
        return
      }
      router.push('/dashboard')

    } catch (error) {
      console.error('[Sign In Page] Login error:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-topr justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-200">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <Link href="/sign-up" className="font-medium text-red-500 hover:text-red-400">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-700 rounded bg-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-red-500 hover:text-red-400">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition duration-150 ease-in-out"
            >
              {isLoading ? 'Signing In...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 