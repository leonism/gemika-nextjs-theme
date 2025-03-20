import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen">
      <main>
        <article className="container mx-auto px-4 py-16 max-w-3xl">
          <Skeleton className="h-4 w-24 mb-8" />

          <div className="mb-8">
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-6 w-full" />
          </div>

          <Skeleton className="aspect-video w-full rounded-lg mb-8" />

          <div className="space-y-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <Skeleton className="h-8 w-48 mt-8" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />

            <Skeleton className="h-8 w-48 mt-8" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          <div className="mt-12 pt-8 border-t">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-full" />
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

