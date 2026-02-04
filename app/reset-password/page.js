'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const getPasswordStrength = () => {
    const password = formData.password
    if (password.length === 0) return { strength: 0, label: '', color: '' }
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' }
    if (password.length < 8) return { strength: 50, label: 'Fair', color: 'bg-orange-500' }
    if (password.length < 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 75, label: 'Good', color: 'bg-yellow-500' }
    }
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { strength: 100, label: 'Strong', color: 'bg-green-500' }
    }
    return { strength: 50, label: 'Fair', color: 'bg-orange-500' }
  }

  const passwordStrength = getPasswordStrength()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return
    }
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen flex flex-col bg-white">
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
          {/* Success Icon */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--success-container)' }}>
            <span className="material-symbols-outlined text-5xl" style={{ color: 'var(--success)', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>

          <h1 className="text-2xl font-medium mb-2 text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Password reset successful!
          </h1>
          <p className="text-sm text-center mb-8" style={{ color: 'var(--on-surface-variant)' }}>
            Your password has been changed. You can now sign in with your new password.
          </p>

          <Link
            href="/login"
            className="w-full m3-filled-button py-3.5 text-base font-medium text-center"
          >
            Back to sign in
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <Link href="/verify-otp" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-container)' }}>
            <span className="material-symbols-outlined text-4xl" style={{ color: 'var(--primary)' }}>password</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Create new password
          </h1>
          <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
            Your new password must be different from your previous password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
              New Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                style={{ borderColor: 'var(--outline)' }}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                    {passwordStrength.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
              Confirm Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                style={{ borderColor: 'var(--outline)' }}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <span className="material-symbols-outlined">
                  {showConfirmPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-xs mt-1" style={{ color: 'var(--error)' }}>Passwords do not match</p>
            )}
            {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password && (
              <p className="text-xs mt-1 flex items-center gap-1" style={{ color: 'var(--success)' }}>
                <span className="material-symbols-outlined text-sm">check</span>
                Passwords match
              </p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--surface-container)' }}>
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>Password must contain:</p>
            <ul className="space-y-1">
              {[
                { label: 'At least 8 characters', check: formData.password.length >= 8 },
                { label: 'One uppercase letter', check: /[A-Z]/.test(formData.password) },
                { label: 'One number', check: /[0-9]/.test(formData.password) },
                { label: 'One special character', check: /[^A-Za-z0-9]/.test(formData.password) },
              ].map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{
                      color: req.check ? 'var(--success)' : 'var(--on-surface-variant)',
                      fontVariationSettings: req.check ? "'FILL' 1" : "'FILL' 0"
                    }}
                  >
                    {req.check ? 'check_circle' : 'circle'}
                  </span>
                  <span style={{ color: req.check ? 'var(--success)' : 'var(--on-surface-variant)' }}>
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || formData.password !== formData.confirmPassword || !formData.password}
            className="w-full m3-filled-button py-3.5 text-base font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Resetting password...
              </>
            ) : (
              'Reset password'
            )}
          </button>
        </form>
      </div>
    </main>
  )
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-white">
        <span className="material-symbols-outlined animate-spin text-4xl" style={{ color: 'var(--primary)' }}>progress_activity</span>
      </main>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}
