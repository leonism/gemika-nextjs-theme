'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { SearchIcon, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Close any open mobile menu by setting body overflow back to normal
      document.body.style.overflow = '';
      // Close the search
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      // Open search on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      {!isOpen ? (
        // Use a div instead of Button component to avoid nesting buttons
        <div
          onClick={() => setIsOpen(true)}
          className="flex cursor-pointer items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Search"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(true);
            }
          }}
        >
          <SearchIcon className="h-5 w-5" />
        </div>
      ) : (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <form
            ref={searchFormRef}
            onSubmit={handleSearch}
            onClick={(e) => e.stopPropagation()}
            className="mx-4 w-full max-w-lg scale-100 transform rounded-xl bg-white p-4 shadow-xl transition-transform dark:bg-gray-800"
          >
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="Search and Press Enter"
                className="flex-grow pr-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <div
                className="absolute right-0 top-0 flex h-full cursor-pointer items-center justify-center px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
