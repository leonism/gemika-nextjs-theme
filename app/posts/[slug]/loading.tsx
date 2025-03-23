import { PostLayout } from "@/components/layouts/post-layout";

export default function Loading() {
  return (
    <PostLayout>
      <div className="prose dark:prose-invert lg:prose-lg mx-auto animate-pulse">
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
        </div>
      </div>
    </PostLayout>
  );
}
