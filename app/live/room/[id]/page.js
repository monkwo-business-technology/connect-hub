'use client'

import { useState } from 'react'
import Link from 'next/link'
import { use } from 'react'

export default function LiveRoom({ params }) {
  const resolvedParams = use(params)
  const [message, setMessage] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)
  const [showGiftModal, setShowGiftModal] = useState(false)

  const roomId = resolvedParams.id

  // Static room data
  const room = {
    id: roomId,
    title: 'Business Pitch Hour - Startup Edition',
    host: {
      name: 'Michael Chen',
      avatar: 'MC',
      verified: true,
      followers: 12500,
    },
    community: 'Business Hub',
    viewers: 234,
    duration: '45:23',
  }

  const participants = [
    { id: 1, name: 'Sarah K.', avatar: 'SK', isSpeaker: true },
    { id: 2, name: 'James O.', avatar: 'JO', isSpeaker: true },
    { id: 3, name: 'Amara O.', avatar: 'AO', isSpeaker: false },
    { id: 4, name: 'David A.', avatar: 'DA', isSpeaker: false },
    { id: 5, name: 'Fatima H.', avatar: 'FH', isSpeaker: false },
    { id: 6, name: 'Emeka N.', avatar: 'EN', isSpeaker: false },
  ]

  const chatMessages = [
    { id: 1, user: 'Chioma E.', message: 'Great pitch! What\'s your revenue model?', time: '2m ago', avatar: 'CE' },
    { id: 2, user: 'James O.', message: 'Loving this discussion!', time: '3m ago', avatar: 'JO' },
    { id: 3, user: 'Fatima H.', message: 'Can you share more about the tech stack?', time: '4m ago', avatar: 'FH' },
    { id: 4, user: 'David A.', message: 'This is really insightful', time: '5m ago', avatar: 'DA' },
    { id: 5, user: 'Sarah K.', message: 'Thanks for having me!', time: '6m ago', avatar: 'SK', isHost: true },
  ]

  const gifts = [
    { id: 1, name: 'Heart', icon: 'favorite', coins: 10, color: 'text-pink-500' },
    { id: 2, name: 'Star', icon: 'star', coins: 50, color: 'text-yellow-500' },
    { id: 3, name: 'Diamond', icon: 'diamond', coins: 100, color: 'text-cyan-500' },
    { id: 4, name: 'Crown', icon: 'workspace_premium', coins: 500, color: 'text-amber-500' },
    { id: 5, name: 'Rocket', icon: 'rocket_launch', coins: 1000, color: 'text-purple-500' },
    { id: 6, name: 'Trophy', icon: 'emoji_events', coins: 2000, color: 'text-yellow-600' },
  ]

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col -mt-16 -mb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-20 bg-gradient-to-b from-black/50 to-transparent absolute top-0 left-0 right-0 z-10">
        <Link href="/live" className="p-2 rounded-full bg-black/30 hover:bg-black/50">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white live-indicator"></span>
            LIVE
          </span>
          <span className="text-sm bg-black/30 px-3 py-1 rounded-full">{room.duration}</span>
          <span className="flex items-center gap-1 text-sm bg-black/30 px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-sm">visibility</span>
            {room.viewers}
          </span>
        </div>
        <button className="p-2 rounded-full bg-black/30 hover:bg-black/50">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>

      {/* Video Area */}
      <div className="flex-shrink-0 h-64 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl opacity-50">videocam</span>
          <p className="text-sm opacity-75 mt-2">Live Video Stream</p>
        </div>
      </div>

      {/* Host Info */}
      <div className="p-4 bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 font-medium">
              {room.host.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{room.host.name}</h2>
                {room.host.verified && (
                  <span className="material-symbols-outlined text-sm text-blue-400" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                )}
              </div>
              <p className="text-sm text-gray-400">{room.host.followers.toLocaleString()} followers</p>
            </div>
          </div>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isFollowing ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'
            }`}
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
        <h1 className="font-medium mt-3 text-lg" style={{ fontFamily: 'Google Sans, sans-serif' }}>{room.title}</h1>
        <Link href={`/communities/${room.community.toLowerCase().replace(' ', '-')}`} className="text-sm text-blue-400 mt-1 inline-block">
          {room.community}
        </Link>
      </div>

      {/* Participants */}
      <div className="px-4 py-3 bg-gray-800/50 border-t border-gray-700">
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {participants.map((p) => (
            <div key={p.id} className="flex flex-col items-center flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium relative ${
                p.isSpeaker ? 'bg-gradient-to-br from-green-400 to-green-600 text-white ring-2 ring-green-400' : 'bg-gray-700 text-gray-300'
              }`}>
                {p.avatar}
                {p.isSpeaker && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xs">mic</span>
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 text-gray-400 truncate max-w-[60px]">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatMessages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
              msg.isHost ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}>
              {msg.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${msg.isHost ? 'text-blue-400' : 'text-white'}`}>{msg.user}</span>
                {msg.isHost && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">Host</span>
                )}
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-300 mt-0.5">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        {/* Chat Input */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say something..."
            className="flex-1 bg-gray-700 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 border-none outline-none"
          />
          <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-600">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around">
          <button
            onClick={() => setShowGiftModal(true)}
            className="flex flex-col items-center gap-1 text-yellow-400"
          >
            <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">redeem</span>
            </span>
            <span className="text-xs">Gift</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-blue-400">
            <span className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">share</span>
            </span>
            <span className="text-xs">Share</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-green-400">
            <span className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">person_add</span>
            </span>
            <span className="text-xs">Invite</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-red-400">
            <span className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">flag</span>
            </span>
            <span className="text-xs">Report</span>
          </button>
        </div>
      </div>

      {/* Gift Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center">
          <div className="bg-gray-800 w-full max-w-lg rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg" style={{ fontFamily: 'Google Sans, sans-serif' }}>Send a Gift</h3>
              <button onClick={() => setShowGiftModal(false)} className="p-2 rounded-full hover:bg-gray-700">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Balance */}
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-700/50 rounded-xl">
              <span className="text-sm text-gray-400">Your Balance</span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-400">toll</span>
                <span className="font-medium">2,450</span>
                <button className="text-xs text-blue-400">Top up</button>
              </div>
            </div>

            {/* Gifts Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {gifts.map((gift) => (
                <button key={gift.id} className="p-4 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-colors flex flex-col items-center gap-2">
                  <span className={`material-symbols-outlined text-3xl ${gift.color}`}>{gift.icon}</span>
                  <span className="text-sm">{gift.name}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <span className="material-symbols-outlined text-xs text-yellow-400">toll</span>
                    {gift.coins}
                  </div>
                </button>
              ))}
            </div>

            <button className="w-full py-3 rounded-full font-medium text-white" style={{ backgroundColor: 'var(--primary)', fontFamily: 'Google Sans, sans-serif' }}>
              Send Gift
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
