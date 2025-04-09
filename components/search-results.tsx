"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, FileText } from "lucide-react";

import { SearchResult } from "@/types/search";

interface SearchResultsProps {
  query: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

const getResultIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "post":
      return <FileText className="h-4 w-4" />;
    case "project":
      return <BookOpen className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
        );
        if (!response.ok) throw new Error("Failed to fetch search results");
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error searching content:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (query) fetchResults();
    else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900/50 sm:p-5"
            aria-hidden="true"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-1 space-y-2 sm:space-y-3">
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-3 rounded bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-800"></div>
              </div>
              <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-800"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className="space-y-4 py-8 text-center sm:py-12">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
            No results found
          </h2>
          <p className="px-4 text-gray-600 dark:text-gray-400 sm:px-0">
            We couldn't find any content matching your search for "{query}".
          </p>
        </div>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
          >
            <BookOpen className="h-4 w-4" />
            Browse all posts
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <FileText className="h-4 w-4" />
            View projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {results.map((result) => (
        <article
          key={result.id}
          className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-primary/50"
          aria-labelledby={`result-${result.id}-title`}
        >
          <Link href={result.url} className="block">
            <div className="flex items-start gap-5">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-gray-600 transition-colors group-hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-gray-700">
                    {getResultIcon(result.type)}
                    {result.type}
                  </span>
                  {result.date && (
                    <time
                      dateTime={result.date}
                      className="inline-flex items-center gap-1 text-gray-500 transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"
                    >
                      <Clock className="h-3.5 w-3.5" />
                      {formatDate(result.date)}
                    </time>
                  )}
                </div>
                <h3
                  id={`result-${result.id}-title`}
                  className="mb-3 text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary dark:text-gray-100"
                >
                  {result.frontmatter.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-gray-600 transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                  {result.frontmatter.excerpt}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 font-medium text-primary transition-colors hover:bg-gray-100 group-hover:shadow-sm dark:bg-gray-800 dark:hover:bg-gray-700">
                  Read more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
