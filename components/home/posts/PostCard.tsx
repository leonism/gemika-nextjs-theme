import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

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
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl bg-white"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.frontmatter.coverImage || "/placeholder.svg"}
          alt={post.frontmatter.title || "Untitled Post"}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>
      <div className="p-4 sm:p-6 relative">
        <div className="relative z-10">
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 text-xs sm:text-sm font-medium rounded-full">
              {(post.frontmatter.tags || ["Uncategorized"])[0]}
            </span>
            <span className="flex items-center text-xs sm:text-sm text-gray-500">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {post.frontmatter.date ? new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) : "Unknown date"}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 group-hover:text-indigo-600 transition-colors">
            {post.frontmatter.title || "Untitled Post"}
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4 md:mb-5 line-clamp-2 sm:line-clamp-3">
            {post.frontmatter.excerpt || "No excerpt available."}
          </p>
          {/* Read more link */}
          <div className="flex items-center text-indigo-600 font-medium text-sm sm:text-base">
            Read more
            <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
