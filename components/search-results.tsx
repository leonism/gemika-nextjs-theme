"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import type { SearchResult } from "@/types/search"

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchResults() {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (!response.ok) {
          throw new Error("Failed to fetch search results")
        }
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error("Error searching content:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (query) {
      fetchResults()
    }
  }, [query])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-2">No results found</h2>
        <p className="text-gray-600 dark:text-gray-400">
          We couldn't find any content matching "{query}". Try different keywords or browse our content.
        </p>
        <div className="mt-6">
          <Link href="/posts" className="text-primary hover:underline mr-4">
            Browse all posts
          </Link>
          <Link href="/projects" className="text-primary hover:underline">
            View projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {results.map((result) => (
        <div key={result.id} className="border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {result.type === "Blog Post" && (
              <div className="w-full md:w-1/4">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image src="/placeholder.svg" alt={result.title} fill className="object-cover" />
                </div>
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {result.type} • {formatDate(result.date)}
              </p>
              <h2 className="text-xl font-semibold mb-2">
                <Link href={result.url} className="hover:text-primary transition-colors">
                  {result.title}
                </Link>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{result.excerpt}</p>
              <Link href={result.url} className="mt-2 inline-block text-primary hover:underline">
                Read more →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

