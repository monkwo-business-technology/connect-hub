'use client'

import { useState, useRef, useEffect, use } from 'react'
import Link from 'next/link'

export default function ChatRoom({ params }) {
  const { id } = use(params)
  const [message, setMessage] = useState('')
  const [showInfo, setShowInfo] = useState(false)
  const messagesEndRef = useRef(null)

  const roomData = {
    1: { name: 'Business Hub - General', icon: 'business_center', members: 1250, description: 'General discussions about business and entrepreneurship' },
    2: { name: 'Dating Lounge - Lagos', icon: 'favorite', members: 890, description: 'Connect with singles in Lagos' },
    3: { name: 'Sports Arena - Match Day', icon: 'sports_soccer', members: 2340, description: 'Live match discussions and sports talk' },
    4: { name: 'Education Corner - Q&A', icon: 'school', members: 567, description: 'Ask questions and share knowledge' },
  }

  const room = roomData[id] || { name: 'Community Chat', icon: 'groups', members: 0, description: '' }

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Chioma Eze',
      avatar: 'CE',
      message: 'Hey everyone! Excited to be here.',
      time: '10:30 AM',
      isMe: false,
      verified: true,
    },
    {
      id: 2,
      sender: 'Michael Chen',
      avatar: 'MC',
      message: 'Welcome! Great to have you join us.',
      time: '10:32 AM',
      isMe: false,
      verified: true,
    },
    {
      id: 3,
      sender: 'You',
      avatar: 'JD',
      message: 'Thanks! Looking forward to the discussions.',
      time: '10:35 AM',
      isMe: true,
      verified: false,
    },
    {
      id: 4,
      sender: 'Fatima Hassan',
      avatar: 'FH',
      message: 'Has anyone seen the new opportunity posted yesterday? Looks promising!',
      time: '10:40 AM',
      isMe: false,
      verified: false,
    },
    {
      id: 5,
      sender: 'James Okoro',
      avatar: 'JO',
      message: 'Yes! I applied already. The requirements seem reasonable.',
      time: '10:42 AM',
      isMe: false,
      verified: true,
    },
    {
      id: 6,
      sender: 'Amara Obi',
      avatar: 'AO',
      message: 'Can someone share the link? I must have missed it.',
      time: '10:45 AM',
      isMe: false,
      verified: true,
    },
  ])

  const onlineMembers = [
    { id: 1, name: 'Chioma Eze', avatar: 'CE' },
    { id: 2, name: 'Michael Chen', avatar: 'MC' },
    { id: 3, name: 'Fatima Hassan', avatar: 'FH' },
    { id: 4, name: 'James Okoro', avatar: 'JO' },
    { id: 5, name: 'Amara Obi', avatar: 'AO' },
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      avatar: 'JD',
      message: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      verified: false,
    }

    setMessages([...messages, newMessage])
    setMessage('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3" style={{ borderColor: 'var(--outline)' }}>
        <Link href="/messages" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: 'var(--primary-container)' }}
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>{room.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-medium text-sm line-clamp-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            {room.name}
          </h1>
          <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
            {room.members.toLocaleString()} members
          </p>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined">info</span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>

      {/* Room Info Panel */}
      {showInfo && (
        <div className="bg-white border-b px-4 py-3" style={{ borderColor: 'var(--outline)', backgroundColor: 'var(--surface-container)' }}>
          <p className="text-sm mb-3" style={{ color: 'var(--on-surface-variant)' }}>{room.description}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium" style={{ color: 'var(--on-surface)' }}>Online now:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {onlineMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 text-sm font-medium relative">
                  {member.avatar}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
                </div>
                <span className="text-xs mt-1 max-w-[60px] truncate" style={{ color: 'var(--on-surface-variant)' }}>
                  {member.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: 'var(--surface-container)' }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
            {!msg.isMe && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 text-xs font-medium flex-shrink-0">
                {msg.avatar}
              </div>
            )}
            <div className={`max-w-[75%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
              {!msg.isMe && (
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--on-surface)' }}>{msg.sender}</span>
                  {msg.verified && (
                    <span className="material-symbols-outlined text-xs" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                  )}
                </div>
              )}
              <div
                className={`px-4 py-2.5 rounded-2xl ${
                  msg.isMe
                    ? 'rounded-br-md'
                    : 'rounded-bl-md'
                }`}
                style={{
                  backgroundColor: msg.isMe ? 'var(--primary)' : 'white',
                  color: msg.isMe ? 'white' : 'var(--on-surface)',
                }}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
              <span className="text-xs mt-1 block" style={{ color: 'var(--on-surface-variant)', textAlign: msg.isMe ? 'right' : 'left' }}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-3" style={{ borderColor: 'var(--outline)' }}>
        <div className="flex items-end gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0">
            <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>add</span>
          </button>
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2.5 rounded-2xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              style={{ borderColor: 'var(--outline)', maxHeight: '120px' }}
            />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0">
            <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>mood</span>
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2.5 rounded-full transition-colors flex-shrink-0 disabled:opacity-50"
            style={{ backgroundColor: message.trim() ? 'var(--primary)' : 'var(--surface-container-high)' }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: message.trim() ? 'white' : 'var(--on-surface-variant)' }}
            >
              send
            </span>
          </button>
        </div>
      </div>
    </main>
  )
}
