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
    <nav aria-label="Pagination" className={cn("flex justify-center items-center space-x-2", className)}>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        disabled={currentPage === 1}
        asChild={currentPage !== 1}
      >
        {currentPage === 1 ? (
          <span>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </span>
        ) : (
          <Link href={getPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Link>
        )}
      </Button>

      <div className="flex items-center space-x-2">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span key={`${page}-${index}`} className="px-2">
                &hellip;
              </span>
            )
          }

          return (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className="rounded-full w-9 h-9 p-0"
              asChild={currentPage !== page}
            >
              {currentPage === page ? (
                <span aria-current="page">{page}</span>
              ) : (
                <Link href={getPageUrl(page as number)}>{page}</Link>
              )}
            </Button>
          )
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        disabled={currentPage === totalPages}
        asChild={currentPage !== totalPages}
      >
        {currentPage === totalPages ? (
          <span>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </span>
        ) : (
          <Link href={getPageUrl(currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Link>
        )}
      </Button>
    </nav>
  )
}

