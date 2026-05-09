import { LatestPostsHeader } from '@/components/home/posts/LatestPostsHeader'
import { LatestPostsGrid } from '@/components/home/posts/LatestPostsGrid'
import type { Post } from '@/types/post'

interface LatestPostsProps {
  posts: Post[]
}

export function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <LatestPostsHeader
          badge="BLOG"
          title="Latest Articles"
          description="Insights, tutorials, and thoughts on UX design, mobile development, and digital strategy"
        />

        <LatestPostsGrid posts={posts} />
      </div>
    </section>
  )
}

