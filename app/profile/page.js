'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('about')

  const user = {
    name: 'John Doe',
    username: '@johndoe',
    avatar: 'JD',
    bio: 'Passionate about technology and connecting with new people. Building the future one line of code at a time. Always eager to learn and share knowledge.',
    location: 'Lagos, Nigeria',
    website: 'johndoe.com',
    joinedDate: 'January 2024',
    interests: ['Tech', 'Business', 'Learning', 'Networking', 'Football'],
    communitiesJoined: [
      { id: 1, name: 'Business Hub', icon: 'business_center', members: 8920 },
      { id: 2, name: 'Education Corner', icon: 'school', members: 15670 },
      { id: 3, name: 'Sports Arena', icon: 'sports_soccer', members: 23400 },
    ],
    isVerified: true,
    relationshipIntent: 'Business',
    stats: {
      followers: 1250,
      following: 890,
      connections: 456,
    },
    liveHistory: [
      { id: 1, title: 'Pitch your business', date: 'Jan 20, 2026', viewers: 234, community: 'Business Hub' },
      { id: 2, title: 'Web Development Basics', date: 'Dec 15, 2025', viewers: 189, community: 'Education Corner' },
      { id: 3, title: 'Career Advice Session', date: 'Nov 28, 2025', viewers: 312, community: 'Business Hub' },
    ],
    badges: [
      { id: 1, name: 'Verified', icon: 'verified', color: 'text-blue-500' },
      { id: 2, name: 'Top Contributor', icon: 'workspace_premium', color: 'text-amber-500' },
      { id: 3, name: 'Early Adopter', icon: 'rocket_launch', color: 'text-purple-500' },
    ],
  }

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'activity', label: 'Activity' },
    { id: 'communities', label: 'Communities' },
  ]

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 pb-24">
          <div className="flex justify-end gap-2">
            <Link href="/settings" className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </Link>
            <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white rounded-t-3xl -mt-16 relative">
          {/* Avatar */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 text-3xl font-medium border-4 border-white shadow-lg">
              {user.avatar}
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
              <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                <span className="material-symbols-outlined text-sm">business_center</span>
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
              <Link href="/profile/edit" className="flex-1 m3-outlined-button text-center text-sm py-2.5">
                Edit Profile
              </Link>
              <Link href="/wallet" className="flex-1 m3-filled-button text-center text-sm py-2.5">
                My Wallet
              </Link>
            </div>

            {/* Badges */}
            <div className="flex justify-center gap-2 mt-4">
              {user.badges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--surface-container-high)' }}>
                  <span className={`material-symbols-outlined text-sm ${badge.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{badge.icon}</span>
                  <span className="text-xs font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t" style={{ borderColor: 'var(--outline)' }}>
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
                    activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                  }`}
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full bg-blue-600"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 bg-white">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* Bio */}
              <div>
                <h3 className="font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Bio</h3>
                <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{user.bio}</p>
              </div>

              {/* Details */}
              <div>
                <h3 className="font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg" style={{ color: 'var(--on-surface-variant)' }}>location_on</span>
                    <span className="text-sm">{user.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg" style={{ color: 'var(--on-surface-variant)' }}>link</span>
                    <a href="#" className="text-sm" style={{ color: 'var(--primary)' }}>{user.website}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg" style={{ color: 'var(--on-surface-variant)' }}>calendar_month</span>
                    <span className="text-sm">Joined {user.joinedDate}</span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <span key={interest} className="m3-chip">{interest}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div>
              <h3 className="font-medium mb-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>Live History</h3>
              <div className="space-y-3">
                {user.liveHistory.map((live) => (
                  <Link key={live.id} href={`/live/replay/${live.id}`}>
                    <div className="m3-card flex items-center gap-4 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--surface-container-high)' }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>play_circle</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{live.title}</p>
                        <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{live.community}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{live.date}</span>
                          <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{live.viewers} viewers</span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>chevron_right</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Communities Tab */}
          {activeTab === 'communities' && (
            <div className="space-y-3">
              {user.communitiesJoined.map((community) => (
                <Link key={community.id} href={`/communities/${community.name.toLowerCase().replace(' ', '-')}`}>
                  <div className="m3-card flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-container)' }}>
                      <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>{community.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{community.name}</p>
                      <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{formatNumber(community.members)} members</p>
                    </div>
                    <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>chevron_right</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--outline)', backgroundColor: 'var(--surface)' }}>
          <div className="grid grid-cols-5 gap-1">
            <Link href="/activity" className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--primary)' }}>insights</span>
              <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>Activity</span>
            </Link>
            <Link href="/wallet" className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--warning)' }}>account_balance_wallet</span>
              <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>Wallet</span>
            </Link>
            <Link href="/profile/boosts" className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--success)' }}>rocket_launch</span>
              <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>Boosts</span>
            </Link>
            <Link href="/profile/subscriptions" className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--error)' }}>card_membership</span>
              <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>Premium</span>
            </Link>
            <Link href="/settings" className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--on-surface-variant)' }}>settings</span>
              <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
