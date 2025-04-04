"use client";

import { SearchLayout } from "@/components/layouts/search-layout";
import { SearchForm } from "@/components/forms/search-form";
import { SearchResults } from "@/components/search-results";
import { useSearchParams } from 'next/navigation';
import JsonLd from "@/components/json-ld";
import type { WithContext } from "schema-dts";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || "";

  // Create JSON-LD structured data
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: `Search Results for "${query}" | gemika`,
    url: `https://gemika.netlify.app/search?q=${encodeURIComponent(query)}`,
    isPartOf: {
      "@type": "WebSite",
      name: "gemika",
      url: "https://gemika.netlify.app",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <SearchLayout
        searchInput={<SearchForm placeholder="Search again..." instant={true} />}
        searchQuery={query}
      >
        {query ? <SearchResults query={query} /> : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">Enter a search term</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Type in the search box above to find content across the site.
            </p>
          </div>
        )}
      </SearchLayout>
    </>
  );
}
