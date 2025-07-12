import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { WithContext } from 'schema-dts'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import type { Post } from '@/types/post'
import JsonLd from '@/components/json-ld'
import { MDXProviderClient } from '@/components/mdx-provider-client'
import { Button } from '@/components/ui/button'
import ClientOnly from '@/components/utility/client-only'
import { getAllContent, getContent } from '@/lib/content'

interface ProjectPageProps {
  params: { slug: string }
}

// Constants for tag colors to avoid repetition
const TAG_COLORS = [
  {
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-600 dark:text-indigo-300',
  },
  {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-600 dark:text-emerald-300',
  },
  {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-600 dark:text-amber-300',
  },
  {
    bg: 'bg-rose-100 dark:bg-rose-900/30',
    text: 'text-rose-600 dark:text-rose-300',
  },
  {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-600 dark:text-violet-300',
  },
]

/**
 * Generates static paths for all projects at build time
 */
export async function generateStaticParams() {
  const projects = await getAllContent('projects')
  return projects
    .filter((project) => project !== null)
    .map((project) => ({
      slug: project.slug,
    }))
}

/**
 * Generates metadata for the project page
 */
export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getContent('projects', slug)

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gemika.vercel.app'
  const projectUrl = `${siteUrl}/projects/${slug}`
  const imageUrl = project.frontmatter.coverImage || '/og-project.jpg'
  const keywords = [
    ...((project.frontmatter.tags as string[]) || []),
    project.frontmatter.category as string,
    'UX Design',
    'Project Portfolio',
    'Case Study',
    'Design Process',
    'Creative Technology',
  ].filter(Boolean)

  return {
    title: `${project.frontmatter.title} | Projects Portfolio`,
    description:
      project.frontmatter.description ||
      project.frontmatter.excerpt ||
      `Explore the ${project.frontmatter.title} project case study and design process.`,
    keywords,
    authors: [{ name: 'Gemika Haziq Nugroho' }],
    creator: 'Gemika Haziq Nugroho',
    publisher: 'Gemika Haziq Nugroho',
    openGraph: {
      title: project.frontmatter.title,
      description:
        project.frontmatter.description ||
        project.frontmatter.excerpt ||
        `Explore the ${project.frontmatter.title} project case study and design process.`,
      type: 'website',
      url: projectUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.frontmatter.title,
        },
      ],
      tags: project.frontmatter.tags as string[],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.frontmatter.title,
      description:
        project.frontmatter.description ||
        project.frontmatter.excerpt ||
        `Explore the ${project.frontmatter.title} project case study and design process.`,
      images: [imageUrl],
      creator: '@gemika',
    },
    alternates: {
      canonical: projectUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Renders a tag with appropriate color styling
 */
function ProjectTag({ tag, index }: { tag: string; index: number }) {
  const colorIndex = index % TAG_COLORS.length
  const color = TAG_COLORS[colorIndex]

  return (
    <span
      className={`${color.bg} ${color.text} rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 dark:border-gray-700/50`}
    >
      {tag}
    </span>
  )
}

/**
 * Renders the back button to projects list
 */
function BackButton() {
  return (
    <Link
      href="/projects"
      className="group inline-flex items-center text-gray-600 transition-all duration-300 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
    >
      <div className="relative mr-2 h-10 w-10 rounded-full border border-gray-200 bg-white p-2 shadow-sm transition-colors group-hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:bg-indigo-900/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 text-gray-500 transition-colors group-hover:text-indigo-600 dark:text-gray-400 dark:group-hover:text-indigo-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </div>
      <span className="font-medium">All Projects</span>
    </Link>
  )
}

/**
 * Renders the project header section
 */
function ProjectHeader({ title, excerpt }: { title: string; excerpt: string }) {
  return (
    <div className="space-y-6">
      <h1 className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-5xl font-bold leading-tight text-transparent dark:from-indigo-500 dark:to-emerald-500 md:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="max-w-3xl text-xl text-gray-600 dark:text-gray-300">{excerpt}</p>
    </div>
  )
}

/**
 * Renders the project cover image with tags and category
 */
function ProjectCoverImage({
  imageUrl,
  title,
  category,
  tags,
}: {
  imageUrl: string
  title: string
  category: string
  tags: string[]
}) {
  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
      <div className="absolute inset-0 rounded-2xl p-[2px]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative h-full w-full overflow-hidden rounded-[15px] bg-white dark:bg-gray-800">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

      {/* Category at bottom right */}
      <div className="absolute bottom-4 right-4 z-10">
        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {category}
        </span>
      </div>

      {/* Floating tags at bottom */}
      {tags?.length > 0 && (
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <ProjectTag key={index} tag={tag} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Renders the project content section
 */

function ProjectContent({ content }: { content: MDXRemoteSerializeResult }) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-700 prose-img:rounded-xl prose-img:shadow-md dark:prose-headings:text-white dark:prose-a:text-indigo-400 dark:hover:prose-a:text-indigo-300">
      <ClientOnly>
        <MDXProviderClient source={content} />
      </ClientOnly>
    </div>
  )
}

/**
 * Renders the project gallery section
 */
function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  if (!images?.length) return null

  return (
    <div className="space-y-6">
      <h2 className="flex items-center text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
        <svg
          className="mr-2 h-6 w-6 text-indigo-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2V12a2 2 0 002-2z"
          />
        </svg>
        Project Gallery
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute inset-0 rounded-2xl p-[2px]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative h-full w-full overflow-hidden rounded-[15px] bg-white dark:bg-gray-800">
                <Image
                  src={image || '/placeholder.svg'}
                  alt={`${title} gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  )
}

import { PaginationLink } from '@/components/navigation/pagination-link'

function ProjectPagination({
  prevProject,
  nextProject,
}: {
  prevProject: Post | null
  nextProject: Post | null
}) {
  return (
    <nav
      className="mt-16 border-t border-gray-200/60 pt-8 dark:border-gray-700/60"
      aria-label="Project navigation"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        {prevProject && (
          <div className="flex-1">
            <PaginationLink
              item={prevProject}
              direction="prev"
              href={`/projects/${prevProject.slug}`}
            />
          </div>
        )}

        {nextProject && (
          <div className="flex-1">
            <PaginationLink
              item={nextProject}
              direction="next"
              href={`/projects/${nextProject.slug}`}
            />
          </div>
        )}
      </div>
    </nav>
  )
}

/**
 * Renders the project details sidebar card
 */
function ProjectDetailsCard({ project }: { project: Post }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white bg-opacity-70 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-70">
      <h2 className="mb-6 flex items-center text-xl font-bold text-gray-900 dark:text-white">
        <svg
          className="mr-2 h-5 w-5 text-indigo-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Project Details
      </h2>

      <div className="space-y-6">
        <DetailItem
          icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          label="Client"
          value={project.frontmatter.client as string}
        />

        <DetailItem
          icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          label="Category"
          value={project.frontmatter.category as string}
        />

        <DetailItem
          icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          label="Year"
          value={project.frontmatter.year as string}
        />

        {project.frontmatter.website && <WebsiteLink url={project.frontmatter.website as string} />}
      </div>

      <div className="mt-8">
        <Button className="w-full transform rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 py-6 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl">
          About This Project
        </Button>
      </div>
    </div>
  )
}

/**
 * Renders a single detail item in the project details card
 */
function DetailItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div>
      <h3 className="mb-1 flex items-center text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
        </svg>
        {label}
      </h3>
      <p className="text-lg font-medium text-gray-900 dark:text-white">{value}</p>
    </div>
  )
}

/**
 * Renders the website link in project details
 */
function WebsiteLink({ url }: { url: string }) {
  return (
    <div>
      <h3 className="mb-1 flex items-center text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        Website
      </h3>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center text-lg font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        Visit Live Site
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </a>
    </div>
  )
}

/**
 * Renders the technologies used card
 */
function TechnologiesCard({ tags }: { tags: string[] }) {
  if (!tags?.length) return null

  return (
    <div className="rounded-2xl border border-gray-200 bg-white bg-opacity-70 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-70">
      <h2 className="mb-4 flex items-center text-xl font-bold text-gray-900 dark:text-white">
        <svg
          className="mr-2 h-5 w-5 text-indigo-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
        Technologies Used
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <ProjectTag key={index} tag={tag} index={index} />
        ))}
      </div>
    </div>
  )
}

/**
 * Renders the related projects CTA section
 */
function RelatedProjectsCTA() {
  return (
    <section className="relative mt-16 overflow-hidden py-20">
      {/* Animated gradient background */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20 overflow-hidden">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-0 -right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-20 left-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
      </div> */}

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Explore More Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover other case studies and projects in my portfolio
          </p>
        </div>
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="inline-flex transform items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl"
          >
            View All Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

/**
 * Main project page component
 */
async function ProjectPageContent({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const project = await getContent('projects', slug)
  if (!project) {
    notFound()
  }

  // Properly serialize the MDX content
  const serializedContent = await serialize(project.content || '')

  // Get all projects for pagination
  const allProjects = await getAllContent('projects')
  const currentIndex = allProjects.findIndex((p) => p?.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  // Create JSON-LD structured data
  const jsonLd: WithContext<any> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.frontmatter.title,
    description: project.frontmatter.excerpt as string,
    image: project.frontmatter.coverImage as string,
    creator: {
      '@type': 'Person',
      name: 'Gemika Haziq Nugroho',
    },
    dateCreated: project.frontmatter.year,
    keywords: project.frontmatter.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://gemika.vercel.app/projects/${slug}`,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <JsonLd data={jsonLd} />

      <main>
        {/* Project Content - Removed the back button section */}
        <section className="container mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {/* Main Content */}
            <div className="space-y-12 lg:col-span-3">
              <ProjectHeader
                title={project.frontmatter.title}
                excerpt={project.frontmatter.excerpt as string}
              />

              <ProjectCoverImage
                imageUrl={project.frontmatter.coverImage as string}
                title={project.frontmatter.title}
                category={project.frontmatter.category as string}
                tags={project.frontmatter.tags as string[]}
              />

              {/* Pass the serialized content to the ProjectContent component */}
              <ProjectContent content={serializedContent} />

              <ProjectGallery
                images={project.frontmatter.gallery as string[]}
                title={project.frontmatter.title}
              />
            </div>

            {/* Sidebar with sticky details */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                <ProjectDetailsCard project={project} />
                <TechnologiesCard tags={project.frontmatter.tags as string[]} />
              </div>
            </div>
          </div>

          <ProjectPagination prevProject={prevProject} nextProject={nextProject} />
        </section>

        <RelatedProjectsCTA />
      </main>
    </div>
  )
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <ProjectPageContent params={params} />
    </>
  )
}
