// app/projects/projects-list.tsx
"use client"

interface Project {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
}
import Link from "next/link"
import Image from "next/image"

export function ProjectsList({
  projects,
  currentPage,
  totalPages
}: {
  projects: Project[]
  currentPage: number
  totalPages: number
}) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          // Your project card JSX here
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-16">
          <nav className="flex items-center gap-2">
            <Link
              href={`/projects?page=${currentPage > 1 ? currentPage - 1 : 1}`}
              className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {/* Previous icon */}
            </Link>

            {/* Page numbers */}

            <Link
              href={`/projects?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
              className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {/* Next icon */}
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
