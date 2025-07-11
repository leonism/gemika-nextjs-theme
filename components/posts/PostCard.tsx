import Image from 'next/image'
import Link from 'next/link'

import { Post } from '@/lib/posts'
import { TAG_COLORS } from '@/lib/posts'

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:hover:-translate-y-2"
    >
      {post.frontmatter.coverImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.frontmatter.coverImage}
            alt={post.frontmatter.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.frontmatter.category && (
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm dark:bg-gray-900/90 dark:text-gray-300">
              {post.frontmatter.category}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-grow flex-col p-6">
        <h2 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
          {post.frontmatter.title}
        </h2>

        <p className="mb-4 line-clamp-2 flex-grow text-gray-600 dark:text-gray-300">
          {post.frontmatter.excerpt}
        </p>

        {/* Date and Reading Time with Icons */}
        <div className="mt-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="mr-4 flex items-center">
            <svg
              className="mr-1.5 h-4 w-4 text-indigo-500"
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
            <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
          </div>

          {post.frontmatter.readingTime && (
            <div className="flex items-center">
              <svg
                className="mr-1.5 h-4 w-4 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{post.frontmatter.readingTime} read</span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-500 group-hover:scale-x-100 sm:h-1.5"></div>
    </Link>
  )
}
