import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface PostCardProps {
  post: {
    slug: string
    frontmatter: {
      title: string
      coverImage?: string
      tags?: string[]
      date?: string
      excerpt?: string
    }
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      key={post.slug}
      href={`/posts/${post.slug}`}
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl sm:hover:-translate-y-2"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.frontmatter.coverImage || '/placeholder.svg'}
          alt={post.frontmatter.title || 'Untitled Post'}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>
      <div className="relative p-4 sm:p-6">
        <div className="relative z-10">
          <div className="mb-2 flex items-center gap-1 sm:mb-3 sm:gap-2">
            <span className="rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-2 py-0.5 text-xs font-medium text-indigo-600 sm:px-3 sm:py-1 sm:text-sm">
              {(post.frontmatter.tags || ['Uncategorized'])[0]}
            </span>
            <span className="flex items-center text-xs text-gray-500 sm:text-sm">
              <svg
                className="mr-1 h-3 w-3 sm:h-4 sm:w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {post.frontmatter.date
                ? new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : 'Unknown date'}
            </span>
          </div>
          <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-indigo-600 sm:mb-3 sm:text-xl md:mb-4 md:text-2xl">
            {post.frontmatter.title || 'Untitled Post'}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-gray-600 sm:mb-4 sm:line-clamp-3 sm:text-base md:mb-5 md:text-lg">
            {post.frontmatter.excerpt || 'No excerpt available.'}
          </p>
          {/* Read more link */}
          <div className="flex items-center text-sm font-medium text-indigo-600 sm:text-base">
            Read more
            <svg
              className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-500 group-hover:scale-x-100 sm:h-1.5"></div>
    </Link>
  )
}
