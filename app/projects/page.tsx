import Image from "next/image"
import Link from "next/link"
import { getAllContent } from "@/lib/content"
import JsonLd from "@/components/json-ld"
import { Pagination } from "@/components/navigation/pagination"
import type { Metadata } from "next"
import { WebPage, WithContext } from "schema-dts"
import ClientOnly from "@/components/utility/client-only"
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { Footer } from '@/components/navigation/footer'

export const metadata: Metadata = {
  title: "Projects |",
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
  const allProjects = await getAllContent("projects")

  // Await searchParams before accessing properties
  const resolvedSearchParams = await searchParams
  const page = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1
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
            <p>No projects found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProjects.map((project) => (
                <div key={project.slug} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <Link href={`/projects/${project.slug}`}>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {project.excerpt}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Add Footer at the bottom */}
      <Footer />

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
