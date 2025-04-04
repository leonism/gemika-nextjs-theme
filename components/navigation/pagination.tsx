import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  className,
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than our max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're at the beginning or end
      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed before middle pages
      if (start > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed after middle pages
      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-between", className)}
    >
      {/* Previous page button */}
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Link>
      ) : (
        <div className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full cursor-not-allowed opacity-50">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </div>
      )}

      {/* Page numbers */}
      <div className="hidden md:flex space-x-2">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                ...
              </span>
            );
          }

          return (
            <Link
              key={`page-${page}`}
              href={`${baseUrl}?page=${page}`}
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-full transition-all duration-300",
                currentPage === page
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent"
              )}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Mobile page indicator */}
      <div className="md:hidden text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700">
        Page {currentPage} of {totalPages}
      </div>

      {/* Next page button */}
      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Link>
      ) : (
        <div className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full cursor-not-allowed opacity-50">
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </div>
      )}
    </nav>
  );
}
