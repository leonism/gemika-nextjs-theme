import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serialize } from 'next-mdx-remote/serialize'

import JsonLd from '@/components/json-ld'
import ProjectsClientWrapper from '@/components/projects/ProjectsClientWrapper'
import { ProjectsHeader } from '@/components/projects/ProjectsHeader'
import { getAllContent } from '@/lib/content'
import { slugify } from '@/lib/utils'

interface CategoryPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const projects = await getAllContent('projects')
  const categories = new Set<string>()
  projects.forEach((project) => {
    if (project.frontmatter.category) {
      categories.add(slugify(project.frontmatter.category))
    }
  })
  return Array.from(categories).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = params
  const categoryName = slug.replace(/-/g, ' ')

  return {
    title: `Projects in ${categoryName}`,
    description: `A showcase of projects categorized under ${categoryName}.`,
  }
}

export default async function ProjectsCategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  const categoryName = slug.replace(/-/g, ' ')

  const allProjects = await getAllContent('projects')

  const filteredProjects = allProjects.filter(
    (project) => slugify(project.frontmatter.category as string) === slug
  )

  if (filteredProjects.length === 0) {
    notFound()
  }

  const sortedProjects = filteredProjects.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || a.frontmatter.year || '2000-01-01')
    const dateB = new Date(b.frontmatter.date || b.frontmatter.year || '2000-01-01')
    return dateB.getTime() - dateA.getTime()
  })

  const serializedProjects = await Promise.all(
    sortedProjects.map(async (project) => ({
      ...project,
      content: await serialize(project.content || ''),
    }))
  )

  return (
    <div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Projects in ${categoryName}`,
          description: `A showcase of projects categorized under ${categoryName}.`,
        }}
      />
      <main>
        <ProjectsHeader title={`Projects in ${categoryName}`} />
        <ProjectsClientWrapper projects={serializedProjects} />
      </main>
    </div>
  )
}
