'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function VerifyOTPContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'register'
  const email = searchParams.get('email') || ''

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    // Countdown timer for resend
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [resendTimer])

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only take last character

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex(digit => !digit)
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const handleResend = () => {
    if (!canResend) return
    setResendTimer(60)
    setCanResend(false)
    // Simulate resend API call
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join('')
    if (otpValue.length !== 6) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (type === 'reset') {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`)
      } else {
        router.push('/onboarding')
      }
    }, 1500)
  }

  const isComplete = otp.every(digit => digit !== '')

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <Link
          href={type === 'reset' ? '/forgot-password' : '/register'}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-container)' }}>
            <span className="material-symbols-outlined text-4xl" style={{ color: 'var(--primary)' }}>verified_user</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Verify your email
          </h1>
          <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
            We've sent a 6-digit verification code to
          </p>
          <p className="text-sm font-medium mt-1" style={{ color: 'var(--on-surface)' }}>
            {email || 'your email'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-xl font-medium rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                style={{
                  borderColor: digit ? 'var(--primary)' : 'var(--outline)',
                  fontFamily: 'Google Sans, sans-serif'
                }}
              />
            ))}
          </div>

          {/* Resend Code */}
          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm font-medium"
                style={{ color: 'var(--primary)' }}
              >
                Resend code
              </button>
            ) : (
              <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                Resend code in <span className="font-medium">{resendTimer}s</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !isComplete}
            className="w-full m3-filled-button py-3.5 text-base font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Verifying...
              </>
            ) : (
              'Verify'
            )}
          </button>
        </form>

        {/* Help Text */}
        <p className="text-center mt-8 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
          Didn't receive the code?{' '}
          <Link href="#" className="font-medium" style={{ color: 'var(--primary)' }}>
            Check spam folder
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function VerifyOTP() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-white">
        <span className="material-symbols-outlined animate-spin text-4xl" style={{ color: 'var(--primary)' }}>progress_activity</span>
      </main>
    }>
      <VerifyOTPContent />
    </Suspense>
  )
}
