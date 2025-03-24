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
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-between sm:justify-center gap-2 w-full", className)}
    >
      {/* Previous Button */}
      <Button
        variant="ghost"
        className={cn(
          "rounded-full h-10 w-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800",
          "transition-all duration-200 hover:scale-105",
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
        )}
        disabled={currentPage === 1}
        asChild={currentPage !== 1}
      >
        {currentPage === 1 ? (
          <span className="flex items-center justify-center">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous page</span>
          </span>
        ) : (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="flex items-center justify-center h-full w-full"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        )}
      </Button>

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span
                key={`${page}-${index}`}
                className="flex items-center justify-center h-10 w-10 text-gray-500 dark:text-gray-400"
              >
                &hellip;
              </span>
            )
          }

          return (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "ghost"}
              size="sm"
              className={cn(
                "rounded-full h-10 w-10 p-0 text-sm font-medium",
                "transition-all duration-200 hover:scale-105",
                currentPage === page
                  ? "bg-indigo-600 hover:bg-indigo-700 shadow-md"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md"
              )}
              asChild={currentPage !== page}
            >
              {currentPage === page ? (
                <span
                  className="flex items-center justify-center h-full w-full"
                  aria-current="page"
                >
                  {page}
                </span>
              ) : (
                <Link
                  href={getPageUrl(page as number)}
                  className="flex items-center justify-center h-full w-full"
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </Link>
              )}
            </Button>
          )
        })}
      </div>

      {/* Mobile Current Page Display */}
      <div className="sm:hidden flex items-center gap-1">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <Button
        variant="ghost"
        className={cn(
          "rounded-full h-10 w-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-800",
          "transition-all duration-200 hover:scale-105",
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
        )}
        disabled={currentPage === totalPages}
        asChild={currentPage !== totalPages}
      >
        {currentPage === totalPages ? (
          <span className="flex items-center justify-center">
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next page</span>
          </span>
        ) : (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="flex items-center justify-center h-full w-full"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        )}
      </Button>
    </nav>
  )
}
