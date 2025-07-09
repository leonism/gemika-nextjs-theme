import { Suspense } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-6">
          <Button asChild variant="default" size="lg">
            <Link
              href="/"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
