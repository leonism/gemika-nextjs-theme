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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <span className="text-sm font-medium text-indigo-600">
              BLOG
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">
              Latest Articles
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on UX design, mobile development, and digital strategy
          </p>
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
