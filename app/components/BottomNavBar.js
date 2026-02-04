'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home', icon: 'home', iconFilled: 'home' },
  { href: '/communities', label: 'Communities', icon: 'groups', iconFilled: 'groups' },
  { href: '/live', label: 'Live', icon: 'video_call', iconFilled: 'video_call' },
  { href: '/messages', label: 'Messages', icon: 'chat_bubble_outline', iconFilled: 'chat_bubble' },
  { href: '/profile', label: 'Profile', icon: 'person_outline', iconFilled: 'person' },
]

export default function BottomNavBar() {
  const pathname = usePathname()

  // Hide on auth and special pages
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

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t z-50 device-nav" style={{ borderColor: 'var(--outline)' }}>
      <div className="flex justify-around">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center py-2 px-3 min-w-[64px] transition-colors"
            >
              <div
                className={`flex items-center justify-center w-16 h-8 rounded-full transition-colors ${
                  active ? 'bg-blue-100' : ''
                }`}
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{
                    color: active ? 'var(--primary)' : 'var(--on-surface-variant)',
                    fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0"
                  }}
                >
                  {active ? item.iconFilled : item.icon}
                </span>
              </div>
              <span
                className="text-xs mt-0.5 font-medium"
                style={{
                  color: active ? 'var(--primary)' : 'var(--on-surface-variant)',
                  fontFamily: 'Google Sans, sans-serif'
                }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
