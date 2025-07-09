'use client'

import { useEffect } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
          Error
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Something went wrong!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="flex justify-center gap-4 pt-6">
          <Button
            onClick={() => reset()}
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            Try Again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
