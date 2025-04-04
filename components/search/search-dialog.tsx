"use client"

import { useState, useEffect, useRef } from "react"
import { SearchIcon, X, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string;
  type: string;
  url: string;
  frontmatter: {
    title: string;
    excerpt: string;
  };
}

export function SearchDialog() {
  const [query, setQuery] = useState("")
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
      if (e.key === "Escape") {
        setIsOpen(false)
      }
      // Open search on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
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
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        aria-label="Open search"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 backdrop-blur-sm">
          <div
            ref={dialogRef}
            className={cn(
              "bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-xl mt-20 overflow-hidden border border-gray-200 dark:border-gray-700",
              "animate-in slide-in-from-left-8 fade-in-75 duration-200"
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
                  className="w-full p-4 pr-24 rounded-t-xl focus:outline-none border-0 text-base"
                  aria-label="Search query"
                  autoComplete="off"
                />
                <div className="absolute right-2 top-2 flex space-x-1">
                  <Button
                    type="submit"
                    size="sm"
                    className="px-3 py-1"
                    disabled={query.length < 2}
                  >
                    <span className="mr-1">Go</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </form>

            <div className="max-h-[60vh] overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {results.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleResultClick(item)}
                      className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                      aria-label={`Open ${item.frontmatter.title}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            {item.frontmatter.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                            {item.frontmatter.excerpt}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
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
                    className="mt-3"
                    size="sm"
                    variant="outline"
                  >
                    View all search results
                  </Button>
                </div>
              ) : query.length > 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">Type at least 3 characters to search</p>
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
