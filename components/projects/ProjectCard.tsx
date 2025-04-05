import Image from "next/image";
import Link from "next/link";
import { CATEGORY_COLORS } from "@/lib/constants";

export function ProjectCard({ project }: { project: any }) {
  const categoryKey = project.frontmatter.category ?
    project.frontmatter.category.toLowerCase() : 'default';
  const colorSet = Object.keys(CATEGORY_COLORS).includes(categoryKey) ?
    CATEGORY_COLORS[categoryKey] : CATEGORY_COLORS.default;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
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
          <div className="text-sm text-gray-500 mb-2">
            {project.frontmatter.date || project.frontmatter.year}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {project.frontmatter.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {project.frontmatter.excerpt}
          </p>
          {project.frontmatter.client && (
            <div className="mt-auto mb-3">
              <span className="text-sm text-gray-500">Client: </span>
              <span className="text-sm font-medium text-gray-700">
                {project.frontmatter.client}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
