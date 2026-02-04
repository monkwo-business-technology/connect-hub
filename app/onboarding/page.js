'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedPurpose, setSelectedPurpose] = useState([])
  const [selectedInterests, setSelectedInterests] = useState([])

  const purposes = [
    { id: 'dating', label: 'Dating', icon: 'favorite', description: 'Find meaningful connections' },
    { id: 'business', label: 'Business', icon: 'business_center', description: 'Network and grow' },
    { id: 'learning', label: 'Learning', icon: 'school', description: 'Gain new skills' },
    { id: 'networking', label: 'Networking', icon: 'hub', description: 'Meet professionals' },
    { id: 'social', label: 'Just Social', icon: 'groups', description: 'Hang out and chat' },
  ]

  const interests = [
    { id: 'tech', label: 'Technology', icon: 'code' },
    { id: 'football', label: 'Football', icon: 'sports_soccer' },
    { id: 'fashion', label: 'Fashion', icon: 'checkroom' },
    { id: 'realestate', label: 'Real Estate', icon: 'home_work' },
    { id: 'music', label: 'Music', icon: 'music_note' },
    { id: 'travel', label: 'Travel', icon: 'flight' },
    { id: 'gaming', label: 'Gaming', icon: 'sports_esports' },
    { id: 'fitness', label: 'Fitness', icon: 'fitness_center' },
    { id: 'food', label: 'Food & Dining', icon: 'restaurant' },
    { id: 'art', label: 'Art & Design', icon: 'palette' },
    { id: 'finance', label: 'Finance', icon: 'trending_up' },
    { id: 'movies', label: 'Movies & TV', icon: 'movie' },
  ]

  const togglePurpose = (id) => {
    setSelectedPurpose(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const toggleInterest = (id) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleContinue = () => {
    if (step === 1 && selectedPurpose.length > 0) {
      setStep(2)
    } else if (step === 2 && selectedInterests.length >= 3) {
      router.push('/')
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Progress */}
      <div className="p-4 pt-6">
        <div className="flex gap-2 mb-2">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
        </div>
        <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>Step {step} of 2</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              Why are you here?
            </h1>
            <p className="text-sm mb-6" style={{ color: 'var(--on-surface-variant)' }}>
              Select all that apply. This helps us personalize your experience.
            </p>

            <div className="space-y-3">
              {purposes.map((purpose) => (
                <button
                  key={purpose.id}
                  onClick={() => togglePurpose(purpose.id)}
                  className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                    selectedPurpose.includes(purpose.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedPurpose.includes(purpose.id) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <span className="material-symbols-outlined text-2xl">{purpose.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{purpose.label}</p>
                    <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>{purpose.description}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPurpose.includes(purpose.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  }`}>
                    {selectedPurpose.includes(purpose.id) && (
                      <span className="material-symbols-outlined text-white text-sm">check</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-2xl font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              What are you into?
            </h1>
            <p className="text-sm mb-6" style={{ color: 'var(--on-surface-variant)' }}>
              Select at least 3 interests. This helps us show you relevant content.
            </p>

            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full border-2 transition-all ${
                    selectedInterests.includes(interest.id)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <span className={`material-symbols-outlined text-xl ${
                    selectedInterests.includes(interest.id) ? 'text-blue-500' : 'text-gray-500'
                  }`}>{interest.icon}</span>
                  <span className="font-medium text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>{interest.label}</span>
                </button>
              ))}
            </div>

            {selectedInterests.length > 0 && (
              <p className="mt-4 text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                {selectedInterests.length} selected {selectedInterests.length < 3 && `(${3 - selectedInterests.length} more needed)`}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--outline)' }}>
        <button
          onClick={handleContinue}
          disabled={(step === 1 && selectedPurpose.length === 0) || (step === 2 && selectedInterests.length < 3)}
          className={`w-full py-4 rounded-full font-medium text-lg transition-all ${
            (step === 1 && selectedPurpose.length > 0) || (step === 2 && selectedInterests.length >= 3)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
          style={{ fontFamily: 'Google Sans, sans-serif' }}
        >
          {step === 2 ? 'Get Started' : 'Continue'}
        </button>

        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="w-full mt-3 py-2 text-sm font-medium"
            style={{ color: 'var(--primary)' }}
          >
            Back
          </button>
        )}
      </div>
    </main>
  )
}
