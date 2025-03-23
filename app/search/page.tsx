"use client";

import { SearchLayout } from "@/components/layouts/search-layout";
import { SearchForm } from "@/components/forms/search-form";
// Ensure the correct path to the SearchResults component
import { SearchResults } from "@/components/search-results";
import { Suspense } from "react";
import { SkeletonLoader } from "@/components/utility/skeleton-loader";
import JsonLd from "@/components/json-ld";
import type { WithContext } from "schema-dts";
import { useSearchParams } from 'next/navigation';

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

  // Search filters
  const filters = (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4">Content Type</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" defaultChecked />
            <span>Blog Posts</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" defaultChecked />
            <span>Projects</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" defaultChecked />
            <span>Pages</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">Date</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="radio" name="date" className="mr-2" defaultChecked />
            <span>Any time</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="date" className="mr-2" />
            <span>Past week</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="date" className="mr-2" />
            <span>Past month</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="date" className="mr-2" />
            <span>Past year</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">Sort By</h3>
        <select className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md">
          <option>Relevance</option>
          <option>Date (newest first)</option>
          <option>Date (oldest first)</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <SearchLayout
        searchInput={<SearchForm placeholder="Refine your search..." />}
        filters={filters}
        searchQuery={query}
      >
        {query ? (
          <Suspense fallback={<SkeletonLoader variant="rectangle" count={3} gap="lg" />}>
            <SearchResults query={query} />
          </Suspense>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Please enter a search term to see results.</p>
          </div>
        )}
      </SearchLayout>
    </>
  );
}
