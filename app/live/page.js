'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Live() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filters = [
    { id: 'all', label: 'All', icon: 'apps' },
    { id: 'dating', label: 'Dating', icon: 'favorite' },
    { id: 'business', label: 'Business', icon: 'business_center' },
    { id: 'education', label: 'Education', icon: 'school' },
    { id: 'sports', label: 'Sports', icon: 'sports_soccer' },
    { id: 'gaming', label: 'Gaming', icon: 'sports_esports' },
  ]

  const featuredRoom = {
    id: 1,
    title: 'Business Pitch Hour - Startup Edition',
    host: { name: 'Michael Chen', avatar: 'MC', verified: true, followers: 12500 },
    community: 'Business Hub',
    category: 'business',
    viewers: 1234,
    thumbnail: 'from-blue-500 to-indigo-600',
    type: 'video',
    description: 'Join us for an exciting session where startups pitch their ideas to investors.',
  }

  const liveRooms = [
    {
      id: 2,
      title: 'Lagos Singles Mixer',
      host: { name: 'Amara Obi', avatar: 'AO', verified: true },
      community: 'Dating Lounge',
      category: 'dating',
      viewers: 567,
      thumbnail: 'from-pink-500 to-rose-500',
      type: 'video',
    },
    {
      id: 3,
      title: 'React.js Masterclass',
      host: { name: 'David Ade', avatar: 'DA', verified: true },
      community: 'Education Corner',
      category: 'education',
      viewers: 189,
      thumbnail: 'from-green-500 to-emerald-600',
      type: 'video',
    },
    {
      id: 4,
      title: 'Match Day Analysis',
      host: { name: 'Kola Sports', avatar: 'KS', verified: false },
      community: 'Sports Arena',
      category: 'sports',
      viewers: 892,
      thumbnail: 'from-orange-500 to-red-500',
      type: 'audio',
    },
    {
      id: 5,
      title: 'Startup Founders Chat',
      host: { name: 'Sarah K.', avatar: 'SK', verified: true },
      community: 'Business Hub',
      category: 'business',
      viewers: 324,
      thumbnail: 'from-indigo-500 to-blue-600',
      type: 'audio',
    },
    {
      id: 6,
      title: 'Gaming Tournament Finals',
      host: { name: 'GamerX', avatar: 'GX', verified: true },
      community: 'Gaming Zone',
      category: 'gaming',
      viewers: 1250,
      thumbnail: 'from-purple-500 to-violet-600',
      type: 'video',
    },
    {
      id: 7,
      title: 'Dating Tips & Advice',
      host: { name: 'Love Coach', avatar: 'LC', verified: true },
      community: 'Dating Lounge',
      category: 'dating',
      viewers: 445,
      thumbnail: 'from-rose-500 to-pink-500',
      type: 'panel',
    },
    {
      id: 8,
      title: 'Investment Opportunities',
      host: { name: 'Finance Pro', avatar: 'FP', verified: true },
      community: 'Business Hub',
      category: 'business',
      viewers: 678,
      thumbnail: 'from-cyan-500 to-blue-500',
      type: 'video',
    },
    {
      id: 9,
      title: 'Fitness & Wellness',
      host: { name: 'Fit Life', avatar: 'FL', verified: true },
      community: 'Health Hub',
      category: 'education',
      viewers: 234,
      thumbnail: 'from-lime-500 to-green-500',
      type: 'video',
    },
  ]

  const filteredRooms = activeFilter === 'all'
    ? liveRooms
    : liveRooms.filter(room => room.category === activeFilter)

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'videocam'
      case 'audio': return 'mic'
      case 'panel': return 'groups'
      default: return 'videocam'
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'video': return 'Video'
      case 'audio': return 'Audio'
      case 'panel': return 'Panel'
      default: return 'Live'
    }
  }

  const formatViewers = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Live</h1>
              <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                {liveRooms.length + 1} streams happening now
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>notifications</span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>history</span>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--on-surface-variant)' }}>search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search live streams..."
              className="w-full pl-12 pr-4 py-3 rounded-full text-sm outline-none transition-all"
              style={{ backgroundColor: 'var(--surface-container-high)' }}
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? 'text-white shadow-md'
                    : 'hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: activeFilter === filter.id ? 'var(--primary)' : 'var(--surface-container-high)',
                  color: activeFilter === filter.id ? 'white' : 'var(--on-surface)',
                  fontFamily: 'Google Sans, sans-serif'
                }}
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: activeFilter === filter.id ? "'FILL' 1" : "'FILL' 0" }}>
                  {filter.icon}
                </span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Stream */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Featured</h2>
            <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--error)', color: 'white' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white live-indicator"></span>
              LIVE NOW
            </span>
          </div>
          <Link href={`/live/room/${featuredRoom.id}`}>
            <div className="rounded-3xl overflow-hidden shadow-lg" style={{ backgroundColor: 'var(--surface)' }}>
              {/* Thumbnail */}
              <div className={`h-44 bg-gradient-to-br ${featuredRoom.thumbnail} relative`}>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Type Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                    <span className="material-symbols-outlined text-sm">{getTypeIcon(featuredRoom.type)}</span>
                    {getTypeLabel(featuredRoom.type)}
                  </span>
                </div>

                {/* Viewers */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                  {formatViewers(featuredRoom.viewers)} watching
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-medium text-lg mb-1 line-clamp-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    {featuredRoom.title}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-1">{featuredRoom.description}</p>
                </div>
              </div>

              {/* Host Info */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 font-medium">
                    {featuredRoom.host.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>{featuredRoom.host.name}</span>
                      {featuredRoom.host.verified && (
                        <span className="material-symbols-outlined text-sm" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{featuredRoom.community}</p>
                  </div>
                </div>
                <button
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{ backgroundColor: 'var(--primary)', color: 'white', fontFamily: 'Google Sans, sans-serif' }}
                >
                  Join
                </button>
              </div>
            </div>
          </Link>
        </div>

        {/* Categories Quick Access */}
        <div className="px-4 mb-6">
          <h2 className="font-medium mb-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>Browse by Category</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { id: 'dating', label: 'Dating', icon: 'favorite', color: 'from-pink-500 to-rose-500' },
              { id: 'business', label: 'Business', icon: 'business_center', color: 'from-blue-500 to-indigo-500' },
              { id: 'education', label: 'Learn', icon: 'school', color: 'from-green-500 to-emerald-500' },
              { id: 'gaming', label: 'Gaming', icon: 'sports_esports', color: 'from-purple-500 to-violet-500' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--surface-container)' }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>{cat.icon}</span>
                </div>
                <span className="text-xs font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Streams Section */}
        <div className="px-4 pb-24">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              {activeFilter === 'all' ? 'All Live Streams' : filters.find(f => f.id === activeFilter)?.label + ' Streams'}
            </h2>
            <span className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
              {filteredRooms.length} live
            </span>
          </div>

          {/* Live Rooms Grid */}
          <div className="grid grid-cols-2 gap-3">
            {filteredRooms.map((room) => (
              <Link key={room.id} href={`/live/room/${room.id}`}>
                <div className="rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]" style={{ backgroundColor: 'var(--surface-container)' }}>
                  {/* Thumbnail */}
                  <div className={`h-28 bg-gradient-to-br ${room.thumbnail} relative`}>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    {/* Live Badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-white live-indicator"></span>
                      LIVE
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">{getTypeIcon(room.type)}</span>
                    </div>

                    {/* Viewers */}
                    <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                      {formatViewers(room.viewers)}
                    </div>

                    {/* Host Avatar */}
                    <div className="absolute bottom-2 left-2">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-medium shadow-md border-2 border-white">
                        {room.host.avatar}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="font-medium text-sm line-clamp-1 mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      {room.title}
                    </p>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xs line-clamp-1" style={{ color: 'var(--on-surface-variant)' }}>{room.host.name}</span>
                      {room.host.verified && (
                        <span className="material-symbols-outlined text-xs flex-shrink-0" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs" style={{ color: 'var(--primary)' }}>tag</span>
                      <span className="text-xs" style={{ color: 'var(--primary)' }}>{room.community}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--surface-container)' }}>
                <span className="material-symbols-outlined text-4xl" style={{ color: 'var(--on-surface-variant)' }}>live_tv</span>
              </div>
              <p className="font-medium mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>No live streams</p>
              <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                No {filters.find(f => f.id === activeFilter)?.label.toLowerCase()} streams are live right now
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 px-4 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: 'var(--primary-container)', color: 'var(--on-primary-container)', fontFamily: 'Google Sans, sans-serif' }}
              >
                View all streams
              </button>
            </div>
          )}
        </div>

        {/* FAB - Start Live */}
        <Link
          href="/live/start"
          className="fixed bottom-24 right-4 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: 'var(--primary)', color: 'white' }}
        >
          <span className="material-symbols-outlined text-2xl">video_call</span>
        </Link>

        {/* Extended FAB for Desktop */}
        <Link
          href="/live/start"
          className="hidden sm:flex fixed bottom-24 right-4 px-5 py-4 rounded-2xl items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: 'var(--primary)', color: 'white', fontFamily: 'Google Sans, sans-serif' }}
        >
          <span className="material-symbols-outlined">video_call</span>
          <span className="font-medium">Go Live</span>
        </Link>
      </div>
    </main>
  )
}
