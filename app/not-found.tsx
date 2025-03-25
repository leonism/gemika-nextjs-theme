import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Suspense } from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      <div className="space-y-6 max-w-md">
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-6">
          <Button asChild variant="default" size="lg">
            <Link href="/" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
