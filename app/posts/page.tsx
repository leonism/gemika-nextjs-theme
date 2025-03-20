import { getAllContent } from "@/lib/content"
import JsonLd from "@/components/json-ld"
import type { Metadata } from "next"
import type { WebPage, WithContext } from "schema-dts"
import { BlogLayout } from "@/components/layouts/blog-layout"
import { PostCard } from "@/components/cards/post-card"
import { SearchForm } from "@/components/forms/search-form"
import { Pagination } from "@/components/navigation/pagination"

export const metadata: Metadata = {
  title: "Blog Posts | Gerous",
  description: "Thoughts, ideas, and insights on UX design, development, and creative processes.",
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1
  const postsPerPage = 9

  const allPosts = await getAllContent("posts")

  // Calculate pagination
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  // Get posts for current page
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const paginatedPosts = allPosts.slice(startIndex, endIndex)

  // Get categories from posts
  const categories = new Map()
  allPosts.forEach((post) => {
    const tags = (post.frontmatter.tags as string[]) || []
    tags.forEach((tag) => {
      if (categories.has(tag)) {
        categories.set(tag, categories.get(tag) + 1)
      } else {
        categories.set(tag, 1)
      }
    })
  })

  // Convert to array and sort by count
  const topCategories = Array.from(categories.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }))

  // Create JSON-LD structured data
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog Posts | Gerous",
    description: "Thoughts, ideas, and insights on UX design, development, and creative processes.",
    url: "https://gerous.netlify.app/posts",
    isPartOf: {
      "@type": "WebSite",
      name: "Gerous",
      url: "https://gerous.netlify.app",
    },
    about: {
      "@type": "Thing",
      name: "UX Design and Development",
    },
  }

  // Sidebar content
  const sidebar = (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold text-lg mb-4">Search</h3>
        <SearchForm />
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">Categories</h3>
        <ul className="space-y-2">
          {topCategories.map((category) => (
            <li key={category.slug} className="flex justify-between items-center">
              <a
                href={`/tags/${category.slug}`}
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              >
                {category.name}
              </a>
              <span className="text-sm text-gray-500 dark:text-gray-400">({category.count})</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">Featured Posts</h3>
        <div className="space-y-4">
          {allPosts.slice(0, 3).map((post) => (
            <PostCard
              key={post.slug}
              title={post.frontmatter.title as string}
              excerpt=""
              date={post.frontmatter.date as string}
              imageUrl={post.frontmatter.coverImage as string}
              slug={post.slug}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogLayout
        title="Blog Posts"
        description="Thoughts, ideas, and insights on UX design, development, and creative processes."
        sidebar={sidebar}
        pagination={<Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/posts" />}
      >
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No posts found</h2>
            <p className="text-gray-600 dark:text-gray-400">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paginatedPosts.map((post) => (
              <PostCard
                key={post.slug}
                title={post.frontmatter.title as string}
                excerpt={post.frontmatter.excerpt as string}
                date={post.frontmatter.date as string}
                author={post.frontmatter.author as string}
                imageUrl={post.frontmatter.coverImage as string}
                slug={post.slug}
                category={(post.frontmatter.tags as string[])?.[0]}
              />
            ))}
          </div>
        )}
      </BlogLayout>
    </>
  )
}
