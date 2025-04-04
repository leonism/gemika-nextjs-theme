"use client"

import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  className?: string
}

export function Pagination({ currentPage, totalPages, baseUrl, className }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if at the beginning or end
      if (currentPage <= 2) {
        end = 4
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("ellipsis-start")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  // Generate URL for a page
  const getPageUrl = (page: number) => {
    if (page === 1) {
      return baseUrl.includes("?") ? baseUrl : `${baseUrl}`
    }
    return baseUrl.includes("?") ? `${baseUrl}&page=${page}` : `${baseUrl}?page=${page}`
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className={cn("flex items-center justify-center space-x-2", className)}>
      {/* Previous button */}
      <Link
        href={getPageUrl(currentPage > 1 ? currentPage - 1 : 1)}
        aria-label="Go to previous page"
        className={cn(
          "inline-flex items-center justify-center rounded-full w-10 h-10 text-sm font-medium transition-colors",
          "border border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-100",
          "dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800",
          currentPage === 1 && "pointer-events-none opacity-50"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {/* Page numbers */}
      <div className="flex items-center space-x-2">
        {pageNumbers.map((page, i) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span
                key={`ellipsis-${i}`}
                className="flex h-10 w-10 items-center justify-center text-sm text-gray-400"
              >
                ...
              </span>
            )
          }

          return (
            <Link
              key={`page-${page}`}
              href={getPageUrl(page as number)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={cn(
                "inline-flex items-center justify-center rounded-full w-10 h-10 text-sm font-medium transition-colors",
                currentPage === page
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "border border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800"
              )}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* Next button */}
      <Link
        href={getPageUrl(currentPage < totalPages ? currentPage + 1 : totalPages)}
        aria-label="Go to next page"
        className={cn(
          "inline-flex items-center justify-center rounded-full w-10 h-10 text-sm font-medium transition-colors",
          "border border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-100",
          "dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800",
          currentPage === totalPages && "pointer-events-none opacity-50"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  )
}
