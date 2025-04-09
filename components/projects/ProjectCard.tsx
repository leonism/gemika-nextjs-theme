import Image from "next/image";
import Link from "next/link";
import { CATEGORY_COLORS } from "@/lib/constants";

export function ProjectCard({ project }: { project: any }) {
  const categoryKey = project.frontmatter.category ?
    project.frontmatter.category.toLowerCase() : 'default';
  const colorSet = Object.keys(CATEGORY_COLORS).includes(categoryKey) ?
    CATEGORY_COLORS[categoryKey] : CATEGORY_COLORS.default;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col hover:-translate-y-1 sm:hover:-translate-y-2">
      <Link href={`/projects/${project.slug}`} className="flex flex-col h-full">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={project.frontmatter.coverImage || "/placeholder.svg"}
            alt={project.frontmatter.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {project.frontmatter.category && (
            <div className="absolute bottom-3 right-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorSet.bg} ${colorSet.text}`}>
                {project.frontmatter.category}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {project.frontmatter.title}
          </h3>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            {project.frontmatter.excerpt}
          </p>

          {/* Year and Client info with icons, aligned horizontally */}
          <div className="mt-auto flex flex-wrap gap-4">
            {project.frontmatter.year && (
              <div className="flex items-center text-gray-500 text-sm">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {project.frontmatter.year}
              </div>
            )}

            {project.frontmatter.client && (
              <div className="flex items-center text-gray-500 text-sm">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {project.frontmatter.client}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
