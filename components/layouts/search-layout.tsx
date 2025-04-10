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
      <div className="mb-8 mt-4 px-4 sm:px-6 md:px-0">
        <h1 className="mb-6 mt-4 bg-clip-text text-xl font-bold leading-tight text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
          Search <span class="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">Results</span>
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

      <div className="mb-5 grid grid-cols-1 gap-6 px-4 sm:gap-8 sm:px-6 md:px-0 lg:grid-cols-4 lg:gap-12">
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
