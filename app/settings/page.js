import Link from 'next/link'

export default function Settings() {
  const settingSections = [
    {
      title: 'Account',
      items: [
        { id: 'profile', label: 'Edit Profile', icon: 'person', link: '/profile/edit' },
        { id: 'privacy', label: 'Privacy Settings', icon: 'lock', link: '/settings/privacy' },
        { id: 'security', label: 'Security', icon: 'security', link: '/settings/security' },
        { id: 'verification', label: 'Get Verified', icon: 'verified', link: '/settings/verification', badge: 'New' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { id: 'notifications', label: 'Notifications', icon: 'notifications', link: '/settings/notifications' },
        { id: 'interests', label: 'Interests', icon: 'interests', link: '/settings/interests' },
        { id: 'language', label: 'Language', icon: 'language', value: 'English' },
        { id: 'theme', label: 'Theme', icon: 'dark_mode', value: 'System' },
      ]
    },
    {
      title: 'Subscription',
      items: [
        { id: 'premium', label: 'Premium Plan', icon: 'workspace_premium', link: '/settings/premium', badge: 'Upgrade' },
        { id: 'wallet', label: 'Wallet & Payments', icon: 'account_balance_wallet', link: '/wallet' },
        { id: 'subscriptions', label: 'My Subscriptions', icon: 'card_membership', link: '/settings/subscriptions' },
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'help', label: 'Help Center', icon: 'help', link: '/help' },
        { id: 'feedback', label: 'Send Feedback', icon: 'feedback', link: '/feedback' },
        { id: 'report', label: 'Report a Problem', icon: 'bug_report', link: '/report' },
        { id: 'about', label: 'About', icon: 'info', link: '/about' },
      ]
    },
  ]

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="p-4">
          <h1 className="text-2xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Settings</h1>
        </div>

        {/* Settings Sections */}
        <div className="px-4 space-y-6">
          {settingSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-medium mb-2 px-2" style={{ color: 'var(--on-surface-variant)' }}>
                {section.title}
              </h2>
              <div className="m3-card p-0 overflow-hidden">
                {section.items.map((item, index) => (
                  <Link key={item.id} href={item.link || '#'}>
                    <div className={`m3-list-item hover:bg-gray-50 ${index !== section.items.length - 1 ? 'border-b' : ''}`} style={{ borderColor: 'var(--outline)' }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--surface-container-high)' }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>{item.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>{item.label}</p>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.badge === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      {item.value && (
                        <span className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{item.value}</span>
                      )}
                      <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>chevron_right</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Danger Zone */}
          <div>
            <h2 className="text-sm font-medium mb-2 px-2" style={{ color: 'var(--error)' }}>
              Danger Zone
            </h2>
            <div className="m3-card p-0 overflow-hidden">
              <button className="m3-list-item hover:bg-red-50 w-full">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100">
                  <span className="material-symbols-outlined text-red-500">logout</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm text-red-600" style={{ fontFamily: 'Google Sans, sans-serif' }}>Log Out</p>
                </div>
              </button>
              <div className="border-t" style={{ borderColor: 'var(--outline)' }}></div>
              <button className="m3-list-item hover:bg-red-50 w-full">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100">
                  <span className="material-symbols-outlined text-red-500">delete_forever</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm text-red-600" style={{ fontFamily: 'Google Sans, sans-serif' }}>Delete Account</p>
                </div>
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="text-center py-6">
            <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>ConnectHub v1.0.0</p>
            <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>Made with love in Nigeria</p>
          </div>
        </div>
      </div>
    </main>
  )
}
