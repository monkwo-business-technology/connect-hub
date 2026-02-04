import Link from 'next/link'

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'live',
      title: 'Chioma Eze went live',
      message: 'Business Pitch Hour just started',
      time: '2m ago',
      avatar: 'CE',
      isRead: false,
      link: '/live/room/1',
    },
    {
      id: 2,
      type: 'follow',
      title: 'Michael Chen started following you',
      message: 'Follow back to connect',
      time: '15m ago',
      avatar: 'MC',
      isRead: false,
      link: '/user/2',
    },
    {
      id: 3,
      type: 'connection',
      title: 'Fatima Hassan accepted your connection request',
      message: 'You can now message each other',
      time: '1h ago',
      avatar: 'FH',
      isRead: false,
      link: '/user/3',
    },
    {
      id: 4,
      type: 'event',
      title: 'Reminder: Speed Networking Session',
      message: 'Starts in 2 hours at Business Hub',
      time: '2h ago',
      avatar: null,
      icon: 'event',
      isRead: true,
      link: '/events/1',
    },
    {
      id: 5,
      type: 'gift',
      title: 'You received a gift!',
      message: 'James Okoro sent you a Star (50 coins)',
      time: '3h ago',
      avatar: 'JO',
      isRead: true,
      link: '/wallet',
    },
    {
      id: 6,
      type: 'community',
      title: 'New activity in Business Hub',
      message: '5 new live rooms in the last hour',
      time: '4h ago',
      avatar: null,
      icon: 'business_center',
      isRead: true,
      link: '/communities/business',
    },
    {
      id: 7,
      type: 'mention',
      title: 'Amara Obi mentioned you',
      message: 'In Dating Lounge - Lagos chat',
      time: 'Yesterday',
      avatar: 'AO',
      isRead: true,
      link: '/messages/room/2',
    },
    {
      id: 8,
      type: 'achievement',
      title: 'You earned a badge!',
      message: 'Top Contributor - 100 messages this week',
      time: 'Yesterday',
      avatar: null,
      icon: 'workspace_premium',
      isRead: true,
      link: '/profile',
    },
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'live': return 'bg-red-100 text-red-500'
      case 'follow': return 'bg-blue-100 text-blue-500'
      case 'connection': return 'bg-green-100 text-green-500'
      case 'event': return 'bg-purple-100 text-purple-500'
      case 'gift': return 'bg-yellow-100 text-yellow-500'
      case 'community': return 'bg-indigo-100 text-indigo-500'
      case 'mention': return 'bg-pink-100 text-pink-500'
      case 'achievement': return 'bg-amber-100 text-amber-500'
      default: return 'bg-gray-100 text-gray-500'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'live': return 'videocam'
      case 'follow': return 'person_add'
      case 'connection': return 'handshake'
      case 'event': return 'event'
      case 'gift': return 'redeem'
      case 'community': return 'groups'
      case 'mention': return 'alternate_email'
      case 'achievement': return 'military_tech'
      default: return 'notifications'
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{unreadCount} unread</p>
            )}
          </div>
          <button className="m3-text-button text-sm">Mark all read</button>
        </div>

        {/* Notification List */}
        <div>
          {notifications.map((notification) => (
            <Link key={notification.id} href={notification.link}>
              <div className={`m3-list-item px-4 border-b ${!notification.isRead ? 'bg-blue-50/50' : ''}`} style={{ borderColor: 'var(--outline)' }}>
                {/* Avatar or Icon */}
                <div className="relative">
                  {notification.avatar ? (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 font-medium">
                      {notification.avatar}
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                      <span className="material-symbols-outlined">{notification.icon || getTypeIcon(notification.type)}</span>
                    </div>
                  )}
                  {/* Type Badge */}
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                    <span className="material-symbols-outlined text-sm">{getTypeIcon(notification.type)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!notification.isRead ? 'font-medium' : ''}`} style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    {notification.title}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{notification.message}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>{notification.time}</p>
                </div>

                {/* Unread Indicator */}
                {!notification.isRead && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="p-4 text-center">
          <button className="m3-text-button">Load more</button>
        </div>
      </div>
    </main>
  )
}
