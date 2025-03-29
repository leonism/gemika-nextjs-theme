import Image from "next/image"
import Link from "next/link"
import { getAllContent } from "@/lib/content"
import JsonLd from "@/components/json-ld"
import type { Metadata } from "next"
import { WebPage, WithContext } from "schema-dts"

export const metadata: Metadata = {
  title: "Projects | Daryl Mercer",
  description: "A showcase of my recent work across UX design, mobile development, and branding projects.",
}

const CATEGORY_COLORS = {
  design: { bg: "bg-indigo-100/80 dark:bg-indigo-900/20", text: "text-indigo-600 dark:text-indigo-300" },
  development: { bg: "bg-emerald-100/80 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-300" },
  branding: { bg: "bg-amber-100/80 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-300" },
  featured: { bg: "bg-rose-100/80 dark:bg-rose-900/20", text: "text-rose-600 dark:text-rose-300" },
  default: { bg: "bg-gray-100/80 dark:bg-gray-700/50", text: "text-gray-600 dark:text-gray-300" }
}

const PROJECTS_PER_PAGE = 6

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  // First get all projects (await this first)
  const allProjects = await getAllContent("projects")

  // Then handle searchParams
  const page = searchParams?.page ? parseInt(searchParams.page) : 1
  const currentPage = isNaN(page) || page < 1 ? 1 : page

  // Calculate pagination
  const totalProjects = allProjects.length
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const currentProjects = allProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE)

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <JsonLd data={jsonLd} />
      <main>
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                PORTFOLIO SHOWCASE
              </span>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                A curated collection of my recent work.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-7xl py-12 md:py-20">
          {currentProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                No projects available yet
              </h2>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project) => {
                  const category = (project.frontmatter.category as string)?.toLowerCase() || 'default'
                  const colorScheme = CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.default

                  return (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.frontmatter.coverImage as string}
                          alt={project.frontmatter.title as string}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                          <span className={`text-xs font-semibold ${colorScheme.bg} ${colorScheme.text} px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-sm`}>
                            {project.frontmatter.category as string}
                          </span>
                        </div>
                      </div>

                      <div className="relative p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                          {project.frontmatter.title as string}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                          {project.frontmatter.excerpt as string}
                        </p>
                        <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                          View case study
                          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-16">
                  <nav className="flex items-center gap-2">
                    <Link
                      href={`/projects?page=${Math.max(1, currentPage - 1)}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-disabled={currentPage === 1}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </Link>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Link
                        key={pageNum}
                        href={`/projects?page=${pageNum}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                          pageNum === currentPage
                            ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white shadow-md'
                            : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    ))}

                    <Link
                      href={`/projects?page=${Math.min(totalPages, currentPage + 1)}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      aria-disabled={currentPage === totalPages}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </nav>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  )
}
