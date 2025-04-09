import { PostLayout } from '@/components/layouts/post-layout';

export default function Loading() {
  return (
    <PostLayout>
      <div className="prose mx-auto animate-pulse dark:prose-invert lg:prose-lg">
        <div className="mb-4 h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-8 h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-4">
          <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </PostLayout>
  );
}
