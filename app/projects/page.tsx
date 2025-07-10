import type { Metadata } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import JsonLd from '@/components/json-ld'
import ProjectsClientWrapper from '@/components/projects/ProjectsClientWrapper'
import { ProjectsHeader } from '@/components/projects/ProjectsHeader'
import { getAllContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Projects | UX Design & Development Portfolio',
  description: 'A showcase of my recent work across UX design, mobile development, and branding projects. Explore case studies, design systems, and creative technology solutions.',
  keywords: [
    'UX Design Portfolio',
    'Mobile App Development',
    'Web Development Projects',
    'Design Systems',
    'UI/UX Case Studies',
    'Frontend Development',
    'Creative Technology',
    'Branding Projects',
    'React Projects',
    'Next.js Portfolio'
  ],
  openGraph: {
    title: 'Projects | UX Design & Development Portfolio',
    description: 'A showcase of my recent work across UX design, mobile development, and branding projects. Explore case studies, design systems, and creative technology solutions.',
    type: 'website',
    images: [
      {
        url: '/og-projects.jpg',
        width: 1200,
        height: 630,
        alt: 'Gemika Haziq Nugroho Projects Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | UX Design & Development Portfolio',
    description: 'A showcase of my recent work across UX design, mobile development, and branding projects.',
    images: ['/og-projects.jpg'],
  },
  alternates: {
    canonical: '/projects',
  },
}

export default async function ProjectsPage() {
  const allProjects = await getAllContent('projects')

  const sortedProjects = allProjects.sort((a, b) => {
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
          '@type': 'WebPage',
          name: 'Projects',
          description:
            'A showcase of my recent work across UX design, mobile development, and branding projects.',
        }}
      />
      <main>
        <ProjectsHeader />
        <ProjectsClientWrapper projects={serializedProjects} />
      </main>
    </div>
  )
}
