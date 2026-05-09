import { FeaturedProjectsHeader } from './FeaturedProjectsHeader'
import { FeaturedProjectsGrid } from './FeaturedProjectsGrid'

interface FeaturedProjectsProps {
  projects: {
    slug: string
    frontmatter: {
      title: string
      coverImage?: string
      category?: string
    }
  }[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FeaturedProjectsHeader
          badge="PORTFOLIO"
          title="Featured Projects"
          viewAllHref="/projects"
          viewAllLabel="View all projects"
        />

        <FeaturedProjectsGrid projects={projects} />
      </div>
    </section>
  )
}

