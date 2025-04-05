import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Post {
  slug: string
  frontmatter: {
    title: string
    excerpt: string
    date?: string
    coverImage?: string
    tags?: string[]
  }
}

export function LatestPosts({ posts }: { posts: Post[] }) {
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
          <Link
            href="/posts"
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-medium text-gray-500 hover:text-gray-900 transition-colors relative group"
          >
            View all articles
            <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 transition-all duration-300 group-hover:w-full" />
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {posts.map((post) => (
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
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3 group-hover:text-indigo-600 transition-colors">
                    {post.frontmatter.title || "Untitled Post"}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4 line-clamp-2 sm:line-clamp-3">
                    {post.frontmatter.excerpt || "No excerpt available."}
                  </p>
                  <div className="inline-flex items-center text-indigo-600 font-medium text-xs sm:text-sm md:text-base">
                    Read more
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
