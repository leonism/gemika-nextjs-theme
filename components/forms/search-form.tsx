"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { debounce } from "@/lib/utils"

interface SearchFormProps {
  placeholder?: string
  instant?: boolean
  className?: string
}

export function SearchForm({ placeholder = "Search for content...", instant = false, className }: SearchFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)

  // Debounced search function for instant search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value) {
        router.push(`/search?q=${encodeURIComponent(value)}`)
      }
    }, 500),
    [router],
  )

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (instant && value) {
      debouncedSearch(value)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  // Update local state when URL query changes
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        <Input type="search" placeholder={placeholder} value={query} onChange={handleChange} className="pr-10" />
        <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  )
}

