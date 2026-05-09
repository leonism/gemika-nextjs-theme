'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import clsx from 'clsx'

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      const consent = window.localStorage.getItem('cookie_consent')
      if (!consent) {
        setIsOpen(true)
        // Trigger animation slightly after mounting
        setTimeout(() => setMounted(true), 50)
      }
    }
  }, [])

  const handleAccept = () => {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      window.localStorage.setItem('cookie_consent', 'accepted')
    }
    setIsOpen(false)
  }

  const handleReject = () => {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      window.localStorage.setItem('cookie_consent', 'rejected')
    }
    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={clsx(
        'fixed bottom-4 left-1/2 z-50 w-[95%] max-w-xl -translate-x-1/2 transition-all duration-500',
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      )}
    >
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        {/* Text and close button row */}
        <div className="flex items-start justify-between gap-2">
          <p className="flex-1 text-sm text-gray-700 dark:text-gray-300">
            This website uses cookies to ensure you get the best experience. By continuing to use
            our site, you accept our use of cookies.
          </p>
          <button
            onClick={handleClose}
            className="shrink-0 rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            aria-label="Close cookie consent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={handleAccept}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 sm:w-auto"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="w-full rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:w-auto"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}
