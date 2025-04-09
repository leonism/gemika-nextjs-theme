import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

interface SearchLayoutProps {
  children: ReactNode;
  searchInput?: ReactNode;
  filters?: ReactNode;
  resultsCount?: number;
  searchQuery?: string;
}

export function SearchLayout({
  children,
  searchInput,
  filters,
  resultsCount,
  searchQuery,
}: SearchLayoutProps) {
  return (
    <Container>
      <div className="mb-8 px-4 sm:px-6 md:px-0">
        <h1 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold text-transparent dark:from-gray-100 dark:to-gray-400 sm:text-4xl">
          Search Results
        </h1>

        {searchInput && <div className="mb-6">{searchInput}</div>}

        {searchQuery && (
          <p className="mb-6 text-base text-gray-600 dark:text-gray-400 sm:mb-8 sm:text-lg">
            {resultsCount !== undefined ? (
              <>
                Showing {resultsCount} result{resultsCount !== 1 ? "s" : ""}{" "}
                for:{" "}
                <span className="font-medium text-black dark:text-white">
                  "{searchQuery}"
                </span>
              </>
            ) : (
              <>
                Searching for:{" "}
                <span className="font-medium text-black dark:text-white">
                  "{searchQuery}"
                </span>
              </>
            )}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 sm:gap-8 sm:px-6 md:px-0 lg:grid-cols-4 lg:gap-12">
        {filters && (
          <aside className="space-y-6 sm:space-y-8 lg:col-span-1">
            {filters}
          </aside>
        )}

        <main className={filters ? "lg:col-span-3" : "lg:col-span-4"}>
          {children}
        </main>
      </div>
    </Container>
  );
}
