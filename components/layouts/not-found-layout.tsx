import type { ReactNode } from 'react';

import Link from 'next/link';

import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

interface NotFoundLayoutProps {
  children?: ReactNode;
  title?: string;
  message?: string;
  image?: ReactNode;
  searchBar?: ReactNode;
}

export function NotFoundLayout({
  children,
  title = '404 - Page Not Found',
  message = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
  image,
  searchBar,
}: NotFoundLayoutProps) {
  return (
    <Container>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-6xl font-bold text-transparent dark:from-gray-100 dark:to-gray-400">
          {title}
        </h1>

        {image && <div className="my-8">{image}</div>}

        <p className="mb-8 max-w-md text-gray-600 dark:text-gray-400">
          {message}
        </p>

        {searchBar ? (
          <div className="mb-8 w-full max-w-md">{searchBar}</div>
        ) : (
          <div className="mb-8 w-full max-w-md">
            <div className="flex">
              <input
                type="search"
                placeholder="Search for content..."
                className="flex-1 rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700"
              />
              <Button className="rounded-l-none">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            <Button asChild variant="outline">
              <Link href="/">Go to homepage</Link>
            </Button>
          </div>
        )}

        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>

        {children}
      </div>
    </Container>
  );
}
