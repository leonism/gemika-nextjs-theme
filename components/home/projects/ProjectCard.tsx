import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  project: {
    slug: string
    frontmatter: {
      title: string
      coverImage?: string
      category: string
    }
  }
  isFeatured?: boolean
}

export default function ProjectCard({ project, isFeatured = false }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`relative ${isFeatured ? 'aspect-[16/8]' : 'aspect-[16/9]'} overflow-hidden`}>
        <Image
          src={project.frontmatter.coverImage || "/placeholder.svg"}
          alt={project.frontmatter.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap gap-1 sm:gap-2">
          <span className="px-2 sm:px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full backdrop-blur-sm border border-white/20 shadow-sm">
            {project.frontmatter.category}
          </span>
          {isFeatured && (
            <span className="px-2 sm:px-3 py-1 bg-rose-600 text-white text-xs font-medium rounded-full backdrop-blur-sm border border-white/20 shadow-sm">
              Featured
            </span>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </Link>
  )
}
