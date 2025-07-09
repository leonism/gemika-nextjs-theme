import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

interface CategoryCardProps {
  title: string
  description?: string
  imageUrl?: string
  postCount?: number
  slug: string
  className?: string
}

export function CategoryCard({
  title,
  description,
  imageUrl,
  postCount,
  slug,
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${slug}`}
      className={cn(
        'group block overflow-hidden rounded-lg bg-gray-100 transition-shadow hover:shadow-md dark:bg-gray-800',
        className
      )}
    >
      <div className="relative aspect-video">
        <Image
          src={
            imageUrl ||
            'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
          }
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>

      <div className="p-4">
        {description && (
          <p className="mb-2 line-clamp-2 text-gray-700 dark:text-gray-300">{description}</p>
        )}

        {postCount !== undefined && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {postCount} {postCount === 1 ? 'post' : 'posts'}
          </p>
        )}
      </div>
    </Link>
  )
}
