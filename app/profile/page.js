'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Profile() {
  const [activeTab, setActiveTab] = useState('posts')

  const user = {
    name: 'John Doe',
    username: '@johndoe',
    avatar: 'JD',
    coverGradient: 'from-blue-600 via-indigo-600 to-purple-600',
    bio: 'Passionate about technology and connecting with new people. Building the future one line of code at a time. Always eager to learn and share knowledge.',
    location: 'Lagos, Nigeria',
    website: 'johndoe.com',
    joinedDate: 'January 2024',
    interests: ['Tech', 'Business', 'Learning', 'Networking', 'Football', 'AI', 'Startups'],
    communitiesJoined: [
      { id: 1, name: 'Business Hub', icon: 'business_center', members: 8920, color: 'from-blue-500 to-indigo-500' },
      { id: 2, name: 'Education Corner', icon: 'school', members: 15670, color: 'from-green-500 to-emerald-500' },
      { id: 3, name: 'Sports Arena', icon: 'sports_soccer', members: 23400, color: 'from-orange-500 to-red-500' },
    ],
    isVerified: true,
    relationshipIntent: 'Business',
    stats: {
      followers: 1250,
      following: 890,
      connections: 456,
      posts: 89,
    },
    recentPosts: [
      { id: 1, content: 'Just launched my new startup! Excited to share more details soon. Stay tuned! 🚀', likes: 234, comments: 45, time: '2h ago', hasImage: true },
      { id: 2, content: 'Great insights from today\'s business meetup. Networking is key! 💼', likes: 156, comments: 23, time: '1d ago', hasImage: false },
      { id: 3, content: 'Learning React has been an amazing journey. Here are my top 5 tips for beginners...', likes: 312, comments: 67, time: '3d ago', hasImage: true },
    ],
    liveHistory: [
      { id: 1, title: 'Pitch your business', date: 'Jan 20, 2026', viewers: 234, community: 'Business Hub', thumbnail: 'from-blue-500 to-indigo-500' },
      { id: 2, title: 'Web Development Basics', date: 'Dec 15, 2025', viewers: 189, community: 'Education Corner', thumbnail: 'from-green-500 to-emerald-500' },
      { id: 3, title: 'Career Advice Session', date: 'Nov 28, 2025', viewers: 312, community: 'Business Hub', thumbnail: 'from-purple-500 to-pink-500' },
    ],
    badges: [
      { id: 1, name: 'Verified', icon: 'verified', color: 'bg-blue-500', textColor: 'text-white' },
      { id: 2, name: 'Top Contributor', icon: 'workspace_premium', color: 'bg-amber-500', textColor: 'text-white' },
      { id: 3, name: 'Early Adopter', icon: 'rocket_launch', color: 'bg-purple-500', textColor: 'text-white' },
    ],
  }

  const tabs = [
    { id: 'posts', label: 'Posts', icon: 'article' },
    { id: 'media', label: 'Media', icon: 'photo_library' },
    { id: 'lives', label: 'Lives', icon: 'videocam' },
  ]

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--surface-container)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Cover & Avatar Section */}
        <div className="relative">
          {/* Cover Image */}
          <div className={`h-36 bg-gradient-to-r ${user.coverGradient} relative`}>
            {/* Overlay Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/30 transition-colors">
                <span className="material-symbols-outlined text-xl">share</span>
              </button>
              <Link href="/settings" className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/30 transition-colors">
                <span className="material-symbols-outlined text-xl">settings</span>
              </Link>
            </div>
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-16 left-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 text-4xl font-semibold border-4 border-white shadow-xl" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                {user.avatar}
              </div>
              {user.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-xl" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white pt-20 px-4 pb-4">
          {/* Name & Actions Row */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-2xl font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>{user.name}</h1>
              <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{user.username}</p>
            </div>
            <Link
              href="/profile/edit"
              className="px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all hover:bg-gray-50 active:scale-95"
              style={{ borderColor: 'var(--outline)', fontFamily: 'Google Sans, sans-serif' }}
            >
              Edit Profile
            </Link>
          </div>

          {/* Intent & Location */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>business_center</span>
              {user.relationshipIntent}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
              <span className="material-symbols-outlined text-lg">location_on</span>
              {user.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: 'var(--primary)' }}>
              <span className="material-symbols-outlined text-lg">link</span>
              {user.website}
            </span>
          </div>

          {/* Bio */}
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--on-surface)' }}>
            {user.bio}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {user.badges.map((badge) => (
              <span
                key={badge.id}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${badge.color} ${badge.textColor}`}
              >
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{badge.icon}</span>
                {badge.name}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-1 p-1 rounded-2xl mb-4" style={{ backgroundColor: 'var(--surface-container)' }}>
            {[
              { label: 'Followers', value: user.stats.followers },
              { label: 'Following', value: user.stats.following },
              { label: 'Connections', value: user.stats.connections },
            ].map((stat, index) => (
              <button key={stat.label} className="flex-1 py-3 rounded-xl hover:bg-white transition-colors">
                <p className="text-lg font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>{formatNumber(stat.value)}</p>
                <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{stat.label}</p>
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { href: '/activity', icon: 'insights', label: 'Activity', color: 'from-blue-500 to-indigo-500' },
              { href: '/wallet', icon: 'account_balance_wallet', label: 'Wallet', color: 'from-amber-500 to-orange-500' },
              { href: '/profile/boosts', icon: 'rocket_launch', label: 'Boosts', color: 'from-purple-500 to-pink-500' },
              { href: '/connections/requests', icon: 'person_add', label: 'Requests', color: 'from-green-500 to-emerald-500' },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: 'var(--surface-container)' }}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{action.icon}</span>
                </div>
                <span className="text-xs font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className="bg-white mt-2 p-4">
          <h2 className="text-base font-semibold mb-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>Interests</h2>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--surface-container-high)', fontFamily: 'Google Sans, sans-serif' }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Communities Section */}
        <div className="bg-white mt-2 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>Communities</h2>
            <Link href="/communities" className="text-sm font-medium" style={{ color: 'var(--primary)' }}>See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {user.communitiesJoined.map((community) => (
              <Link
                key={community.id}
                href={`/communities/${community.name.toLowerCase().replace(' ', '-')}`}
                className="flex-shrink-0 w-28"
              >
                <div className="flex flex-col items-center p-3 rounded-2xl transition-all hover:scale-105" style={{ backgroundColor: 'var(--surface-container)' }}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${community.color} flex items-center justify-center mb-2`}>
                    <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{community.icon}</span>
                  </div>
                  <p className="text-xs font-medium text-center line-clamp-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{community.name}</p>
                  <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{formatNumber(community.members)}</p>
                </div>
              </Link>
            ))}
            <Link href="/communities" className="flex-shrink-0 w-28">
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl h-full transition-all hover:scale-105" style={{ backgroundColor: 'var(--surface-container)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--surface-container-high)' }}>
                  <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--on-surface-variant)' }}>add</span>
                </div>
                <p className="text-xs font-medium" style={{ fontFamily: 'Google Sans, sans-serif', color: 'var(--primary)' }}>Discover</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white mt-2 sticky top-0 z-10">
          <div className="flex border-b" style={{ borderColor: 'var(--outline)' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium relative transition-colors ${
                  activeTab === tab.id ? '' : ''
                }`}
                style={{
                  fontFamily: 'Google Sans, sans-serif',
                  color: activeTab === tab.id ? 'var(--primary)' : 'var(--on-surface-variant)'
                }}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: activeTab === tab.id ? "'FILL' 1" : "'FILL' 0" }}>
                  {tab.icon}
                </span>
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white pb-20">
          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div>
              {user.recentPosts.map((post, index) => (
                <div key={post.id} className={`p-4 ${index !== user.recentPosts.length - 1 ? 'border-b' : ''}`} style={{ borderColor: 'var(--outline)' }}>
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 text-sm font-medium">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>{user.name}</span>
                        <span className="material-symbols-outlined text-sm" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{post.time}</p>
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>more_horiz</span>
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-sm leading-relaxed mb-3">{post.content}</p>

                  {/* Post Image Placeholder */}
                  {post.hasImage && (
                    <div className="h-48 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 mb-3 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl" style={{ color: 'var(--on-surface-variant)' }}>image</span>
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                      <span className="material-symbols-outlined text-xl">favorite</span>
                      {formatNumber(post.likes)}
                    </button>
                    <button className="flex items-center gap-2 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                      <span className="material-symbols-outlined text-xl">chat_bubble</span>
                      {formatNumber(post.comments)}
                    </button>
                    <button className="flex items-center gap-2 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                      <span className="material-symbols-outlined text-xl">share</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm ml-auto" style={{ color: 'var(--on-surface-variant)' }}>
                      <span className="material-symbols-outlined text-xl">bookmark</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="p-4">
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <div key={item} className="aspect-square rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--on-surface-variant)' }}>image</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lives Tab */}
          {activeTab === 'lives' && (
            <div className="p-4 space-y-3">
              {user.liveHistory.map((live) => (
                <Link key={live.id} href={`/live/replay/${live.id}`}>
                  <div className="flex gap-4 p-3 rounded-2xl transition-all hover:bg-gray-50" style={{ backgroundColor: 'var(--surface-container)' }}>
                    {/* Thumbnail */}
                    <div className={`w-24 h-16 rounded-xl bg-gradient-to-br ${live.thumbnail} flex items-center justify-center flex-shrink-0 relative`}>
                      <span className="material-symbols-outlined text-white text-2xl">play_circle</span>
                      <span className="absolute bottom-1 right-1 text-xs text-white bg-black/50 px-1.5 rounded">
                        {live.viewers}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1 mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{live.title}</p>
                      <p className="text-xs mb-1" style={{ color: 'var(--primary)' }}>{live.community}</p>
                      <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{live.date} • {live.viewers} viewers</p>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Go Live CTA */}
              <div className="p-4 rounded-2xl text-center" style={{ backgroundColor: 'var(--primary-container)' }}>
                <span className="material-symbols-outlined text-3xl mb-2" style={{ color: 'var(--primary)' }}>video_call</span>
                <p className="font-medium text-sm mb-1" style={{ fontFamily: 'Google Sans, sans-serif', color: 'var(--on-primary-container)' }}>Start a Live Session</p>
                <p className="text-xs mb-3" style={{ color: 'var(--on-primary-container)' }}>Connect with your followers in real-time</p>
                <Link href="/live/start" className="inline-flex px-5 py-2.5 rounded-full text-sm font-medium text-white" style={{ backgroundColor: 'var(--primary)', fontFamily: 'Google Sans, sans-serif' }}>
                  Go Live
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
