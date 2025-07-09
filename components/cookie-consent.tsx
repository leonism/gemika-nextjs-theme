'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react' // Import X icon for close button

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    // Only show if consent has not been given (neither accepted nor rejected)
    if (!consent) {
      setIsOpen(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setIsOpen(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected')
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) {
    return null // Don't render if not open
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-between space-x-4 border border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">
        This website uses cookies to ensure you get the best experience. By continuing to use our
        site, you accept our use of cookies.
      </p>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleAccept}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Reject
        </button>
        <button
          onClick={handleClose}
          className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
          aria-label="Close cookie consent"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
