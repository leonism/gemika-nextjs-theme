import { PostCard } from '@/components/posts/PostCard'
import type { Post } from '@/types/post'

interface LatestPostsGridProps {
  posts: Post[]
}

export function LatestPostsGrid({ posts }: LatestPostsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
