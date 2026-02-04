'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function StartLive() {
  const router = useRouter()
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)
  const [cameraError, setCameraError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isStarting, setIsStarting] = useState(false)

  const [liveSettings, setLiveSettings] = useState({
    title: '',
    community: '',
    description: '',
    allowGifts: true,
    allowComments: true,
  })

  const communities = [
    { id: 1, name: 'Business Hub', icon: 'business_center' },
    { id: 2, name: 'Education Corner', icon: 'school' },
    { id: 3, name: 'Sports Arena', icon: 'sports_soccer' },
    { id: 4, name: 'Entertainment', icon: 'movie' },
    { id: 5, name: 'Tech Talk', icon: 'code' },
  ]

  // Initialize camera on mount
  useEffect(() => {
    startCamera()

    // Cleanup on unmount
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    setIsLoading(true)
    setCameraError(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user', // Front camera
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: true,
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Camera access error:', error)
      setIsLoading(false)

      if (error.name === 'NotAllowedError') {
        setCameraError('Camera access denied. Please allow camera access in your browser settings.')
      } else if (error.name === 'NotFoundError') {
        setCameraError('No camera found. Please connect a camera and try again.')
      } else {
        setCameraError('Unable to access camera. Please check your device settings.')
      }
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const toggleCamera = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setCameraEnabled(videoTrack.enabled)
      }
    }
  }

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setMicEnabled(audioTrack.enabled)
      }
    }
  }

  const switchCamera = async () => {
    stopCamera()

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraEnabled ? 'environment' : 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: true,
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error('Camera switch error:', error)
      // Try to restore original camera
      startCamera()
    }
  }

  const handleStartLive = () => {
    if (!liveSettings.title.trim()) {
      alert('Please enter a title for your live stream')
      return
    }

    setIsStarting(true)

    // Simulate starting the live stream
    setTimeout(() => {
      // In a real app, this would connect to a streaming service
      router.push('/live/room/new?host=true')
    }, 2000)
  }

  const handleCancel = () => {
    stopCamera()
    router.back()
  }

  return (
    <main className="min-h-screen bg-black relative">
      {/* Camera Preview */}
      <div className="absolute inset-0">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-sm">Initializing camera...</p>
            </div>
          </div>
        ) : cameraError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 p-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-4xl text-red-400">videocam_off</span>
              </div>
              <p className="text-white font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Camera Access Required</p>
              <p className="text-gray-400 text-sm mb-4">{cameraError}</p>
              <button
                onClick={startCamera}
                className="px-6 py-3 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: 'var(--primary)', fontFamily: 'Google Sans, sans-serif' }}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }} // Mirror for front camera
          />
        )}

        {/* Camera off overlay */}
        {!cameraEnabled && !cameraError && !isLoading && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-6xl text-gray-500 mb-2">videocam_off</span>
              <p className="text-gray-400 text-sm">Camera is off</p>
            </div>
          </div>
        )}
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={handleCancel}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <h1 className="text-white font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Go Live</h1>

          <button
            onClick={switchCamera}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
            disabled={!!cameraError || isLoading}
          >
            <span className="material-symbols-outlined">cameraswitch</span>
          </button>
        </div>
      </div>

      {/* Camera Controls */}
      <div className="absolute bottom-48 left-0 right-0 flex justify-center gap-4 z-10">
        <button
          onClick={toggleMic}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
            micEnabled ? 'bg-white/20 backdrop-blur-sm text-white' : 'bg-red-500 text-white'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">
            {micEnabled ? 'mic' : 'mic_off'}
          </span>
        </button>

        <button
          onClick={toggleCamera}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
            cameraEnabled ? 'bg-white/20 backdrop-blur-sm text-white' : 'bg-red-500 text-white'
          }`}
          disabled={!!cameraError || isLoading}
        >
          <span className="material-symbols-outlined text-2xl">
            {cameraEnabled ? 'videocam' : 'videocam_off'}
          </span>
        </button>
      </div>

      {/* Bottom Sheet - Live Settings */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-10" style={{ maxHeight: '45%' }}>
        <div className="p-4">
          {/* Handle */}
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>

          {/* Title Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Add a title for your live..."
              value={liveSettings.title}
              onChange={(e) => setLiveSettings(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
              style={{ backgroundColor: 'var(--surface-container)', fontFamily: 'Google Sans, sans-serif' }}
              maxLength={100}
            />
          </div>

          {/* Community Selector */}
          <div className="mb-4">
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--on-surface-variant)', fontFamily: 'Google Sans, sans-serif' }}>
              Select Community
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {communities.map((community) => (
                <button
                  key={community.id}
                  onClick={() => setLiveSettings(prev => ({ ...prev, community: community.name }))}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    liveSettings.community === community.name
                      ? 'text-white'
                      : 'border hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: liveSettings.community === community.name ? 'var(--primary)' : 'transparent',
                    borderColor: liveSettings.community !== community.name ? 'var(--outline)' : 'transparent',
                    fontFamily: 'Google Sans, sans-serif'
                  }}
                >
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {community.icon}
                  </span>
                  {community.name}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={liveSettings.allowGifts}
                onChange={(e) => setLiveSettings(prev => ({ ...prev, allowGifts: e.target.checked }))}
                className="w-5 h-5 rounded accent-blue-600"
              />
              <span className="text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>Allow Gifts</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={liveSettings.allowComments}
                onChange={(e) => setLiveSettings(prev => ({ ...prev, allowComments: e.target.checked }))}
                className="w-5 h-5 rounded accent-blue-600"
              />
              <span className="text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>Allow Comments</span>
            </label>
          </div>

          {/* Go Live Button */}
          <button
            onClick={handleStartLive}
            disabled={isStarting || !!cameraError || isLoading}
            className="w-full py-4 rounded-full text-white font-medium text-base transition-all active:scale-98 disabled:opacity-50"
            style={{ backgroundColor: 'var(--primary)', fontFamily: 'Google Sans, sans-serif' }}
          >
            {isStarting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Starting Live...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  wifi_tethering
                </span>
                Go Live
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Starting Live Overlay */}
      {isStarting && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="material-symbols-outlined text-4xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                wifi_tethering
              </span>
            </div>
            <p className="text-white text-xl font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              Going Live...
            </p>
            <p className="text-gray-400 text-sm">Preparing your broadcast</p>
          </div>
        </div>
      )}
    </main>
  )
}
