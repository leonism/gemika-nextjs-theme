import Link from 'next/link'

import { EmptyState } from './EmptyState'
import { PostCard } from './PostCard'

import { Pagination } from '@/components/navigation/pagination'
import { Post } from '@/lib/posts'

interface PostsGridProps {
  posts: Post[]
  currentPage: number
  totalPages: number
}

export function PostsGrid({ posts, currentPage, totalPages }: PostsGridProps) {
  if (posts.length === 0) {
    return <EmptyState />
  }

  return (
    <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Show pagination only if needed */}
      {totalPages > 1 && (
        <div className="mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/posts"
            className="justify-center"
          />
        </div>
      )}
    </section>
  )
}
