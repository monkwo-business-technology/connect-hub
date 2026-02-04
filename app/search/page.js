'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Search() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'people', label: 'People' },
    { id: 'communities', label: 'Communities' },
    { id: 'live', label: 'Live' },
    { id: 'events', label: 'Events' },
  ]

  const recentSearches = [
    'Business networking',
    'Dating in Lagos',
    'Tech meetups',
    'Chioma Eze',
  ]

  const trendingSearches = [
    { id: 1, term: 'Football match analysis', count: '2.3K' },
    { id: 2, term: 'Startup pitch', count: '1.8K' },
    { id: 3, term: 'Dating tips', count: '1.5K' },
    { id: 4, term: 'Web development', count: '1.2K' },
    { id: 5, term: 'Business networking', count: '980' },
  ]

  const suggestedPeople = [
    { id: 1, name: 'Chioma Eze', role: 'Tech Entrepreneur', avatar: 'CE', verified: true },
    { id: 2, name: 'Michael Chen', role: 'Business Coach', avatar: 'MC', verified: true },
    { id: 3, name: 'Fatima Hassan', role: 'Content Creator', avatar: 'FH', verified: false },
  ]

  const suggestedCommunities = [
    { id: 1, name: 'Business Hub', members: 8920, icon: 'business_center' },
    { id: 2, name: 'Dating Lounge', members: 12450, icon: 'favorite' },
    { id: 3, name: 'Sports Arena', members: 23400, icon: 'sports_soccer' },
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
        {/* Search Header */}
        <div className="p-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people, communities, events..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 outline-none transition-colors"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
              >
                <span className="material-symbols-outlined text-gray-500">close</span>
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`m3-chip whitespace-nowrap ${activeFilter === filter.id ? '' : ''}`}
                style={activeFilter === filter.id ? { backgroundColor: 'var(--primary)', color: 'white' } : {}}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Content */}
        <div className="px-4">
          {!query ? (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <section className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Recent Searches</h2>
                    <button className="m3-text-button text-sm">Clear all</button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-gray-400">history</span>
                        <span className="flex-1 text-left text-sm">{search}</span>
                        <span className="material-symbols-outlined text-gray-400 text-sm">north_west</span>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* Trending */}
              <section className="mb-6">
                <h2 className="font-medium mb-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>Trending Now</h2>
                <div className="space-y-1">
                  {trendingSearches.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setQuery(item.term)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium" style={{ backgroundColor: 'var(--surface-container-high)', color: 'var(--on-surface-variant)' }}>
                        {index + 1}
                      </span>
                      <span className="flex-1 text-left text-sm">{item.term}</span>
                      <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{item.count} searches</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Suggested People */}
              <section className="mb-6">
                <h2 className="font-medium mb-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>Suggested People</h2>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {suggestedPeople.map((person) => (
                    <Link key={person.id} href={`/user/${person.id}`} className="flex-shrink-0 w-28">
                      <div className="m3-card text-center p-3">
                        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 font-medium relative">
                          {person.avatar}
                          {person.verified && (
                            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                              <span className="material-symbols-outlined text-xs" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                            </span>
                          )}
                        </div>
                        <p className="font-medium text-sm mt-2 line-clamp-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{person.name}</p>
                        <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{person.role}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Suggested Communities */}
              <section>
                <h2 className="font-medium mb-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>Popular Communities</h2>
                <div className="space-y-2">
                  {suggestedCommunities.map((community) => (
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
              </section>
            </>
          ) : (
            /* Search Results */
            <div className="py-4 text-center">
              <span className="material-symbols-outlined text-6xl" style={{ color: 'var(--on-surface-variant)' }}>search</span>
              <p className="mt-4 font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Searching for "{query}"</p>
              <p className="text-sm mt-1" style={{ color: 'var(--on-surface-variant)' }}>Results will appear here</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
