'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Live() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'dating', label: 'Dating' },
    { id: 'business', label: 'Business' },
    { id: 'education', label: 'Education' },
    { id: 'sports', label: 'Sports' },
    { id: 'gaming', label: 'Gaming' },
  ]

  const liveRooms = [
    {
      id: 1,
      title: 'Business Pitch Hour',
      host: { name: 'Michael Chen', avatar: 'MC', verified: true },
      community: 'Business Hub',
      category: 'business',
      viewers: 234,
      thumbnail: 'from-blue-400 to-blue-600',
      type: 'video',
    },
    {
      id: 2,
      title: 'Lagos Singles Mixer',
      host: { name: 'Amara Obi', avatar: 'AO', verified: true },
      community: 'Dating Lounge',
      category: 'dating',
      viewers: 567,
      thumbnail: 'from-pink-400 to-rose-500',
      type: 'video',
    },
    {
      id: 3,
      title: 'React.js Masterclass',
      host: { name: 'David Ade', avatar: 'DA', verified: true },
      community: 'Education Corner',
      category: 'education',
      viewers: 189,
      thumbnail: 'from-green-400 to-emerald-600',
      type: 'video',
    },
    {
      id: 4,
      title: 'Match Day Analysis',
      host: { name: 'Kola Sports', avatar: 'KS', verified: false },
      community: 'Sports Arena',
      category: 'sports',
      viewers: 892,
      thumbnail: 'from-orange-400 to-red-500',
      type: 'audio',
    },
    {
      id: 5,
      title: 'Startup Founders Chat',
      host: { name: 'Sarah K.', avatar: 'SK', verified: true },
      community: 'Business Hub',
      category: 'business',
      viewers: 324,
      thumbnail: 'from-indigo-400 to-blue-600',
      type: 'audio',
    },
    {
      id: 6,
      title: 'Gaming Tournament Finals',
      host: { name: 'GamerX', avatar: 'GX', verified: true },
      community: 'Gaming Zone',
      category: 'gaming',
      viewers: 1250,
      thumbnail: 'from-purple-400 to-violet-600',
      type: 'video',
    },
    {
      id: 7,
      title: 'Dating Tips & Advice',
      host: { name: 'Love Coach', avatar: 'LC', verified: true },
      community: 'Dating Lounge',
      category: 'dating',
      viewers: 445,
      thumbnail: 'from-rose-400 to-pink-500',
      type: 'panel',
    },
    {
      id: 8,
      title: 'Investment Opportunities',
      host: { name: 'Finance Pro', avatar: 'FP', verified: true },
      community: 'Business Hub',
      category: 'business',
      viewers: 678,
      thumbnail: 'from-cyan-400 to-blue-500',
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

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Live Now</h1>
          <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
            {liveRooms.length} rooms streaming right now
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`m3-chip whitespace-nowrap ${activeFilter === filter.id ? 'm3-chip-selected' : ''}`}
              style={activeFilter === filter.id ? { backgroundColor: 'var(--primary)', color: 'white' } : {}}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Live Rooms Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredRooms.map((room) => (
            <Link key={room.id} href={`/live/room/${room.id}`}>
              <div className="m3-card p-0 overflow-hidden hover:shadow-md transition-shadow">
                {/* Thumbnail */}
                <div className={`h-28 bg-gradient-to-br ${room.thumbnail} relative`}>
                  {/* Live Badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white live-indicator"></span>
                    LIVE
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">{getTypeIcon(room.type)}</span>
                    {room.type}
                  </div>

                  {/* Viewers */}
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">visibility</span>
                    {room.viewers}
                  </div>

                  {/* Host Avatar */}
                  <div className="absolute bottom-2 left-2">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-medium border-2 border-white">
                      {room.host.avatar}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="font-medium text-sm line-clamp-1 mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    {room.title}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{room.host.name}</span>
                    {room.host.verified && (
                      <span className="material-symbols-outlined text-xs" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                    )}
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--primary)' }}>{room.community}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FAB - Start Live */}
        <Link href="/live/start" className="m3-fab">
          <span className="material-symbols-outlined text-2xl">video_call</span>
        </Link>
      </div>
    </main>
  )
}
