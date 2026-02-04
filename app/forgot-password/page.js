'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/verify-otp?type=reset&email=${encodeURIComponent(email)}`)
    }, 1500)
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <Link href="/login" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-container)' }}>
            <span className="material-symbols-outlined text-4xl" style={{ color: 'var(--primary)' }}>lock_reset</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Forgot password?
          </h1>
          <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
            No worries! Enter your email address and we'll send you a verification code to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                style={{ borderColor: 'var(--outline)' }}
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full m3-filled-button py-3.5 text-base font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Sending code...
              </>
            ) : (
              'Send verification code'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center mt-8 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
          Remember your password?{' '}
          <Link href="/login" className="font-medium" style={{ color: 'var(--primary)' }}>
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
