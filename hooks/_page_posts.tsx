import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { WebPage, WithContext } from 'schema-dts'

import JsonLd from '@/components/json-ld'
import { Pagination } from '@/components/navigation/pagination'
import { getAllContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Blog | Insights & Thoughts',
  description: 'Explore my latest writings on UX design, development, and creative processes.',
}

// Color palette for tags to ensure visual consistency
const TAG_COLORS = [
  {
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-600 dark:text-indigo-300',
  },
  {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-600 dark:text-emerald-300',
  },
  {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-600 dark:text-amber-300',
  },
  {
    bg: 'bg-rose-100 dark:bg-rose-900/30',
    text: 'text-rose-600 dark:text-rose-300',
  },
  {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-600 dark:text-violet-300',
  },
]

const POSTS_PER_PAGE = 6

export default async function PostsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string }
}) {
  // Get all posts and sort by date (newest first)
  const allPosts = await getAllContent('posts')
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || '2000-01-01')
    const dateB = new Date(b.frontmatter.date || '2000-01-01')
    return dateB.getTime() - dateA.getTime()
  })

  // Pagination logic - properly await searchParams
  const resolvedSearchParams = await searchParams
  const page = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1
  const validatedPage = isNaN(page) || page < 1 ? 1 : page

  const totalPosts = sortedPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (validatedPage - 1) * POSTS_PER_PAGE
  const posts = sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  // JSON-LD structured data
  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog | Insights & Thoughts',
    description: 'Explore my latest writings on UX design, development, and creative processes.',
    url: 'https://gemika.vercel.app/posts',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Gemika Haziq Nugroho',
      url: 'https://gemika.vercel.app',
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          {/* Subtle animated floating badge */}
          <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/80">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              LATEST ARTICLES
            </span>
            <span className="ml-2 h-2 w-2 animate-pulse rounded-full bg-indigo-400"></span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Insights &{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              Thoughts
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl">
            Explore my latest writings on UX design, development, and creative processes.
          </p>
        </div>
      </section>

      {/* Posts Grid Section */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
        {posts.length === 0 ? (
          // Empty state with animation
          <div className="py-20 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-12 w-12 text-gray-400 dark:text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              No posts found
            </h3>
            <p className="mx-auto max-w-md text-gray-600 dark:text-gray-400">
              There are no blog posts available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => {
                // Get a color for each tag based on its index
                const getTagColor = (tagIndex: number) => {
                  return TAG_COLORS[tagIndex % TAG_COLORS.length]
                }

                return (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
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
                      <div className="mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
                        {post.frontmatter.readingTime && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{post.frontmatter.readingTime} read</span>
                          </>
                        )}
                      </div>
                      <h2 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        {post.frontmatter.title}
                      </h2>
                      <p className="mb-4 line-clamp-2 flex-grow text-gray-600 dark:text-gray-300">
                        {post.frontmatter.excerpt}
                      </p>
                      {post.frontmatter.tags && (
                        <div className="mt-auto flex flex-wrap gap-2">
                          {post.frontmatter.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tag}
                              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                getTagColor(tagIndex).bg
                              } ${getTagColor(tagIndex).text}`}
                            >
                              {tag}
                            </span>
                          ))}
                          {post.frontmatter.tags.length > 3 && (
                            <span className="inline-block rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              +{post.frontmatter.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16">
                <Pagination
                  currentPage={validatedPage}
                  totalPages={totalPages}
                  baseUrl="/posts"
                  className="justify-center"
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
