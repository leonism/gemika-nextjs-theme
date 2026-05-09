import ProjectCard from './ProjectCard'

interface FeaturedProjectsGridProps {
  projects: {
    slug: string
    frontmatter: {
      title: string
      coverImage?: string
      category?: string
    }
  }[]
}

export function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} isFeatured={index === 0} />
      ))}
    </div>
  )
}
