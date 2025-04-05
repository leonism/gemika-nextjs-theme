import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { PostCard } from "./PostCard"

interface LatestPostsProps {
  posts: {
    slug: string
    frontmatter: {
      title: string
      coverImage?: string
      tags?: string[]
      date?: string
      excerpt?: string
    }
  }[]
}

export function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section className="sm:py-4 lg:py-8 xl:py-10 mb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <span className="text-sm font-medium text-indigo-600">BLOG</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                Latest Articles
              </span>
            </h2>
          </div>
          <Link href="/posts" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-medium text-gray-500 hover:text-gray-900 transition-colors relative group">
            View all articles
            <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
