import Link from 'next/link'
import type { Post } from '@/types/post'

interface PaginationLinkProps {
  item: Post
  direction: 'prev' | 'next'
  href: string
  className?: string
}

export function PaginationLink({
  item,
  direction,
  href,
  className = '',
}: PaginationLinkProps) {
  const isPrev = direction === 'prev'

  return (
    <Link
      href={href}
      className={`group inline-flex items-center text-gray-700 no-underline transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 ${className}`}
    >
      {isPrev && (
        <div className="relative mr-2 h-10 w-10 rounded-full border border-gray-200 bg-white p-2 shadow-sm transition-colors group-hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:bg-indigo-900/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-500 transition-colors group-hover:text-indigo-600 dark:text-gray-400 dark:group-hover:text-indigo-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
      )}

      <div>
        <span className="text-sm text-gray-500 dark:text-gray-500">
          {isPrev ? 'Previous' : 'Next'}
        </span>
        <p className="font-medium">{item.frontmatter.title}</p>
      </div>

      {!isPrev && (
        <div className="relative ml-2 h-10 w-10 rounded-full border border-gray-200 bg-white p-2 shadow-sm transition-colors group-hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:bg-indigo-900/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-500 transition-colors group-hover:text-indigo-600 dark:text-gray-400 dark:group-hover:text-indigo-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      )}
    </Link>
  )
}
