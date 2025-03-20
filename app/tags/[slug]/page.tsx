import Image from "next/image"
import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const tags = new Set<string>()

  posts.forEach((post) => {
    post?.frontmatter?.tags?.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).map((tag) => ({
    tag: tag.toLowerCase().replace(/ /g, "-"),
  }))
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params
  const posts = await getAllPosts()

  const filteredPosts = posts.filter((post) =>
    post?.frontmatter?.tags?.map((tag) => tag.toLowerCase().replace(/ /g, "-")).includes(tag),
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main>
        <section className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Posts tagged with "{tag}"
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
            Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} with this tag
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="group">
                <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-video relative mb-4">
                  <Image
                    src={(post.frontmatter.coverImage as string) || "/placeholder.svg"}
                    alt={post.frontmatter.title as string}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {formatDate(post.frontmatter.date as string)}
                </p>
                <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                  {post.frontmatter.title as string}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{post.frontmatter.excerpt as string}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
