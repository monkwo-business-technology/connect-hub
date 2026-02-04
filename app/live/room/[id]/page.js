'use client'

import { useState } from 'react'
import Link from 'next/link'
import { use } from 'react'

export default function LiveRoom({ params }) {
  const resolvedParams = use(params)
  const [message, setMessage] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)
  const [walletBalance, setWalletBalance] = useState(2450)

  // Modal states
  const [showGiftModal, setShowGiftModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)

  // Gift states
  const [selectedGift, setSelectedGift] = useState(null)
  const [giftSending, setGiftSending] = useState(false)
  const [giftSent, setGiftSent] = useState(false)

  // Invite states
  const [selectedFriends, setSelectedFriends] = useState([])
  const [inviteSent, setInviteSent] = useState(false)

  // Report states
  const [selectedReportReason, setSelectedReportReason] = useState(null)
  const [reportDetails, setReportDetails] = useState('')
  const [reportSubmitted, setReportSubmitted] = useState(false)

  // Share states
  const [linkCopied, setLinkCopied] = useState(false)

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

  const friends = [
    { id: 1, name: 'Chioma Eze', avatar: 'CE', online: true },
    { id: 2, name: 'James Okoro', avatar: 'JO', online: true },
    { id: 3, name: 'Fatima Hassan', avatar: 'FH', online: false },
    { id: 4, name: 'David Ade', avatar: 'DA', online: true },
    { id: 5, name: 'Amara Obi', avatar: 'AO', online: false },
    { id: 6, name: 'Grace Okon', avatar: 'GO', online: true },
  ]

  const reportReasons = [
    { id: 1, label: 'Inappropriate content', icon: 'block' },
    { id: 2, label: 'Harassment or bullying', icon: 'sentiment_dissatisfied' },
    { id: 3, label: 'Spam or misleading', icon: 'report' },
    { id: 4, label: 'Violence or threats', icon: 'warning' },
    { id: 5, label: 'Hate speech', icon: 'do_not_disturb' },
    { id: 6, label: 'Other', icon: 'more_horiz' },
  ]

  const shareOptions = [
    { id: 'copy', label: 'Copy Link', icon: 'link', color: 'bg-gray-600' },
    { id: 'whatsapp', label: 'WhatsApp', icon: 'chat', color: 'bg-green-600' },
    { id: 'twitter', label: 'Twitter/X', icon: 'tag', color: 'bg-black' },
    { id: 'facebook', label: 'Facebook', icon: 'thumb_up', color: 'bg-blue-600' },
    { id: 'telegram', label: 'Telegram', icon: 'send', color: 'bg-sky-500' },
    { id: 'email', label: 'Email', icon: 'mail', color: 'bg-red-500' },
  ]

  // Gift functions
  const handleSendGift = () => {
    if (!selectedGift || walletBalance < selectedGift.coins) return

    setGiftSending(true)
    setTimeout(() => {
      setWalletBalance(prev => prev - selectedGift.coins)
      setGiftSending(false)
      setGiftSent(true)
      setTimeout(() => {
        setGiftSent(false)
        setSelectedGift(null)
        setShowGiftModal(false)
      }, 1500)
    }, 1000)
  }

  // Share functions
  const handleShare = (option) => {
    const shareUrl = `https://connecthub.app/live/room/${roomId}`
    const shareText = `Join me on ConnectHub Live: ${room.title}`

    switch (option.id) {
      case 'copy':
        navigator.clipboard.writeText(shareUrl)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 2000)
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank')
        break
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`, '_blank')
        break
    }
  }

  // Invite functions
  const toggleFriendSelection = (friendId) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    )
  }

  const handleSendInvites = () => {
    if (selectedFriends.length === 0) return

    setInviteSent(true)
    setTimeout(() => {
      setInviteSent(false)
      setSelectedFriends([])
      setShowInviteModal(false)
    }, 1500)
  }

  // Report functions
  const handleSubmitReport = () => {
    if (!selectedReportReason) return

    setReportSubmitted(true)
    setTimeout(() => {
      setReportSubmitted(false)
      setSelectedReportReason(null)
      setReportDetails('')
      setShowReportModal(false)
    }, 2000)
  }

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
          <button
            onClick={() => setShowShareModal(true)}
            className="flex flex-col items-center gap-1 text-blue-400"
          >
            <span className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">share</span>
            </span>
            <span className="text-xs">Share</span>
          </button>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex flex-col items-center gap-1 text-green-400"
          >
            <span className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">person_add</span>
            </span>
            <span className="text-xs">Invite</span>
          </button>
          <button
            onClick={() => setShowReportModal(true)}
            className="flex flex-col items-center gap-1 text-red-400"
          >
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
          <div className="bg-gray-800 w-full max-w-lg rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg" style={{ fontFamily: 'Google Sans, sans-serif' }}>Send a Gift</h3>
              <button onClick={() => { setShowGiftModal(false); setSelectedGift(null); setGiftSent(false); }} className="p-2 rounded-full hover:bg-gray-700">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {giftSent ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <p className="text-lg font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Gift Sent!</p>
                <p className="text-sm text-gray-400">{room.host.name} received your {selectedGift?.name}</p>
              </div>
            ) : (
              <>
                {/* Balance */}
                <div className="flex items-center justify-between mb-4 p-3 bg-gray-700/50 rounded-xl">
                  <span className="text-sm text-gray-400">Your Balance</span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-yellow-400">toll</span>
                    <span className="font-medium">{walletBalance.toLocaleString()}</span>
                    <Link href="/wallet" className="text-xs text-blue-400">Top up</Link>
                  </div>
                </div>

                {/* Gifts Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {gifts.map((gift) => (
                    <button
                      key={gift.id}
                      onClick={() => setSelectedGift(gift)}
                      disabled={walletBalance < gift.coins}
                      className={`p-4 rounded-xl transition-all flex flex-col items-center gap-2 ${
                        selectedGift?.id === gift.id
                          ? 'bg-blue-600 ring-2 ring-blue-400'
                          : walletBalance < gift.coins
                          ? 'bg-gray-700/30 opacity-50 cursor-not-allowed'
                          : 'bg-gray-700/50 hover:bg-gray-700'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-3xl ${gift.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{gift.icon}</span>
                      <span className="text-sm">{gift.name}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span className="material-symbols-outlined text-xs text-yellow-400">toll</span>
                        {gift.coins}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleSendGift}
                  disabled={!selectedGift || giftSending}
                  className="w-full py-3 rounded-full font-medium text-white disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ backgroundColor: 'var(--primary)', fontFamily: 'Google Sans, sans-serif' }}
                >
                  {giftSending ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      Sending...
                    </>
                  ) : selectedGift ? (
                    `Send ${selectedGift.name} (${selectedGift.coins} coins)`
                  ) : (
                    'Select a Gift'
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center">
          <div className="bg-gray-800 w-full max-w-lg rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg" style={{ fontFamily: 'Google Sans, sans-serif' }}>Share Live</h3>
              <button onClick={() => setShowShareModal(false)} className="p-2 rounded-full hover:bg-gray-700">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Room Preview */}
            <div className="p-4 bg-gray-700/50 rounded-xl mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">videocam</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1">{room.title}</p>
                  <p className="text-xs text-gray-400">{room.host.name} • {room.viewers} watching</p>
                </div>
              </div>
            </div>

            {/* Share Options Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {shareOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleShare(option)}
                  className="p-4 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-colors flex flex-col items-center gap-2"
                >
                  <span className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-white">{option.icon}</span>
                  </span>
                  <span className="text-xs">{option.id === 'copy' && linkCopied ? 'Copied!' : option.label}</span>
                </button>
              ))}
            </div>

            {/* Share Link */}
            <div className="flex items-center gap-2 p-3 bg-gray-700/50 rounded-xl">
              <input
                type="text"
                value={`connecthub.app/live/room/${roomId}`}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-300 outline-none"
              />
              <button
                onClick={() => handleShare({ id: 'copy' })}
                className="px-3 py-1.5 rounded-full bg-blue-500 text-sm font-medium"
              >
                {linkCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center">
          <div className="bg-gray-800 w-full max-w-lg rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg" style={{ fontFamily: 'Google Sans, sans-serif' }}>Invite Friends</h3>
              <button onClick={() => { setShowInviteModal(false); setSelectedFriends([]); setInviteSent(false); }} className="p-2 rounded-full hover:bg-gray-700">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {inviteSent ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <p className="text-lg font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Invites Sent!</p>
                <p className="text-sm text-gray-400">{selectedFriends.length} friend{selectedFriends.length > 1 ? 's' : ''} invited to join</p>
              </div>
            ) : (
              <>
                {/* Search */}
                <div className="relative mb-4">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                  <input
                    type="text"
                    placeholder="Search friends..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700/50 text-sm text-white placeholder-gray-400 outline-none"
                  />
                </div>

                {/* Selected Count */}
                {selectedFriends.length > 0 && (
                  <div className="mb-3 px-3 py-2 bg-blue-500/20 rounded-lg">
                    <span className="text-sm text-blue-400">{selectedFriends.length} friend{selectedFriends.length > 1 ? 's' : ''} selected</span>
                  </div>
                )}

                {/* Friends List */}
                <div className="space-y-2 mb-4">
                  {friends.map((friend) => (
                    <button
                      key={friend.id}
                      onClick={() => toggleFriendSelection(friend.id)}
                      className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                        selectedFriends.includes(friend.id) ? 'bg-blue-600' : 'bg-gray-700/50 hover:bg-gray-700'
                      }`}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 font-medium text-sm">
                          {friend.avatar}
                        </div>
                        {friend.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-800"></span>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm">{friend.name}</p>
                        <p className="text-xs text-gray-400">{friend.online ? 'Online' : 'Offline'}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedFriends.includes(friend.id) ? 'bg-white border-white' : 'border-gray-500'
                      }`}>
                        {selectedFriends.includes(friend.id) && (
                          <span className="material-symbols-outlined text-blue-600 text-sm">check</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleSendInvites}
                  disabled={selectedFriends.length === 0}
                  className="w-full py-3 rounded-full font-medium text-white disabled:opacity-50"
                  style={{ backgroundColor: 'var(--primary)', fontFamily: 'Google Sans, sans-serif' }}
                >
                  {selectedFriends.length > 0 ? `Send ${selectedFriends.length} Invite${selectedFriends.length > 1 ? 's' : ''}` : 'Select Friends'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center">
          <div className="bg-gray-800 w-full max-w-lg rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg" style={{ fontFamily: 'Google Sans, sans-serif' }}>Report Live</h3>
              <button onClick={() => { setShowReportModal(false); setSelectedReportReason(null); setReportDetails(''); setReportSubmitted(false); }} className="p-2 rounded-full hover:bg-gray-700">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {reportSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl text-green-400" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <p className="text-lg font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Report Submitted</p>
                <p className="text-sm text-gray-400">Thank you for helping keep our community safe.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-400 mb-4">Why are you reporting this live stream?</p>

                {/* Report Reasons */}
                <div className="space-y-2 mb-4">
                  {reportReasons.map((reason) => (
                    <button
                      key={reason.id}
                      onClick={() => setSelectedReportReason(reason)}
                      className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all ${
                        selectedReportReason?.id === reason.id ? 'bg-red-600' : 'bg-gray-700/50 hover:bg-gray-700'
                      }`}
                    >
                      <span className="material-symbols-outlined">{reason.icon}</span>
                      <span className="text-sm font-medium">{reason.label}</span>
                      {selectedReportReason?.id === reason.id && (
                        <span className="material-symbols-outlined ml-auto">check</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Additional Details */}
                {selectedReportReason && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-300">Additional details (optional)</label>
                    <textarea
                      value={reportDetails}
                      onChange={(e) => setReportDetails(e.target.value)}
                      placeholder="Provide more context..."
                      rows={3}
                      className="w-full p-3 rounded-xl bg-gray-700/50 text-sm text-white placeholder-gray-400 outline-none resize-none"
                    />
                  </div>
                )}

                <button
                  onClick={handleSubmitReport}
                  disabled={!selectedReportReason}
                  className="w-full py-3 rounded-full font-medium text-white disabled:opacity-50"
                  style={{ backgroundColor: selectedReportReason ? '#d93025' : 'gray', fontFamily: 'Google Sans, sans-serif' }}
                >
                  Submit Report
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  False reports may result in restrictions on your account
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
