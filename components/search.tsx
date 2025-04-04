"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useClickAway } from "@/hooks/use-click-away"

export function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  useClickAway(searchRef as React.RefObject<HTMLElement>, () => {
    if (isOpen) setIsOpen(false)
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

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

  return (
    <div ref={searchRef} className="relative">
      {!isOpen ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="text-gray-600 dark:text-gray-400"
          aria-label="Search"
        >
          <SearchIcon className="h-5 w-5" />
        </Button>
      ) : (
        <div className="absolute right-0 top-0 w-full sm:w-72 transition-all duration-300 ease-in-out">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Input
              type="search"
              placeholder="Search and Press Enter"
              className="flex-grow pr-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-10 top-0 h-full"
              aria-label="Go"
            >
              Go
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
