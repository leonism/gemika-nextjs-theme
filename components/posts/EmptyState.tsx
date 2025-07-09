export function EmptyState() {
  return (
    <div className="py-20 text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-12 w-12 text-gray-400 dark:text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">No posts found</h3>
      <p className="mx-auto max-w-md text-gray-600 dark:text-gray-400">
        There are no blog posts available at the moment. Please check back later.
      </p>
    </div>
  )
}
