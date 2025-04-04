"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchResult } from "@/types/search";
import { Clock, FileText, ArrowRight, BookOpen } from "lucide-react";

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
      return <FileText className="w-4 h-4" />;
    case "project":
      return <BookOpen className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

export function SearchResults({ query }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
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
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 animate-pulse"
            aria-hidden="true"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
              </div>
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            No results found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We couldn't find any content matching "{query}"
          </p>
        </div>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Browse all posts
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FileText className="w-4 h-4" />
            View projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-6">
        {results.map((result) => (
          <article
            key={result.id}
            className="group p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 hover:shadow-lg transition-all duration-300 ease-in-out hover:border-primary/30 dark:hover:border-primary/50 hover:-translate-y-1"
            aria-labelledby={`result-${result.id}-title`}
          >
            <Link href={result.url} className="block">
              <div className="flex items-start gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                      {getResultIcon(result.type)}
                      {result.type}
                    </span>
                    {result.date && (
                      <time
                        dateTime={result.date}
                        className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(result.date)}
                      </time>
                    )}
                  </div>
                  <h3
                    id={`result-${result.id}-title`}
                    className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors mb-3"
                  >
                    {result.frontmatter.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {result.frontmatter.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-primary font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group-hover:shadow-sm">
                    Read more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
