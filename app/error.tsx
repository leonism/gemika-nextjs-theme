'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      <div className="space-y-6 max-w-md">
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
          Error
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Something went wrong!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="flex gap-4 justify-center pt-6">
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
  );
}
