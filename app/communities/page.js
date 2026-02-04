import Link from 'next/link'

export default function Communities() {
  const communities = [
    {
      id: 1,
      slug: 'dating',
      name: 'Dating Lounge',
      icon: 'favorite',
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600',
      members: 12450,
      liveNow: 8,
      description: 'Meet singles, find your match'
    },
    {
      id: 2,
      slug: 'business',
      name: 'Business Hub',
      icon: 'business_center',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      members: 8920,
      liveNow: 5,
      description: 'Network, pitch, grow'
    },
    {
      id: 3,
      slug: 'education',
      name: 'Education Corner',
      icon: 'school',
      color: 'from-green-400 to-emerald-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      members: 15670,
      liveNow: 12,
      description: 'Learn, teach, share knowledge'
    },
    {
      id: 4,
      slug: 'sports',
      name: 'Sports Arena',
      icon: 'sports_soccer',
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      members: 23400,
      liveNow: 15,
      description: 'Football, sports talk, banter'
    },
    {
      id: 5,
      slug: 'gaming',
      name: 'Gaming Zone',
      icon: 'sports_esports',
      color: 'from-purple-400 to-violet-600',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      members: 18320,
      liveNow: 22,
      description: 'Games, streams, tournaments'
    },
    {
      id: 6,
      slug: 'open-mic',
      name: 'Open Mic',
      icon: 'mic',
      color: 'from-amber-400 to-yellow-500',
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-600',
      members: 9870,
      liveNow: 6,
      description: 'General chat, hang out'
    },
    {
      id: 7,
      slug: 'travel',
      name: 'Travel & Culture',
      icon: 'flight',
      color: 'from-cyan-400 to-teal-500',
      bgColor: 'bg-cyan-100',
      textColor: 'text-cyan-600',
      members: 7650,
      liveNow: 3,
      description: 'Explore the world together'
    },
    {
      id: 8,
      slug: 'tech',
      name: 'Tech Talk',
      icon: 'code',
      color: 'from-slate-400 to-gray-600',
      bgColor: 'bg-slate-100',
      textColor: 'text-slate-600',
      members: 11200,
      liveNow: 9,
      description: 'Tech, coding, innovation'
    },
  ]

  const cityGroups = [
    { id: 1, slug: 'lagos', name: 'Lagos', members: 45000, flag: 'NG' },
    { id: 2, slug: 'abuja', name: 'Abuja', members: 23000, flag: 'NG' },
    { id: 3, slug: 'port-harcourt', name: 'Port Harcourt', members: 15000, flag: 'NG' },
    { id: 4, slug: 'ibadan', name: 'Ibadan', members: 12000, flag: 'NG' },
    { id: 5, slug: 'accra', name: 'Accra', members: 18000, flag: 'GH' },
    { id: 6, slug: 'nairobi', name: 'Nairobi', members: 21000, flag: 'KE' },
  ]

  const formatMembers = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Communities</h1>
          <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>Join spaces that match your interests</p>
        </div>

        {/* Interest Communities */}
        <section className="mb-8">
          <h2 className="text-lg font-medium mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>By Interest</h2>
          <div className="grid grid-cols-2 gap-3">
            {communities.map((community) => (
              <Link key={community.id} href={`/communities/${community.slug}`}>
                <div className="m3-card hover:shadow-md transition-all h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${community.color} flex items-center justify-center mb-3`}>
                    <span className="material-symbols-outlined text-white text-2xl">{community.icon}</span>
                  </div>
                  <h3 className="font-medium mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{community.name}</h3>
                  <p className="text-xs mb-2" style={{ color: 'var(--on-surface-variant)' }}>{community.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                      {formatMembers(community.members)} members
                    </span>
                    {community.liveNow > 0 && (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 live-indicator"></span>
                        {community.liveNow} live
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* City Groups */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>City Groups</h2>
            <Link href="/communities/cities" className="m3-text-button text-sm">See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {cityGroups.map((city) => (
              <Link key={city.id} href={`/communities/city/${city.slug}`} className="flex-shrink-0">
                <div className="m3-card hover:shadow-md transition-all min-w-[140px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: 'var(--surface-container-high)' }}>
                      {city.flag === 'NG' ? '🇳🇬' : city.flag === 'GH' ? '🇬🇭' : '🇰🇪'}
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>{city.name}</p>
                      <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{formatMembers(city.members)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Create Community CTA */}
        <section className="mt-8">
          <div className="m3-card text-center py-8" style={{ backgroundColor: 'var(--primary-container)' }}>
            <span className="material-symbols-outlined text-4xl mb-3" style={{ color: 'var(--primary)' }}>add_circle</span>
            <h3 className="font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif', color: 'var(--on-primary-container)' }}>Create Your Community</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--on-primary-container)' }}>Build your own space for people with shared interests</p>
            <button className="m3-filled-button">Get Started</button>
          </div>
        </section>
      </div>
    </main>
  )
}
