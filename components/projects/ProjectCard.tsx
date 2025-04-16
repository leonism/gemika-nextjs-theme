import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { CATEGORY_COLORS } from "@/lib/constants";

export function ProjectCard({ project }: { project: any }) {
  const categoryKey = project.frontmatter.category
    ? project.frontmatter.category.toLowerCase()
    : "default";
  const colorSet = Object.keys(CATEGORY_COLORS).includes(categoryKey)
    ? CATEGORY_COLORS[categoryKey]
    : CATEGORY_COLORS.default;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:hover:-translate-y-2">
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.frontmatter.coverImage || "/placeholder.svg"}
            alt={project.frontmatter.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category bullet at bottom right */}
          {project.frontmatter.category && (
            <div className="absolute bottom-3 right-3 z-10">
              <span
                className={`inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-sm ${colorSet.bg} ${colorSet.text}`}
              >
                {project.frontmatter.category}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-grow flex-col p-6">
          <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
            {project.frontmatter.title}
          </h3>
          <p className="mb-4 text-md text-gray-600 sm:text-base">
            {project.frontmatter.excerpt}
          </p>

          {/* Year and Client info with icons, aligned horizontally */}
          <div className="mt-auto flex flex-wrap gap-4">
            {project.frontmatter.year && (
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1.5 h-4 w-4 text-indigo-500" />
                {project.frontmatter.year}
              </div>
            )}

            {project.frontmatter.client && (
              <div className="flex items-center text-sm text-gray-500">
                <User className="mr-1.5 h-4 w-4 text-indigo-500" />
                {project.frontmatter.client}
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-500 group-hover:scale-x-100 sm:h-1.5">
        </div>
      </Link>
    </div>
  );
}
