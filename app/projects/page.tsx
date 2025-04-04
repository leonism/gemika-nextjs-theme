import Image from "next/image"
import Link from "next/link"
import { getAllContent } from "@/lib/content"
import JsonLd from "@/components/json-ld"
import { Pagination } from "@/components/navigation/pagination"
import type { Metadata } from "next"
import { WebPage, WithContext } from "schema-dts"
import ClientOnly from "@/components/utility/client-only"
import { serialize } from 'next-mdx-remote/serialize'
import { components } from '@/components/mdx-components'
import { MDXContent } from '@/components/MDXContent'

export const metadata: Metadata = {
  title: "Projects |",
  description: "A showcase of my recent work across UX design, mobile development, and branding projects.",
}

const CATEGORY_COLORS = {
  design: { bg: "bg-indigo-100/80", text: "text-indigo-600" },
  development: { bg: "bg-emerald-100/80", text: "text-emerald-600" },
  branding: { bg: "bg-amber-100/80", text: "text-amber-600" },
  featured: { bg: "bg-rose-100/80", text: "text-rose-600" },
  "artificial intelligence": { bg: "bg-purple-100/80", text: "text-purple-600" },
  default: { bg: "bg-gray-100/80", text: "text-gray-600" }
}

const PROJECTS_PER_PAGE = 6

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  // Get all projects and sort by date (newest first)
  const allProjects = await getAllContent("projects")
  const sortedProjects = allProjects.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || a.frontmatter.year || '2000-01-01');
    const dateB = new Date(b.frontmatter.date || b.frontmatter.year || '2000-01-01');
    return dateB.getTime() - dateA.getTime();
  });

  // Serialize MDX content for each project
  const serializedProjects = await Promise.all(
    sortedProjects.map(async (project) => ({
      ...project,
      content: await serialize(project.content || ""),
    }))
  );

  // Pagination logic
  const resolvedSearchParams = await searchParams
  const page = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1
  const currentPage = isNaN(page) || page < 1 ? 1 : page

  // Calculate pagination
  const totalProjects = serializedProjects.length
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const currentProjects = serializedProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE)

  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects | Daryl Mercer",
    description: "A showcase of my recent work across UX design, mobile development, and branding projects.",
    url: "https://example.com/projects",
    isPartOf: {
      "@type": "WebSite",
      name: "Daryl Mercer",
      url: "https://example.com",
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd data={jsonLd} />
      <main>
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <span className="text-sm font-medium text-indigo-600">
                PORTFOLIO SHOWCASE
              </span>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                A curated collection of my recent work.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-7xl py-12 md:py-20">
          {currentProjects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProjects.map((project) => (
                <div key={project.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
                  <Link href={`/projects/${project.slug}`} className="flex flex-col h-full">
                    {/* Cover Image */}
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={project.frontmatter.coverImage || "/placeholder.svg"}
                        alt={project.frontmatter.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Category Badge */}
                      {project.frontmatter.category && (
                        <div className="absolute bottom-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            CATEGORY_COLORS[project.frontmatter.category?.toLowerCase() as keyof typeof CATEGORY_COLORS] ?
CATEGORY_COLORS[project.frontmatter.category?.toLowerCase() as keyof typeof CATEGORY_COLORS]?.bg :
                            CATEGORY_COLORS.default.bg
                          } ${
                            CATEGORY_COLORS[project.frontmatter.category?.toLowerCase() as keyof typeof CATEGORY_COLORS] ?
CATEGORY_COLORS[project.frontmatter.category?.toLowerCase() as keyof typeof CATEGORY_COLORS]?.text :
                            CATEGORY_COLORS.default.text
                          }`}>
                            {project.frontmatter.category}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      {/* Date/Year */}
                      <div className="text-sm text-gray-500 mb-2">
                        {project.frontmatter.date || project.frontmatter.year}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {project.frontmatter.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {project.frontmatter.excerpt}
                      </p>

                      {/* Client */}
                      {project.frontmatter.client && (
                        <div className="mt-auto mb-3">
                          <span className="text-sm text-gray-500">Client: </span>
                          <span className="text-sm font-medium text-gray-700">{project.frontmatter.client}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <ClientOnly>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/projects"
        />
      </ClientOnly>
    </div>
  )
}
