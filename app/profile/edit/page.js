'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function EditProfile() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Passionate about technology and connecting with new people. Building the future one line of code at a time. Always eager to learn and share knowledge.',
    location: 'Lagos, Nigeria',
    website: 'johndoe.com',
    relationshipIntent: 'Business',
  })

  const [interests, setInterests] = useState(['Tech', 'Business', 'Learning', 'Networking', 'Football'])
  const [newInterest, setNewInterest] = useState('')

  const intentOptions = ['Business', 'Friendship', 'Dating', 'Networking', 'Learning']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests(prev => [...prev, newInterest.trim()])
      setNewInterest('')
    }
  }

  const removeInterest = (interest) => {
    setInterests(prev => prev.filter(i => i !== interest))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would save to an API
    router.push('/profile')
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b flex items-center gap-4 px-4 py-3" style={{ borderColor: 'var(--outline)' }}>
          <Link href="/profile" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-xl font-medium flex-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Edit Profile</h1>
          <button
            onClick={handleSubmit}
            className="m3-filled-button text-sm px-4 py-2"
          >
            Save
          </button>
        </div>

        {/* Avatar Section */}
        <div className="p-6 flex flex-col items-center border-b" style={{ borderColor: 'var(--outline)' }}>
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-blue-800 text-3xl font-medium border-4 border-white shadow-lg">
              JD
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors">
              <span className="material-symbols-outlined text-lg">photo_camera</span>
            </button>
          </div>
          <button className="mt-3 text-sm font-medium" style={{ color: 'var(--primary)' }}>
            Change Photo
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
              Display Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              style={{ borderColor: 'var(--outline)' }}
              placeholder="Your display name"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">@</span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                style={{ borderColor: 'var(--outline)' }}
                placeholder="username"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              style={{ borderColor: 'var(--outline)' }}
              placeholder="Tell others about yourself"
            />
            <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)' }}>
              {formData.bio.length}/280 characters
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
              Location
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">location_on</span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                style={{ borderColor: 'var(--outline)' }}
                placeholder="Your location"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
              Website
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">link</span>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                style={{ borderColor: 'var(--outline)' }}
                placeholder="yourwebsite.com"
              />
            </div>
          </div>

          {/* Relationship Intent */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
              What are you looking for?
            </label>
            <div className="flex flex-wrap gap-2">
              {intentOptions.map((intent) => (
                <button
                  key={intent}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, relationshipIntent: intent }))}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.relationshipIntent === intent
                      ? 'bg-blue-600 text-white'
                      : 'border hover:bg-gray-50'
                  }`}
                  style={formData.relationshipIntent !== intent ? { borderColor: 'var(--outline)' } : {}}
                >
                  {intent}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
              Interests
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="m3-chip flex items-center gap-1 pr-2"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="ml-1 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                className="flex-1 px-4 py-2 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                style={{ borderColor: 'var(--outline)' }}
                placeholder="Add an interest"
              />
              <button
                type="button"
                onClick={addInterest}
                className="m3-outlined-button px-4 py-2 text-sm"
              >
                Add
              </button>
            </div>
          </div>

          {/* Submit Button (Mobile) */}
          <div className="pt-4 pb-20">
            <button
              type="submit"
              className="w-full m3-filled-button py-3 text-base font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
