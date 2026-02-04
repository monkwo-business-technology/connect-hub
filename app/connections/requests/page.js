'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConnectionRequests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'David Ade',
      avatar: 'DA',
      role: 'Software Developer',
      company: 'Tech Solutions Ltd',
      mutual: 8,
      intent: 'Networking',
      bio: 'Passionate about building scalable applications and mentoring junior developers.',
      verified: true,
    },
    {
      id: 2,
      name: 'Grace Okon',
      avatar: 'GO',
      role: 'Marketing Manager',
      company: 'Brand Africa',
      mutual: 5,
      intent: 'Business',
      bio: 'Helping brands tell their story and connect with their audience.',
      verified: true,
    },
    {
      id: 3,
      name: 'Emmanuel Nwachukwu',
      avatar: 'EN',
      role: 'Product Designer',
      company: 'Creative Studios',
      mutual: 12,
      intent: 'Networking',
      bio: 'Creating user-centered designs that solve real problems.',
      verified: false,
    },
    {
      id: 4,
      name: 'Blessing Okafor',
      avatar: 'BO',
      role: 'Data Analyst',
      company: 'FinTech Corp',
      mutual: 3,
      intent: 'Learning',
      bio: 'Turning data into actionable insights for business growth.',
      verified: true,
    },
    {
      id: 5,
      name: 'Samuel Adeyemi',
      avatar: 'SA',
      role: 'Entrepreneur',
      company: 'StartUp Hub',
      mutual: 15,
      intent: 'Business',
      bio: 'Serial entrepreneur building the next generation of African startups.',
      verified: true,
    },
  ])

  const [filter, setFilter] = useState('all')

  const handleAccept = (id) => {
    setRequests(prev => prev.filter(req => req.id !== id))
    // In real app, would make API call here
  }

  const handleDecline = (id) => {
    setRequests(prev => prev.filter(req => req.id !== id))
    // In real app, would make API call here
  }

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(req => req.intent.toLowerCase() === filter)

  const intentColors = {
    'Networking': 'bg-blue-100 text-blue-700',
    'Business': 'bg-green-100 text-green-700',
    'Learning': 'bg-purple-100 text-purple-700',
    'Dating': 'bg-pink-100 text-pink-700',
    'Friendship': 'bg-orange-100 text-orange-700',
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center gap-4" style={{ borderColor: 'var(--outline)' }}>
          <Link href="/messages" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Connection Requests</h1>
            <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{requests.length} pending</p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="p-4 bg-white border-b flex gap-2 overflow-x-auto" style={{ borderColor: 'var(--outline)' }}>
          {['all', 'networking', 'business', 'learning'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'border hover:bg-gray-50'
              }`}
              style={filter !== f ? { borderColor: 'var(--outline)' } : {}}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="p-4 space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--surface-container)' }}>
                <span className="material-symbols-outlined text-4xl" style={{ color: 'var(--on-surface-variant)' }}>group_off</span>
              </div>
              <p className="font-medium mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>No requests found</p>
              <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                {filter === 'all' ? 'You have no pending connection requests' : `No ${filter} requests at the moment`}
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="m3-card">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 font-medium text-lg">
                      {request.avatar}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{request.name}</h3>
                      {request.verified && (
                        <span className="material-symbols-outlined text-sm" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                      )}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{request.role}</p>
                    <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{request.company}</p>

                    {/* Intent Badge */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${intentColors[request.intent] || 'bg-gray-100 text-gray-700'}`}>
                        {request.intent}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                        {request.mutual} mutual connections
                      </span>
                    </div>

                    {/* Bio */}
                    <p className="text-sm mt-2 line-clamp-2" style={{ color: 'var(--on-surface-variant)' }}>
                      {request.bio}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="flex-1 py-2.5 rounded-full text-sm font-medium text-white transition-all active:scale-95"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(request.id)}
                        className="flex-1 py-2.5 rounded-full text-sm font-medium border transition-all active:scale-95 hover:bg-gray-50"
                        style={{ borderColor: 'var(--outline)', color: 'var(--on-surface)' }}
                      >
                        Decline
                      </button>
                      <Link
                        href={`/user/${request.id}`}
                        className="p-2.5 rounded-full border transition-all hover:bg-gray-50"
                        style={{ borderColor: 'var(--outline)' }}
                      >
                        <span className="material-symbols-outlined text-xl" style={{ color: 'var(--on-surface-variant)' }}>person</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Tips Section */}
        {requests.length > 0 && (
          <div className="p-4 pt-0">
            <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--surface-container)' }}>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>tips_and_updates</span>
                <div>
                  <p className="font-medium text-sm mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Connection Tips</p>
                  <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                    Review profiles carefully before accepting. Look for mutual connections and shared interests to build meaningful relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
