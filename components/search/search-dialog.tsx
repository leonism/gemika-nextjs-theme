'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowRight, FaSearch, FaTimes } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface SearchResult {
  id: string
  type: string
  url: string
  frontmatter: {
    title: string
    excerpt: string
  }
}

export function SearchDialog() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dialog
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
      // Open search on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 2) {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
          if (!response.ok) {
            throw new Error('Search request failed')
          }
          const data = await response.json()
          setResults(data)
        } catch (error) {
          console.error('Search error:', error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
      }
    }

    const timeoutId = setTimeout(() => {
      fetchResults()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  const handleResultClick = (item: SearchResult) => {
    router.push(item.url)
    setIsOpen(false)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        aria-label="Open search"
      >
        <FaSearch className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div
            ref={dialogRef}
            className={cn(
              'mt-20 w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80',
              'duration-200 animate-in fade-in-75 slide-in-from-left-8'
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
          >
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search posts and projects..."
                  className="w-full rounded-t-xl border-0 p-4 pr-24 text-base focus:outline-none"
                  aria-label="Search query"
                  autoComplete="off"
                />
                <div className="absolute right-2 top-2 flex space-x-1">
                  <Button type="submit" size="sm" className="px-6 py-3" disabled={query.length < 2}>
                    <span className="mr-1">Go</span>
                    <FaArrowRight className="h-3 w-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500"
                    aria-label="Close search"
                  >
                    <FaTimes className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>

            <div className="max-h-[60vh] overflow-y-auto">
              {isLoading ? (
                <div className="space-y-4 p-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {results.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleResultClick(item)}
                      className="w-full cursor-pointer p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      aria-label={`Open ${item.frontmatter.title}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            {item.frontmatter.title}
                          </h3>
                          <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                            {item.frontmatter.excerpt}
                          </p>
                        </div>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                          {item.type}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : query.length > 2 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No results found for "{query}"</p>
                  <Button
                    onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
                    className="mt-3 inline-flex items-center rounded-full bg-linear-to-r from-indigo-600 to-emerald-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-emerald-700 hover:shadow-lg"
                    size="sm"
                  >
                    View all search results
                  </Button>
                </div>
              ) : query.length > 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Type at least 3 characters to search
                  </p>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">Start typing to search</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
