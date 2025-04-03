"use client"

import { useState, useEffect } from "react"
import { SearchIcon, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchResult {
  type: string;
  slug: string;
  frontmatter: {
    title: string;
    excerpt: string;
  };
}

export function SearchDialog() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (query.length > 2) {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setResults(data))
    } else {
      setResults([])
    }
  }, [query])

  const handleResultClick = (item: SearchResult) => {
    let path = '';
    if (item.type === 'posts') {
      path = `/posts/${item.slug}`;
    } else if (item.type === 'projects') {
      path = `/projects/${item.slug}`;
    } else if (item.type === 'tags') {
      path = `/tags/${item.slug}`;
    }

    if (path) {
      router.push(path);
      setIsOpen(false);
    }
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="p-2">
        <SearchIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl mt-20">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts and projects..."
                className="w-full p-4 pr-12 rounded-t-xl focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {results.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {results.map((item) => (
                  <div
                    key={`${item.type}-${item.slug}`}
                    onClick={() => handleResultClick(item)}
                    className="p-4 hover:bg-gray-100 cursor-pointer"
                  >
                    <h3 className="font-medium">{item.frontmatter.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {item.frontmatter.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
