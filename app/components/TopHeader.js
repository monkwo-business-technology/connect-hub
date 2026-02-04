'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function TopHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Simulated auth state
  const menuRef = useRef(null)

  // Close menu when clicking outside - must be before any early returns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Hide header on auth and special pages
  const hideOnPaths = [
    '/onboarding',
    '/login',
    '/register',
    '/forgot-password',
    '/verify-otp',
    '/reset-password',
  ]

  if (hideOnPaths.includes(pathname) || pathname.startsWith('/live/room') || pathname.startsWith('/messages/room') || pathname.startsWith('/messages/chat')) {
    return null
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowMenu(false)
    router.push('/login')
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <header className="absolute top-0 left-0 right-0 bg-white border-b z-50 device-header" style={{ borderColor: 'var(--outline)' }}>
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
            <span className="material-symbols-outlined text-white text-lg">hub</span>
          </div>
          <span className="font-medium text-lg hidden sm:inline" style={{ fontFamily: 'Google Sans, sans-serif', color: 'var(--on-surface)' }}>
            ConnectHub
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Search icon */}
          <Link href="/search" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>search</span>
          </Link>

          {isLoggedIn ? (
            <>
              {/* Activity Dashboard */}
              <Link href="/activity" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>insights</span>
              </Link>

              {/* Notifications */}
              <Link href="/notifications" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--error)' }}></span>
              </Link>

              {/* Wallet/Coins */}
              <Link href="/wallet" className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ color: 'var(--warning)' }}>toll</span>
              </Link>

              {/* Menu Button */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>apps</span>
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-lg border overflow-hidden z-50" style={{ borderColor: 'var(--outline)' }}>
                    <div className="p-2">
                      <Link
                        href="/activity"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>insights</span>
                        <span className="text-sm font-medium">Activity Dashboard</span>
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>person</span>
                        <span className="text-sm font-medium">My Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>settings</span>
                        <span className="text-sm font-medium">Settings</span>
                      </Link>
                      <Link
                        href="/wallet"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="material-symbols-outlined" style={{ color: 'var(--warning)' }}>account_balance_wallet</span>
                        <span className="text-sm font-medium">Wallet</span>
                      </Link>
                    </div>
                    <div className="border-t" style={{ borderColor: 'var(--outline)' }}>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-50 transition-colors text-left"
                      >
                        <span className="material-symbols-outlined" style={{ color: 'var(--error)' }}>logout</span>
                        <span className="text-sm font-medium" style={{ color: 'var(--error)' }}>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>login</span>
                <span className="text-sm font-medium" style={{ color: 'var(--primary)', fontFamily: 'Google Sans, sans-serif' }}>Sign In</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
