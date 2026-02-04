'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Messages() {
  const [activeTab, setActiveTab] = useState('private')

  const privateMessages = [
    {
      id: 1,
      name: 'Chioma Eze',
      avatar: 'CE',
      lastMessage: 'That sounds great! Let\'s connect tomorrow.',
      time: '2m ago',
      unread: 3,
      isOnline: true,
      verified: true,
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'MC',
      lastMessage: 'Thanks for the pitch feedback!',
      time: '15m ago',
      unread: 0,
      isOnline: true,
      verified: true,
    },
    {
      id: 3,
      name: 'Fatima Hassan',
      avatar: 'FH',
      lastMessage: 'See you at the event!',
      time: '1h ago',
      unread: 1,
      isOnline: false,
      verified: false,
    },
    {
      id: 4,
      name: 'James Okoro',
      avatar: 'JO',
      lastMessage: 'Can you share the presentation?',
      time: '3h ago',
      unread: 0,
      isOnline: false,
      verified: true,
    },
    {
      id: 5,
      name: 'Amara Obi',
      avatar: 'AO',
      lastMessage: 'Loved your live session yesterday!',
      time: 'Yesterday',
      unread: 0,
      isOnline: true,
      verified: true,
    },
  ]

  const communityChats = [
    {
      id: 1,
      name: 'Business Hub - General',
      icon: 'business_center',
      lastMessage: 'New opportunity posted!',
      time: '5m ago',
      unread: 12,
      members: 1250,
    },
    {
      id: 2,
      name: 'Dating Lounge - Lagos',
      icon: 'favorite',
      lastMessage: 'Anyone up for the mixer?',
      time: '20m ago',
      unread: 5,
      members: 890,
    },
    {
      id: 3,
      name: 'Sports Arena - Match Day',
      icon: 'sports_soccer',
      lastMessage: 'What a goal!!!',
      time: '1h ago',
      unread: 45,
      members: 2340,
    },
    {
      id: 4,
      name: 'Education Corner - Q&A',
      icon: 'school',
      lastMessage: 'Thanks for the explanation',
      time: '2h ago',
      unread: 0,
      members: 567,
    },
  ]

  const connectionRequests = [
    {
      id: 1,
      name: 'David Ade',
      avatar: 'DA',
      role: 'Software Developer',
      mutual: 8,
      intent: 'Networking',
    },
    {
      id: 2,
      name: 'Grace Okon',
      avatar: 'GO',
      role: 'Marketing Manager',
      mutual: 5,
      intent: 'Business',
    },
  ]

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="p-4 pb-0">
          <h1 className="text-2xl font-medium mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>Messages</h1>

          {/* Search */}
          <div className="relative mb-4">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
            <input
              type="text"
              placeholder="Search messages..."
              className="m3-search-bar pl-10"
            />
          </div>
        </div>

        {/* Connection Requests */}
        {connectionRequests.length > 0 && (
          <div className="px-4 mb-4">
            <div className="m3-card p-0 overflow-hidden" style={{ backgroundColor: 'var(--primary-container)' }}>
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>person_add</span>
                  <span className="font-medium text-sm" style={{ fontFamily: 'Google Sans, sans-serif', color: 'var(--on-primary-container)' }}>
                    {connectionRequests.length} Connection Requests
                  </span>
                </div>
                <Link href="/connections/requests" className="text-sm font-medium" style={{ color: 'var(--primary)' }}>
                  View all
                </Link>
              </div>
              <div className="bg-white p-3 flex gap-3 overflow-x-auto">
                {connectionRequests.map((req) => (
                  <div key={req.id} className="flex-shrink-0 w-36 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 font-medium">
                      {req.avatar}
                    </div>
                    <p className="font-medium text-sm mt-2 line-clamp-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{req.name}</p>
                    <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{req.mutual} mutual</p>
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 py-1.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: 'var(--primary)' }}>Accept</button>
                      <button className="flex-1 py-1.5 rounded-full text-xs font-medium border" style={{ borderColor: 'var(--outline)', color: 'var(--on-surface)' }}>Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="px-4 border-b" style={{ borderColor: 'var(--outline)' }}>
          <div className="flex">
            <button
              onClick={() => setActiveTab('private')}
              className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
                activeTab === 'private' ? 'text-blue-600' : 'text-gray-500'
              }`}
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              Private
              {activeTab === 'private' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full bg-blue-600"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
                activeTab === 'community' ? 'text-blue-600' : 'text-gray-500'
              }`}
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              Communities
              {activeTab === 'community' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full bg-blue-600"></span>
              )}
            </button>
          </div>
        </div>

        {/* Message Lists */}
        <div>
          {activeTab === 'private' && (
            <div>
              {privateMessages.map((chat) => (
                <Link key={chat.id} href={`/messages/chat/${chat.id}`}>
                  <div className="m3-list-item hover:bg-gray-50 px-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 font-medium text-lg">
                        {chat.avatar}
                      </div>
                      {chat.isOnline && (
                        <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className={`font-medium ${chat.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`} style={{ fontFamily: 'Google Sans, sans-serif' }}>
                            {chat.name}
                          </p>
                          {chat.verified && (
                            <span className="material-symbols-outlined text-sm" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                          )}
                        </div>
                        <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-sm truncate ${chat.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center text-white ml-2 flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }}>
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'community' && (
            <div>
              {communityChats.map((chat) => (
                <Link key={chat.id} href={`/messages/room/${chat.id}`}>
                  <div className="m3-list-item hover:bg-gray-50 px-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-container)' }}>
                      <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--primary)' }}>{chat.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${chat.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`} style={{ fontFamily: 'Google Sans, sans-serif' }}>
                          {chat.name}
                        </p>
                        <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-sm truncate ${chat.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center text-white ml-2 flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }}>
                            {chat.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>{chat.members} members</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* FAB - New Message */}
        <Link href="/messages/new" className="m3-fab">
          <span className="material-symbols-outlined text-2xl">edit</span>
        </Link>
      </div>
    </main>
  )
}
