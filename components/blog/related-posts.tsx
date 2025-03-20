import { PostCard } from "@/components/cards/post-card"

interface RelatedPost {
  title: string
  excerpt: string
  date: string
  imageUrl: string
  slug: string
  category?: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
  title?: string
  className?: string
}

export function RelatedPosts({ posts, title = "Related Posts", className }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-500 dark:from-gray-200 dark:to-gray-500 bg-clip-text text-transparent">
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            imageUrl={post.imageUrl}
            slug={post.slug}
            category={post.category}
            variant="default"
          />
        ))}
      </div>
    </div>
  )
}

