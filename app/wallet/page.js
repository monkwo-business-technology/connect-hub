'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'

export default function Wallet() {
  const [activeTab, setActiveTab] = useState('balance')
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStep, setPaymentStep] = useState('select') // select, processing, success, failed
  const [walletBalance, setWalletBalance] = useState(2450)
  const [email, setEmail] = useState('johndoe@example.com')
  const [isPaystackLoaded, setIsPaystackLoaded] = useState(false)

  const walletData = {
    balance: walletBalance,
    totalEarned: 15680,
    totalSpent: 13230,
  }

  const coinPackages = [
    { id: 1, coins: 100, price: 500, naira: '₦500', popular: false },
    { id: 2, coins: 500, price: 2000, naira: '₦2,000', popular: true },
    { id: 3, coins: 1000, price: 3500, naira: '₦3,500', popular: false },
    { id: 4, coins: 2500, price: 8000, naira: '₦8,000', popular: false },
    { id: 5, coins: 5000, price: 15000, naira: '₦15,000', popular: false },
    { id: 6, coins: 10000, price: 28000, naira: '₦28,000', popular: false },
  ]

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'received', description: 'Gift from James Okoro', amount: 50, date: '2h ago', icon: 'redeem' },
    { id: 2, type: 'sent', description: 'Sent to Chioma Eze', amount: -100, date: '5h ago', icon: 'redeem' },
    { id: 3, type: 'purchase', description: 'Coin Package (500)', amount: 500, date: 'Yesterday', icon: 'shopping_cart' },
    { id: 4, type: 'received', description: 'Gift from Amara Obi', amount: 25, date: 'Yesterday', icon: 'redeem' },
    { id: 5, type: 'boost', description: 'Profile Boost (7 days)', amount: -200, date: '2 days ago', icon: 'rocket_launch' },
    { id: 6, type: 'subscription', description: 'Premium Business Hub', amount: -150, date: '3 days ago', icon: 'card_membership' },
  ])

  const formatNumber = (num) => num.toLocaleString()

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg)
    setPaymentStep('select')
    setShowPaymentModal(true)
  }

  const generateReference = () => {
    return `CH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const handlePaystackPayment = () => {
    if (!selectedPackage || !isPaystackLoaded) return

    setPaymentStep('processing')

    const handler = window.PaystackPop.setup({
      key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Replace with your Paystack public key
      email: email,
      amount: selectedPackage.price * 100, // Paystack expects amount in kobo
      currency: 'NGN',
      ref: generateReference(),
      metadata: {
        custom_fields: [
          {
            display_name: 'Coin Package',
            variable_name: 'coin_package',
            value: `${selectedPackage.coins} coins`
          }
        ]
      },
      callback: function(response) {
        // Payment successful
        console.log('Payment successful:', response)
        handlePaymentSuccess(response)
      },
      onClose: function() {
        // User closed the payment modal
        if (paymentStep === 'processing') {
          setPaymentStep('select')
        }
      }
    })

    handler.openIframe()
  }

  const handlePaymentSuccess = (response) => {
    // Update wallet balance
    setWalletBalance(prev => prev + selectedPackage.coins)

    // Add transaction to history
    const newTransaction = {
      id: Date.now(),
      type: 'purchase',
      description: `Coin Package (${formatNumber(selectedPackage.coins)})`,
      amount: selectedPackage.coins,
      date: 'Just now',
      icon: 'shopping_cart',
      reference: response.reference
    }
    setTransactions(prev => [newTransaction, ...prev])

    setPaymentStep('success')
  }

  const closeModal = () => {
    setShowPaymentModal(false)
    setSelectedPackage(null)
    setPaymentStep('select')
  }

  return (
    <>
      {/* Paystack Script */}
      <Script
        src="https://js.paystack.co/v1/inline.js"
        onLoad={() => setIsPaystackLoaded(true)}
      />

      <main className="min-h-screen">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="p-4">
            <h1 className="text-2xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Wallet</h1>
          </div>

          {/* Balance Card */}
          <div className="px-4 mb-6">
            <div className="m3-card bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6">
              <p className="text-sm opacity-75">Current Balance</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-3xl text-yellow-300">toll</span>
                <span className="text-4xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{formatNumber(walletData.balance)}</span>
              </div>
              <div className="flex gap-6 mt-4">
                <div>
                  <p className="text-xs opacity-75">Total Earned</p>
                  <p className="font-medium">{formatNumber(walletData.totalEarned)}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75">Total Spent</p>
                  <p className="font-medium">{formatNumber(walletData.totalSpent)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 border-b" style={{ borderColor: 'var(--outline)' }}>
            <div className="flex">
              <button
                onClick={() => setActiveTab('balance')}
                className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
                  activeTab === 'balance' ? 'text-blue-600' : 'text-gray-500'
                }`}
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Top Up
                {activeTab === 'balance' && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full bg-blue-600"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-3 text-sm font-medium relative transition-colors ${
                  activeTab === 'history' ? 'text-blue-600' : 'text-gray-500'
                }`}
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                History
                {activeTab === 'history' && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full bg-blue-600"></span>
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'balance' && (
              <div>
                <h2 className="font-medium mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>Buy Coins</h2>
                <div className="grid grid-cols-2 gap-3">
                  {coinPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => handlePackageSelect(pkg)}
                      className={`m3-card text-center relative hover:shadow-md transition-all active:scale-95 ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                          Popular
                        </span>
                      )}
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <span className="material-symbols-outlined text-2xl text-yellow-500">toll</span>
                        <span className="text-xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{formatNumber(pkg.coins)}</span>
                      </div>
                      <p className="text-lg font-medium" style={{ color: 'var(--primary)' }}>{pkg.naira}</p>
                    </button>
                  ))}
                </div>

                {/* Payment Methods Info */}
                <div className="mt-6 p-4 rounded-2xl" style={{ backgroundColor: 'var(--surface-container)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>verified_user</span>
                    <span className="text-sm font-medium">Secure Payment via Paystack</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white">
                      <svg className="h-5" viewBox="0 0 50 50" fill="none">
                        <rect width="50" height="50" rx="8" fill="#0BA4DB"/>
                        <path d="M15 25h20M25 15v20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      <span className="text-xs font-medium">Card</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white">
                      <svg className="h-5" viewBox="0 0 50 50" fill="none">
                        <rect width="50" height="50" rx="8" fill="#E41E26"/>
                        <circle cx="25" cy="25" r="12" fill="white"/>
                      </svg>
                      <span className="text-xs font-medium">Bank</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white">
                      <svg className="h-5" viewBox="0 0 50 50" fill="none">
                        <rect width="50" height="50" rx="8" fill="#00C853"/>
                        <path d="M15 25h20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      <span className="text-xs font-medium">USSD</span>
                    </div>
                  </div>
                </div>

                {/* What can you do with coins */}
                <div className="mt-8">
                  <h2 className="font-medium mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>What can you do with coins?</h2>
                  <div className="space-y-3">
                    <div className="m3-card flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-pink-100">
                        <span className="material-symbols-outlined text-pink-500">redeem</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Send Gifts</p>
                        <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>Show appreciation to hosts and creators</p>
                      </div>
                    </div>
                    <div className="m3-card flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100">
                        <span className="material-symbols-outlined text-blue-500">rocket_launch</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Boost Profile</p>
                        <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>Get more visibility in communities</p>
                      </div>
                    </div>
                    <div className="m3-card flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100">
                        <span className="material-symbols-outlined text-green-500">card_membership</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Premium Access</p>
                        <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>Unlock exclusive communities and features</p>
                      </div>
                    </div>
                    <div className="m3-card flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100">
                        <span className="material-symbols-outlined text-purple-500">confirmation_number</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>Event Tickets</p>
                        <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>Join paid events and workshops</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="font-medium mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>Transaction History</h2>
                <div className="space-y-2">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="m3-card flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.amount > 0 ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
                      }`}>
                        <span className="material-symbols-outlined text-xl">{tx.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm" style={{ fontFamily: 'Google Sans, sans-serif' }}>{tx.description}</p>
                        <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>{tx.date}</p>
                      </div>
                      <div className={`font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.amount > 0 ? '+' : ''}{formatNumber(tx.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {showPaymentModal && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={paymentStep !== 'processing' ? closeModal : undefined}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center justify-between z-10" style={{ borderColor: 'var(--outline)' }}>
              <h2 className="text-lg font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                {paymentStep === 'success' ? 'Payment Successful' : paymentStep === 'failed' ? 'Payment Failed' : 'Complete Purchase'}
              </h2>
              {paymentStep !== 'processing' && (
                <button onClick={closeModal} className="p-2 -mr-2 rounded-full hover:bg-gray-100">
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {paymentStep === 'select' && (
                <>
                  {/* Package Summary */}
                  <div className="text-center mb-6 p-6 rounded-2xl" style={{ backgroundColor: 'var(--surface-container)' }}>
                    <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-3xl text-yellow-600">toll</span>
                    </div>
                    <p className="text-3xl font-medium mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      {formatNumber(selectedPackage.coins)} Coins
                    </p>
                    <p className="text-2xl font-medium" style={{ color: 'var(--primary)' }}>
                      {selectedPackage.naira}
                    </p>
                  </div>

                  {/* Email Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--on-surface)' }}>
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{ borderColor: 'var(--outline)' }}
                        placeholder="Enter your email"
                      />
                    </div>
                    <p className="text-xs mt-2" style={{ color: 'var(--on-surface-variant)' }}>
                      Receipt will be sent to this email
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div className="mb-6 p-4 rounded-xl border" style={{ borderColor: 'var(--outline)' }}>
                    <h3 className="font-medium mb-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--on-surface-variant)' }}>Coin Package</span>
                        <span>{formatNumber(selectedPackage.coins)} coins</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--on-surface-variant)' }}>Price</span>
                        <span>{selectedPackage.naira}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--on-surface-variant)' }}>Transaction Fee</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-medium" style={{ borderColor: 'var(--outline)' }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--primary)' }}>{selectedPackage.naira}</span>
                      </div>
                    </div>
                  </div>

                  {/* Paystack Button */}
                  <button
                    onClick={handlePaystackPayment}
                    disabled={!email || !isPaystackLoaded}
                    className="w-full py-4 rounded-xl font-medium text-white flex items-center justify-center gap-3 disabled:opacity-50 transition-all active:scale-[0.98]"
                    style={{ backgroundColor: '#0BA4DB' }}
                  >
                    <svg className="h-6" viewBox="0 0 100 24" fill="white">
                      <path d="M10 2h4v20h-4V2zm8 4h4v16h-4V6zm8-4h4v20h-4V2zm8 8h4v12h-4V10zm8-6h4v18h-4V4z"/>
                    </svg>
                    <span>Pay with Paystack</span>
                  </button>

                  {/* Security Note */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                    <span className="material-symbols-outlined text-sm">lock</span>
                    <span>Secured by Paystack. Your payment info is safe.</span>
                  </div>
                </>
              )}

              {paymentStep === 'processing' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--primary-container)' }}>
                    <span className="material-symbols-outlined text-3xl animate-spin" style={{ color: 'var(--primary)' }}>progress_activity</span>
                  </div>
                  <p className="text-lg font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Processing Payment</p>
                  <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>Please complete the payment in the Paystack window...</p>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--success-container)' }}>
                    <span className="material-symbols-outlined text-4xl" style={{ color: 'var(--success)', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                  <p className="text-xl font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Payment Successful!</p>
                  <p className="text-sm mb-6" style={{ color: 'var(--on-surface-variant)' }}>
                    {formatNumber(selectedPackage.coins)} coins have been added to your wallet
                  </p>

                  {/* New Balance */}
                  <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: 'var(--surface-container)' }}>
                    <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>New Balance</p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="material-symbols-outlined text-2xl text-yellow-500">toll</span>
                      <span className="text-3xl font-medium" style={{ fontFamily: 'Google Sans, sans-serif' }}>{formatNumber(walletBalance)}</span>
                    </div>
                  </div>

                  <button
                    onClick={closeModal}
                    className="w-full m3-filled-button py-3.5 text-base font-medium"
                  >
                    Done
                  </button>
                </div>
              )}

              {paymentStep === 'failed' && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--error-container)' }}>
                    <span className="material-symbols-outlined text-4xl" style={{ color: 'var(--error)' }}>error</span>
                  </div>
                  <p className="text-xl font-medium mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>Payment Failed</p>
                  <p className="text-sm mb-6" style={{ color: 'var(--on-surface-variant)' }}>
                    Something went wrong. Please try again.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => setPaymentStep('select')}
                      className="w-full m3-filled-button py-3.5 text-base font-medium"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-full m3-outlined-button py-3.5 text-base font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Safe Area */}
            <div className="h-6"></div>
          </div>
        </div>
      )}
    </>
  )
}
