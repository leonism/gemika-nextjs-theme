import { PostLayout } from '@/components/layouts/post-layout'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <PostLayout>
      <div className="prose mx-auto dark:prose-invert lg:prose-lg">
        <Skeleton className="mb-4 h-8 w-3/4" />
        <Skeleton className="mb-8 h-4 w-1/4" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="mt-8 h-64 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </PostLayout>
  )
}
