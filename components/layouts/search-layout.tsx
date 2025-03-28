import type { ReactNode } from "react"
import { Container } from "@/components/ui/container"

interface SearchLayoutProps {
  children: ReactNode
  searchInput?: ReactNode
  filters?: ReactNode
  resultsCount?: number
  searchQuery?: string
}

export function SearchLayout({ children, searchInput, filters, resultsCount, searchQuery }: SearchLayoutProps) {
  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Search Results
        </h1>

        {searchInput && <div className="mb-6">{searchInput}</div>}

        {searchQuery && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {resultsCount !== undefined ? (
              <>
                Showing {resultsCount} result{resultsCount !== 1 ? "s" : ""} for:{" "}
                <span className="font-medium text-black dark:text-white">"{searchQuery}"</span>
              </>
            ) : (
              <>
                Searching for: <span className="font-medium text-black dark:text-white">"{searchQuery}"</span>
              </>
            )}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {filters && <aside className="lg:col-span-1 space-y-8">{filters}</aside>}

        <main className={filters ? "lg:col-span-3" : "lg:col-span-4"}>{children}</main>
      </div>
    </Container>
  )
}
