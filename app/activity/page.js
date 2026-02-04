'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ActivityDashboard() {
  const [timeRange, setTimeRange] = useState('week')

  const stats = {
    week: {
      views: 1250,
      viewsChange: 12,
      likes: 89,
      likesChange: 8,
      comments: 34,
      commentsChange: -5,
      shares: 12,
      sharesChange: 25,
      followers: 45,
      followersChange: 15,
      profileViews: 234,
      profileViewsChange: 20,
    },
    month: {
      views: 5420,
      viewsChange: 18,
      likes: 312,
      likesChange: 12,
      comments: 156,
      commentsChange: 8,
      shares: 67,
      sharesChange: 30,
      followers: 189,
      followersChange: 22,
      profileViews: 1023,
      profileViewsChange: 15,
    },
    year: {
      views: 45200,
      viewsChange: 45,
      likes: 2890,
      likesChange: 35,
      comments: 1245,
      commentsChange: 28,
      shares: 456,
      sharesChange: 52,
      followers: 1250,
      followersChange: 85,
      profileViews: 8920,
      profileViewsChange: 40,
    },
  }

  const currentStats = stats[timeRange]

  const recentActivity = [
    { id: 1, type: 'like', user: 'Chioma Eze', avatar: 'CE', content: 'liked your post', time: '2m ago', icon: 'favorite', color: 'text-red-500' },
    { id: 2, type: 'comment', user: 'Michael Chen', avatar: 'MC', content: 'commented on your photo', time: '15m ago', icon: 'chat_bubble', color: 'text-blue-500' },
    { id: 3, type: 'follow', user: 'Fatima Hassan', avatar: 'FH', content: 'started following you', time: '1h ago', icon: 'person_add', color: 'text-green-500' },
    { id: 4, type: 'share', user: 'James Okoro', avatar: 'JO', content: 'shared your post', time: '2h ago', icon: 'share', color: 'text-purple-500' },
    { id: 5, type: 'mention', user: 'Amara Obi', avatar: 'AO', content: 'mentioned you in a comment', time: '3h ago', icon: 'alternate_email', color: 'text-orange-500' },
    { id: 6, type: 'like', user: 'David Ade', avatar: 'DA', content: 'liked your live session', time: '5h ago', icon: 'favorite', color: 'text-red-500' },
  ]

  const topPosts = [
    { id: 1, title: 'My journey into tech...', views: 456, likes: 89, comments: 23, image: null },
    { id: 2, title: 'Business tips for 2026', views: 312, likes: 67, comments: 15, image: null },
    { id: 3, title: 'Live session highlights', views: 289, likes: 54, comments: 12, image: null },
  ]

  const engagementHours = [
    { hour: '6AM', value: 20 },
    { hour: '9AM', value: 45 },
    { hour: '12PM', value: 80 },
    { hour: '3PM', value: 65 },
    { hour: '6PM', value: 90 },
    { hour: '9PM', value: 75 },
    { hour: '12AM', value: 30 },
  ]

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const StatCard = ({ icon, label, value, change, color }) => (
    <div className="m3-card">
      <div className="flex items-center justify-between mb-2">
        <span className={`material-symbols-outlined ${color}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
        <span className={`text-xs font-medium flex items-center gap-0.5 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span className="material-symbols-outlined text-sm">{change >= 0 ? 'trending_up' : 'trending_down'}</span>
          {Math.abs(change)}%
        </span>
      </div>
      <p className="text-2xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{formatNumber(value)}</p>
      <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{label}</p>
    </div>
  )

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center gap-4" style={{ borderColor: 'var(--outline)' }}>
          <Link href="/profile" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-xl font-medium flex-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Activity Dashboard</h1>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="p-4 bg-white">
          <div className="flex gap-2 p-1 rounded-xl" style={{ backgroundColor: 'var(--surface-container)' }}>
            {[
              { id: 'week', label: 'This Week' },
              { id: 'month', label: 'This Month' },
              { id: 'year', label: 'This Year' },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range.id
                    ? 'bg-white shadow-sm'
                    : ''
                }`}
                style={{
                  color: timeRange === range.id ? 'var(--primary)' : 'var(--on-surface-variant)',
                  fontFamily: 'Google Sans, sans-serif'
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-4 pb-4 bg-white">
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon="visibility" label="Total Views" value={currentStats.views} change={currentStats.viewsChange} color="text-blue-500" />
            <StatCard icon="favorite" label="Likes" value={currentStats.likes} change={currentStats.likesChange} color="text-red-500" />
            <StatCard icon="chat_bubble" label="Comments" value={currentStats.comments} change={currentStats.commentsChange} color="text-green-500" />
            <StatCard icon="share" label="Shares" value={currentStats.shares} change={currentStats.sharesChange} color="text-purple-500" />
            <StatCard icon="person_add" label="New Followers" value={currentStats.followers} change={currentStats.followersChange} color="text-orange-500" />
            <StatCard icon="account_circle" label="Profile Views" value={currentStats.profileViews} change={currentStats.profileViewsChange} color="text-cyan-500" />
          </div>
        </div>

        {/* Engagement Chart */}
        <div className="p-4">
          <div className="m3-card">
            <h3 className="font-medium mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>Peak Engagement Hours</h3>
            <div className="flex items-end justify-between gap-2 h-32">
              {engagementHours.map((hour, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${hour.value}%`,
                      backgroundColor: hour.value >= 80 ? 'var(--primary)' : 'var(--primary-container)',
                    }}
                  ></div>
                  <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{hour.hour}</span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4 text-center" style={{ color: 'var(--on-surface-variant)' }}>
              Best time to post: <span className="font-medium" style={{ color: 'var(--primary)' }}>6PM - 9PM</span>
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-4 pt-0">
          <div className="m3-card p-0 overflow-hidden">
            <div className="p-4 border-b" style={{ borderColor: 'var(--outline)' }}>
              <h3 className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Recent Activity</h3>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--outline)' }}>
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 text-sm font-medium">
                      {activity.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center`}>
                      <span className={`material-symbols-outlined text-sm ${activity.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                        {activity.icon}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span style={{ color: 'var(--on-surface-variant)' }}>{activity.content}</span>
                    </p>
                    <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/notifications" className="block p-4 text-center text-sm font-medium border-t" style={{ borderColor: 'var(--outline)', color: 'var(--primary)' }}>
              View All Activity
            </Link>
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="p-4 pt-0 pb-24">
          <div className="m3-card p-0 overflow-hidden">
            <div className="p-4 border-b" style={{ borderColor: 'var(--outline)' }}>
              <h3 className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Top Performing Posts</h3>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--outline)' }}>
              {topPosts.map((post, index) => (
                <div key={post.id} className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm" style={{ backgroundColor: 'var(--primary-container)', color: 'var(--primary)' }}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{post.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs flex items-center gap-1" style={{ color: 'var(--on-surface-variant)' }}>
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        {post.views}
                      </span>
                      <span className="text-xs flex items-center gap-1" style={{ color: 'var(--on-surface-variant)' }}>
                        <span className="material-symbols-outlined text-sm">favorite</span>
                        {post.likes}
                      </span>
                      <span className="text-xs flex items-center gap-1" style={{ color: 'var(--on-surface-variant)' }}>
                        <span className="material-symbols-outlined text-sm">chat_bubble</span>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>chevron_right</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
