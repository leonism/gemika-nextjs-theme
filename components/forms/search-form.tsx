'use client'

import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { debounce } from '@/lib/utils'

interface SearchFormProps {
  placeholder?: string
  instant?: boolean
  className?: string
}

export function SearchForm({
  placeholder = 'Search for content...',
  instant = false,
  className,
}: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  // Debounced search function for instant search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value) {
        router.push(`/search?q=${encodeURIComponent(value)}`)
      }
    }, 500),
    [router]
  )

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setQuery(value)

      if (instant && value) {
        debouncedSearch(value)
      }
    },
    [instant, debouncedSearch]
  )

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query)}`)
      }
    },
    [query, router]
  )

  // Sync query when searchParams change
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          className="pr-10"
        />
        <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  )
}
