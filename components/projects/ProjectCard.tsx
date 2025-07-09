import Image from 'next/image'
import Link from 'next/link'

import { CATEGORY_COLORS } from '@/lib/constants'

export function ProjectCard({ project }: { project: any }) {
  const categoryKey = project.frontmatter.category
    ? project.frontmatter.category.toLowerCase()
    : 'default'
  const colorSet = Object.keys(CATEGORY_COLORS).includes(categoryKey)
    ? CATEGORY_COLORS[categoryKey]
    : CATEGORY_COLORS.default

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:hover:-translate-y-2"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.frontmatter.coverImage || '/placeholder.svg'}
          alt={project.frontmatter.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {project.frontmatter.category && (
          <div className="absolute bottom-3 right-3 flex flex-wrap gap-1 sm:bottom-4 sm:right-4 sm:gap-2">
            <span className="rounded-full border border-white/20 bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm sm:px-3">
              {project.frontmatter.category}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-grow flex-col p-6">
        <h2 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
          {project.frontmatter.title}
        </h2>
        <p className="mb-4 line-clamp-2 flex-grow text-gray-600 dark:text-gray-300">
          {project.frontmatter.excerpt}
        </p>

        <div className="mt-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
          {project.frontmatter.year && (
            <div className="mr-4 flex items-center">
              <svg
                className="mr-1.5 h-4 w-4 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {project.frontmatter.year}
            </div>
          )}

          {project.frontmatter.client && (
            <div className="flex items-center">
              <svg
                className="mr-1.5 h-4 w-4 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {project.frontmatter.client}
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-500 group-hover:scale-x-100 sm:h-1.5"></div>
      </div>
    </Link>
  )
}
