import Link from 'next/link'

export default function Home() {
  const liveNow = [
    { id: 1, title: 'Business Pitch Hour', host: 'Michael Chen', community: 'Business Hub', viewers: 234, thumbnail: 'business' },
    { id: 2, title: 'Dating Chat - Lagos Edition', host: 'Amara Obi', community: 'Dating Lounge', viewers: 567, thumbnail: 'dating' },
    { id: 3, title: 'Web3 Masterclass', host: 'David Ade', community: 'Education Corner', viewers: 189, thumbnail: 'education' },
    { id: 4, title: 'Match Day Analysis', host: 'Kola Sports', community: 'Sports Arena', viewers: 892, thumbnail: 'sports' },
  ]

  const suggestedPeople = [
    { id: 1, name: 'Chioma Eze', role: 'Tech Entrepreneur', mutual: 12, avatar: 'CE', intent: 'Business', verified: true },
    { id: 2, name: 'James Okoro', role: 'Software Developer', mutual: 8, avatar: 'JO', intent: 'Networking', verified: false },
    { id: 3, name: 'Fatima Hassan', role: 'Content Creator', mutual: 5, avatar: 'FH', intent: 'Dating', verified: true },
    { id: 4, name: 'Emeka Nwankwo', role: 'Real Estate Agent', mutual: 15, avatar: 'EN', intent: 'Business', verified: true },
  ]

  const upcomingEvents = [
    { id: 1, title: 'Speed Networking Session', date: 'Feb 4, 6:00 PM', community: 'Business Hub', attendees: 45, type: 'networking' },
    { id: 2, title: 'Singles Mixer Night', date: 'Feb 5, 8:00 PM', community: 'Dating Lounge', attendees: 120, type: 'dating' },
    { id: 3, title: 'React.js Workshop', date: 'Feb 6, 3:00 PM', community: 'Education Corner', attendees: 78, type: 'learning' },
  ]

  const trendingRooms = [
    { id: 1, title: 'Startup Founders Circle', participants: 324, community: 'Business Hub', isLive: true },
    { id: 2, title: 'Football Transfer News', participants: 567, community: 'Sports Arena', isLive: true },
    { id: 3, title: 'Lagos Hangout Vibes', participants: 234, community: 'Open Mic', isLive: false },
    { id: 4, title: 'Investment Opportunities', participants: 189, community: 'Business Hub', isLive: true },
  ]

  const getIntentColor = (intent) => {
    switch (intent) {
      case 'Business': return { bg: 'bg-blue-100', text: 'text-blue-700' }
      case 'Dating': return { bg: 'bg-pink-100', text: 'text-pink-700' }
      case 'Networking': return { bg: 'bg-purple-100', text: 'text-purple-700' }
      case 'Learning': return { bg: 'bg-green-100', text: 'text-green-700' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-700' }
    }
  }

  const getThumbnailBg = (type) => {
    switch (type) {
      case 'business': return 'bg-gradient-to-br from-blue-400 to-blue-600'
      case 'dating': return 'bg-gradient-to-br from-pink-400 to-rose-500'
      case 'education': return 'bg-gradient-to-br from-green-400 to-emerald-600'
      case 'sports': return 'bg-gradient-to-br from-orange-400 to-red-500'
      default: return 'bg-gradient-to-br from-gray-400 to-gray-600'
    }
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Live Now Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 live-indicator"></span>
              <h2 className="text-lg font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Live Now</h2>
            </div>
            <Link href="/live" className="m3-text-button text-sm">See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {liveNow.map((live) => (
              <Link key={live.id} href={`/live/room/${live.id}`} className="flex-shrink-0 w-44">
                <div className="m3-card p-0 overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`h-24 ${getThumbnailBg(live.thumbnail)} relative`}>
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-white live-indicator"></span>
                      LIVE
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                      {live.viewers} watching
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm line-clamp-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{live.title}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>{live.host}</p>
                    <p className="text-xs" style={{ color: 'var(--primary)' }}>{live.community}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Suggested People Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Suggested for You</h2>
            <Link href="/discover" className="m3-text-button text-sm">See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {suggestedPeople.map((person) => {
              const intentColor = getIntentColor(person.intent)
              return (
                <Link key={person.id} href={`/user/${person.id}`} className="flex-shrink-0 w-36">
                  <div className="m3-card text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 text-xl font-medium relative">
                      {person.avatar}
                      {person.verified && (
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                          <span className="material-symbols-outlined text-sm" style={{ color: 'var(--primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-sm mt-2 line-clamp-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{person.name}</p>
                    <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{person.role}</p>
                    <div className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs ${intentColor.bg} ${intentColor.text}`}>
                      {person.intent}
                    </div>
                    <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>{person.mutual} mutual</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl" style={{ color: 'var(--primary)' }}>event</span>
              <h2 className="text-lg font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Upcoming Events</h2>
            </div>
            <Link href="/events" className="m3-text-button text-sm">See all</Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="m3-card flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--primary-container)' }}>
                    <span className="text-xs font-medium" style={{ color: 'var(--primary)' }}>{event.date.split(',')[0].split(' ')[0]}</span>
                    <span className="text-lg font-bold" style={{ color: 'var(--primary)', fontFamily: 'Google Sans, sans-serif' }}>{event.date.split(',')[0].split(' ')[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium line-clamp-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{event.title}</p>
                    <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{event.date.split(',')[1]}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs" style={{ color: 'var(--primary)' }}>{event.community}</span>
                      <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{event.attendees} attending</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)' }}>chevron_right</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Rooms Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl" style={{ color: 'var(--warning)' }}>trending_up</span>
              <h2 className="text-lg font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Trending Rooms</h2>
            </div>
            <Link href="/live" className="m3-text-button text-sm">See all</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {trendingRooms.map((room) => (
              <Link key={room.id} href={`/live/room/${room.id}`}>
                <div className="m3-card hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    {room.isLive ? (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 live-indicator"></span>
                        Live
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--surface-container-high)', color: 'var(--on-surface-variant)' }}>Scheduled</span>
                    )}
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                      <span className="material-symbols-outlined text-sm">group</span>
                      {room.participants}
                    </span>
                  </div>
                  <p className="font-medium text-sm line-clamp-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>{room.title}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--primary)' }}>{room.community}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
