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
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pageNumbers.push("...");
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Pagination" className={cn("flex justify-center items-center py-12", className)}>
      <ul className="flex items-center gap-2">
        {/* Previous page button */}
        <li>
          {currentPage === 1 ? (
            <span className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-400 cursor-not-allowed bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </span>
          ) : (
            <Link
              href={`${baseUrl}?page=${currentPage - 1}`}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          )}
        </li>

        {/* Page numbers - keep existing code */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {typeof page === "number" ? (
              <Link
                href={`${baseUrl}?page=${page}`}
                className={`inline-flex items-center justify-center px-3 py-3 text-sm font-medium w-10 h-10 ${
                  page === currentPage ? "bg-indigo-600 text-white" : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                } border border-gray-300 dark:border-gray-700 rounded-full shadow-sm hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300`}
              >
                {page}
              </Link>
            ) : (
              <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-400">{page}</span>
            )}
          </li>
        ))}

        {/* Next page button */}
        <li>
          {currentPage === totalPages ? (
            <span className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-400 cursor-not-allowed bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </span>
          ) : (
            <Link
              href={`${baseUrl}?page=${currentPage + 1}`}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
