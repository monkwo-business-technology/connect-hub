'use client'

import { useState } from 'react'
import Link from 'next/link'
import { use } from 'react'

export default function UserProfile({ params }) {
  const resolvedParams = use(params)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  // Static user data based on ID
  const users = {
    1: {
      name: 'Chioma Eze',
      username: '@chiomaeze',
      avatar: 'CE',
      bio: 'Tech entrepreneur building the future. Founder @TechStartup. Speaker. Mentor. Passionate about empowering young Africans through technology.',
      location: 'Lagos, Nigeria',
      joinedDate: 'March 2024',
      interests: ['Tech', 'Business', 'Startups', 'AI', 'Mentorship'],
      isVerified: true,
      relationshipIntent: 'Business',
      stats: { followers: 12500, following: 450, connections: 890 },
      isOnline: true,
    },
    2: {
      name: 'Michael Chen',
      username: '@michaelchen',
      avatar: 'MC',
      bio: 'Business coach and consultant. Helping entrepreneurs scale their businesses. Author of "The Growth Playbook".',
      location: 'Abuja, Nigeria',
      joinedDate: 'January 2024',
      interests: ['Business', 'Coaching', 'Strategy', 'Leadership'],
      isVerified: true,
      relationshipIntent: 'Networking',
      stats: { followers: 8900, following: 320, connections: 567 },
      isOnline: true,
    },
    3: {
      name: 'Fatima Hassan',
      username: '@fatimahassan',
      avatar: 'FH',
      bio: 'Content creator and lifestyle blogger. Sharing my journey through life, love, and everything in between.',
      location: 'Lagos, Nigeria',
      joinedDate: 'June 2024',
      interests: ['Lifestyle', 'Fashion', 'Travel', 'Dating'],
      isVerified: false,
      relationshipIntent: 'Dating',
      stats: { followers: 5600, following: 890, connections: 234 },
      isOnline: false,
    },
  }

  const user = users[resolvedParams.id] || {
    name: 'User',
    username: '@user',
    avatar: 'U',
    bio: 'This user has not set up their profile yet.',
    location: 'Unknown',
    joinedDate: 'Recently',
    interests: [],
    isVerified: false,
    relationshipIntent: 'Social',
    stats: { followers: 0, following: 0, connections: 0 },
    isOnline: false,
  }

  const mutualConnections = [
    { id: 1, name: 'James O.', avatar: 'JO' },
    { id: 2, name: 'Amara O.', avatar: 'AO' },
    { id: 3, name: 'David A.', avatar: 'DA' },
  ]

  const recentActivity = [
    { id: 1, type: 'live', title: 'Hosted "Tech Talk Tuesday"', time: '2 days ago' },
    { id: 2, type: 'community', title: 'Joined Sports Arena', time: '1 week ago' },
    { id: 3, type: 'event', title: 'Attended Speed Networking', time: '2 weeks ago' },
  ]

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getIntentColor = (intent) => {
    switch (intent) {
      case 'Business': return 'bg-blue-100 text-blue-700'
      case 'Dating': return 'bg-pink-100 text-pink-700'
      case 'Networking': return 'bg-purple-100 text-purple-700'
      case 'Learning': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getIntentIcon = (intent) => {
    switch (intent) {
      case 'Business': return 'business_center'
      case 'Dating': return 'favorite'
      case 'Networking': return 'hub'
      case 'Learning': return 'school'
      default: return 'groups'
    }
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 pb-24 -mt-16 pt-20">
          <div className="flex items-center justify-between">
            <Link href="/" className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-t-3xl -mt-16 relative">
          {/* Avatar */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 text-3xl font-medium border-4 border-white shadow-lg">
                {user.avatar}
              </div>
              {user.isOnline && (
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-3 border-white"></span>
              )}
            </div>
          </div>

          <div className="pt-16 px-4 pb-4">
            {/* Name and Verification */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{user.name}</h1>
                {user.isVerified && (
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                )}
              </div>
              <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{user.username}</p>

              {/* Intent Badge */}
              <div className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-sm ${getIntentColor(user.relationshipIntent)}`}>
                <span className="material-symbols-outlined text-sm">{getIntentIcon(user.relationshipIntent)}</span>
                {user.relationshipIntent}
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-4">
              <div className="text-center">
                <p className="text-xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{formatNumber(user.stats.followers)}</p>
                <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>Followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{formatNumber(user.stats.following)}</p>
                <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>Following</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{formatNumber(user.stats.connections)}</p>
                <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>Connections</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex-1 py-2.5 rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  isFollowing ? 'border border-gray-300 text-gray-700' : 'bg-blue-500 text-white'
                }`}
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                <span className="material-symbols-outlined text-sm">{isFollowing ? 'check' : 'person_add'}</span>
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button
                onClick={() => setIsConnected(!isConnected)}
                className={`flex-1 py-2.5 rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  isConnected ? 'border border-gray-300 text-gray-700' : 'border border-blue-500 text-blue-600'
                }`}
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                <span className="material-symbols-outlined text-sm">{isConnected ? 'handshake' : 'person_add'}</span>
                {isConnected ? 'Connected' : 'Connect'}
              </button>
              <Link href={`/messages/chat/${resolvedParams.id}`} className="p-2.5 rounded-full border border-gray-300">
                <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>chat</span>
              </Link>
            </div>

            {/* Mutual Connections */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                {mutualConnections.slice(0, 3).map((conn) => (
                  <div key={conn.id} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-xs font-medium border-2 border-white">
                    {conn.avatar}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                <span className="font-medium">{mutualConnections.length} mutual</span> connections
              </p>
            </div>
          </div>

          {/* Bio & Details */}
          <div className="px-4 py-4 border-t" style={{ borderColor: 'var(--outline)' }}>
            <p className="text-sm">{user.bio}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">location_on</span>
                {user.location}
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                Joined {user.joinedDate}
              </div>
            </div>

            {/* Interests */}
            <div className="mt-4">
              <h3 className="font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <span key={interest} className="m3-chip">{interest}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="px-4 py-4 border-t" style={{ borderColor: 'var(--outline)' }}>
            <h3 className="font-medium mb-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--surface-container-high)' }}>
                    <span className="material-symbols-outlined text-lg" style={{ color: 'var(--on-surface-variant)' }}>
                      {activity.type === 'live' ? 'videocam' : activity.type === 'community' ? 'groups' : 'event'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.title}</p>
                    <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
