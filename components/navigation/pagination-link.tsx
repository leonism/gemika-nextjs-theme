import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { Post } from '@/types/post'

interface PaginationLinkProps {
  item: Post
  direction: 'prev' | 'next'
  href: string
  className?: string
}

export function PaginationLink({ item, direction, href, className = '' }: PaginationLinkProps) {
  const isPrev = direction === 'prev'

  return (
    <Link
      href={href}
      className={`group relative flex w-full min-w-0 max-w-sm items-center rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/80 dark:hover:border-indigo-600 dark:hover:bg-gray-800 dark:hover:shadow-xl sm:max-w-md ${isPrev ? 'justify-start text-left' : 'ml-auto justify-end text-right'} ${className}`}
    >
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

      <div
        className={`relative flex items-center gap-3 ${isPrev ? 'flex-row' : 'flex-row-reverse'}`}
      >
        {/* Icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gradient-to-br from-indigo-50 to-purple-50 transition-all duration-300 group-hover:border-indigo-300 group-hover:from-indigo-100 group-hover:to-purple-100 dark:border-gray-600 dark:from-indigo-900/30 dark:to-purple-900/30 dark:group-hover:border-indigo-500 dark:group-hover:from-indigo-900/50 dark:group-hover:to-purple-900/50">
          {isPrev ? (
            <ChevronLeft className="h-5 w-5 text-indigo-600 transition-transform duration-300 group-hover:-translate-x-0.5 dark:text-indigo-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-indigo-600 transition-transform duration-300 group-hover:translate-x-0.5 dark:text-indigo-400" />
          )}
        </div>

        {/* Content */}
        <div className={`min-w-0 flex-1 ${isPrev ? 'text-left' : 'text-right'}`}>
          <div className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {isPrev ? 'Previous' : 'Next'}
          </div>
          <div className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-indigo-700 dark:text-gray-100 dark:group-hover:text-indigo-300">
            {item.frontmatter.title}
          </div>
        </div>
      </div>
    </Link>
  )
}
