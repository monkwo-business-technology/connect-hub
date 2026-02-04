'use client'

import { useState } from 'react'
import Link from 'next/link'
import { use } from 'react'

const communityData = {
  dating: {
    name: 'Dating Lounge',
    icon: 'favorite',
    color: 'from-pink-400 to-rose-500',
    members: 12450,
    description: 'Find meaningful connections with like-minded singles.',
  },
  business: {
    name: 'Business Hub',
    icon: 'business_center',
    color: 'from-blue-400 to-blue-600',
    members: 8920,
    description: 'Network, pitch ideas, and grow your business.',
  },
  education: {
    name: 'Education Corner',
    icon: 'school',
    color: 'from-green-400 to-emerald-600',
    members: 15670,
    description: 'Learn new skills and share your knowledge.',
  },
  sports: {
    name: 'Sports Arena',
    icon: 'sports_soccer',
    color: 'from-orange-400 to-red-500',
    members: 23400,
    description: 'Football talk, match analysis, and sports banter.',
  },
  gaming: {
    name: 'Gaming Zone',
    icon: 'sports_esports',
    color: 'from-purple-400 to-violet-600',
    members: 18320,
    description: 'Games, streams, and competitive tournaments.',
  },
  'open-mic': {
    name: 'Open Mic',
    icon: 'mic',
    color: 'from-amber-400 to-yellow-500',
    members: 9870,
    description: 'General chat, casual conversations, and hangouts.',
  },
}

export default function CommunityDetail({ params }) {
  const resolvedParams = use(params)
  const [activeTab, setActiveTab] = useState('live')
  const [isJoined, setIsJoined] = useState(false)

  const slug = resolvedParams.slug
  const community = communityData[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    icon: 'group',
    color: 'from-gray-400 to-gray-600',
    members: 5000,
    description: 'Welcome to this community.',
  }

  const tabs = [
    { id: 'live', label: 'Live', icon: 'videocam' },
    { id: 'chat', label: 'Chat Rooms', icon: 'chat' },
    { id: 'members', label: 'Members', icon: 'group' },
    { id: 'events', label: 'Events', icon: 'event' },
  ]

  const liveRooms = [
    { id: 1, title: 'Morning Discussion', host: 'Sarah K.', viewers: 234, isLive: true },
    { id: 2, title: 'Expert Panel Talk', host: 'Mike T.', viewers: 567, isLive: true },
    { id: 3, title: 'Open Q&A Session', host: 'Community', viewers: 123, isLive: true },
    { id: 4, title: 'Evening Hangout', host: 'Admin Team', viewers: 0, isLive: false, startsAt: '8:00 PM' },
  ]

  const chatRooms = [
    { id: 1, name: 'General Chat', members: 1250, lastMessage: 'Welcome everyone!', unread: 12 },
    { id: 2, name: 'Introductions', members: 890, lastMessage: 'New here from Lagos...', unread: 5 },
    { id: 3, name: 'Questions & Help', members: 456, lastMessage: 'Anyone know how to...', unread: 0 },
    { id: 4, name: 'Off-Topic', members: 234, lastMessage: 'Did you see the match?', unread: 23 },
  ]

  const members = [
    { id: 1, name: 'Chioma Eze', role: 'Admin', avatar: 'CE', isOnline: true, verified: true },
    { id: 2, name: 'Michael Chen', role: 'Moderator', avatar: 'MC', isOnline: true, verified: true },
    { id: 3, name: 'Fatima Hassan', role: 'Member', avatar: 'FH', isOnline: true, verified: false },
    { id: 4, name: 'James Okoro', role: 'Member', avatar: 'JO', isOnline: false, verified: true },
    { id: 5, name: 'Amara Obi', role: 'Member', avatar: 'AO', isOnline: true, verified: false },
    { id: 6, name: 'David Ade', role: 'Member', avatar: 'DA', isOnline: false, verified: false },
  ]

  const events = [
    { id: 1, title: 'Weekly Meetup', date: 'Feb 4', time: '6:00 PM', attendees: 45, isPremium: false },
    { id: 2, title: 'VIP Exclusive Session', date: 'Feb 5', time: '8:00 PM', attendees: 20, isPremium: true },
    { id: 3, title: 'Community AMA', date: 'Feb 7', time: '3:00 PM', attendees: 120, isPremium: false },
  ]

  const formatMembers = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
  }

  return (
    <main className="min-h-screen">
      {/* Community Header */}
      <div className={`bg-gradient-to-br ${community.color} p-6 pb-20 -mt-16 pt-20`}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-3xl">{community.icon}</span>
            </div>
            <div className="flex-1 text-white">
              <h1 className="text-2xl font-medium mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{community.name}</h1>
              <p className="text-sm opacity-90">{community.description}</p>
              <p className="text-sm mt-2 opacity-75">{formatMembers(community.members)} members</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setIsJoined(!isJoined)}
              className={`flex-1 py-2.5 rounded-full font-medium text-sm transition-all ${
                isJoined
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white text-gray-900'
              }`}
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              {isJoined ? 'Joined' : 'Join Community'}
            </button>
            <button className="p-2.5 rounded-full bg-white/20 text-white">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2.5 rounded-full bg-white/20 text-white">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white sticky top-16 z-40 border-b -mt-8 rounded-t-3xl" style={{ borderColor: 'var(--outline)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 relative transition-colors ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                }`}
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                <span className="text-sm font-medium hidden sm:inline">{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full bg-blue-600"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-2xl mx-auto p-4">
        {/* Live Tab */}
        {activeTab === 'live' && (
          <div className="space-y-3">
            {liveRooms.map((room) => (
              <Link key={room.id} href={`/live/room/${room.id}`}>
                <div className="m3-card flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${room.isLive ? 'bg-red-100' : 'bg-gray-100'}`}>
                    <span className={`material-symbols-outlined text-2xl ${room.isLive ? 'text-red-500' : 'text-gray-400'}`}>
                      {room.isLive ? 'videocam' : 'schedule'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{room.title}</p>
                      {room.isLive && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 live-indicator"></span>
                          LIVE
                        </span>
                      )}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                      Hosted by {room.host}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                      {room.isLive ? `${room.viewers} watching` : `Starts at ${room.startsAt}`}
                    </p>
                  </div>
                  <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>chevron_right</span>
                </div>
              </Link>
            ))}
            <button className="w-full m3-outlined-button flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Start a Live Room
            </button>
          </div>
        )}

        {/* Chat Rooms Tab */}
        {activeTab === 'chat' && (
          <div className="space-y-3">
            {chatRooms.map((room) => (
              <Link key={room.id} href={`/messages/room/${room.id}`}>
                <div className="m3-card flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-container)' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>tag</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{room.name}</p>
                      {room.unread > 0 && (
                        <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center text-white" style={{ backgroundColor: 'var(--primary)' }}>
                          {room.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm truncate" style={{ color: 'var(--on-surface-variant)' }}>{room.lastMessage}</p>
                    <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{room.members} members</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div>
            <div className="relative mb-4">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
              <input
                type="text"
                placeholder="Search members..."
                className="m3-search-bar pl-10"
              />
            </div>
            <div className="space-y-2">
              {members.map((member) => (
                <Link key={member.id} href={`/user/${member.id}`}>
                  <div className="m3-list-item rounded-xl hover:bg-gray-50">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 font-medium">
                        {member.avatar}
                      </div>
                      {member.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{member.name}</p>
                        {member.verified && (
                          <span className="material-symbols-outlined text-sm" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                        )}
                      </div>
                      <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{member.role}</p>
                    </div>
                    <button className="m3-text-button text-sm">Follow</button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-3">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="m3-card hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--primary-container)' }}>
                      <span className="text-xs font-medium" style={{ color: 'var(--primary)' }}>{event.date.split(' ')[0]}</span>
                      <span className="text-lg font-bold" style={{ color: 'var(--primary)', fontFamily: 'Google Sans, sans-serif' }}>{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{event.title}</p>
                        {event.isPremium && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700">VIP</span>
                        )}
                      </div>
                      <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{event.time}</p>
                      <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{event.attendees} attending</p>
                    </div>
                    <button className="m3-outlined-button text-sm py-2">RSVP</button>
                  </div>
                </div>
              </Link>
            ))}
            <button className="w-full m3-outlined-button flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Create Event
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
