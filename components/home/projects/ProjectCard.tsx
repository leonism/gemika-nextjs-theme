import Image from 'next/image'
import Link from 'next/link'

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
      className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-1 sm:rounded-2xl sm:hover:-translate-y-2 ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`relative ${isFeatured ? 'aspect-[16/8]' : 'aspect-[16/9]'} overflow-hidden`}>
        <Image
          src={project.frontmatter.coverImage || '/placeholder.svg'}
          alt={project.frontmatter.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 sm:bottom-4 sm:left-4 sm:right-4 sm:gap-2">
          <span className="rounded-full border border-white/20 bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm sm:px-3">
            {project.frontmatter.category}
          </span>
          {isFeatured && (
            <span className="rounded-full border border-white/20 bg-rose-600 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm sm:px-3">
              Featured
            </span>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-500 group-hover:scale-x-100 sm:h-1.5"></div>
    </Link>
  )
}
