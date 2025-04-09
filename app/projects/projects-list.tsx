// app/projects/projects-list.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

// app/projects/projects-list.tsx

// app/projects/projects-list.tsx

// app/projects/projects-list.tsx

interface Project {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    thumbnail?: string;
    [key: string]: any;
  };
}

export function ProjectsList({
  projects,
  currentPage,
  totalPages,
}: {
  projects: Project[];
  currentPage: number;
  totalPages: number;
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className="group overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-gray-700"
          >
            {project.frontmatter.thumbnail && (
              <div className="relative aspect-video w-full">
                <Image
                  src={project.frontmatter.thumbnail}
                  alt={project.frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-primary">
                {project.frontmatter.title}
              </h3>
              {project.frontmatter.description && (
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {project.frontmatter.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center">
          <nav className="flex items-center gap-2">
            {/* Previous Page */}
            <Link
              href={`/projects?page=${currentPage > 1 ? currentPage - 1 : 1}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 ${
                currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
              }`}
              aria-disabled={currentPage === 1}
            >
              ‹
            </Link>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={`/projects?page=${i + 1}`}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm ${
                  currentPage === i + 1
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                    : 'border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800'
                }`}
              >
                {i + 1}
              </Link>
            ))}

            {/* Next Page */}
            <Link
              href={`/projects?page=${
                currentPage < totalPages ? currentPage + 1 : totalPages
              }`}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 ${
                currentPage === totalPages
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }`}
              aria-disabled={currentPage === totalPages}
            >
              ›
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
