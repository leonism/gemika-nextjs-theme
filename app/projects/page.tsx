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

// Color system for project categories - updated with translucent colors
const CATEGORY_COLORS = {
  design: { bg: "bg-indigo-100/80 dark:bg-indigo-900/20", text: "text-indigo-600 dark:text-indigo-300" },
  development: { bg: "bg-emerald-100/80 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-300" },
  branding: { bg: "bg-amber-100/80 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-300" },
  featured: { bg: "bg-rose-100/80 dark:bg-rose-900/20", text: "text-rose-600 dark:text-rose-300" },
  default: { bg: "bg-gray-100/80 dark:bg-gray-700/50", text: "text-gray-600 dark:text-gray-300" }
}

export default async function ProjectsPage() {
  const projects = await getAllContent("projects")

  // Create JSON-LD structured data
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

  // Pagination variables (example with 3 pages)
  const currentPage = 1;
  const totalPages = 3;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <JsonLd data={jsonLd} />
      <main>
        {/* Hero Section with animated background */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            {/* Animated floating badge */}
            <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                PORTFOLIO SHOWCASE
              </span>
              <span className="ml-2 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
            </div>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500 dark:from-purple-500 dark:to-indigo-500">Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                A curated collection of my recent work across UX design, mobile development, and branding projects.
                Each piece represents a unique challenge and creative solution.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="container mx-auto px-4 max-w-7xl py-12 md:py-20">
          {projects.length === 0 ? (
            // Empty state with animation
            <div className="text-center py-20">
              <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                No projects available yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                I'm currently working on some exciting new projects. Check back soon!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => {
                  // Get category color scheme
                  const category = (project.frontmatter.category as string)?.toLowerCase() || 'default'
                  const colorScheme = CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.default

                  return (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                    >
                      {/* Project Image with floating tags */}
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={(project.frontmatter.coverImage as string) || "/placeholder.svg"}
                          alt={project.frontmatter.title as string}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                        {/* Floating category tags */}
                        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                          <span className={`text-xs font-semibold ${colorScheme.bg} ${colorScheme.text} px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-sm`}>
                            {project.frontmatter.category as string}
                          </span>
                          {project.frontmatter.featured && (
                            <span className="text-xs font-semibold bg-rose-100/80 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-sm">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="relative p-6">
                        {/* Content container */}
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            {project.frontmatter.title as string}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                            {project.frontmatter.excerpt as string}
                          </p>
                          <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-purple-400">
                            <span className="mr-1">Explore case study</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Soft blurry background effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/30 dark:from-gray-800/80 dark:to-gray-800/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
                      </div>

                      {/* Animated hover indicator */}
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-emerald-500 dark:from-purple-500 dark:to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </Link>
                  )
                })}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-16">
                <nav className="flex items-center gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                        page === currentPage
                          ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 dark:from-purple-500 dark:to-indigo-500 text-white shadow-md'
                          : 'border border-gray-200 dark:border-gray-700 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-emerald-500/10 dark:hover:bg-gray-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </nav>
              </div>
            </>
          )}
        </section>

        {/* CTA Section */}
        {projects.length > 0 && (
          <section className="bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 py-20">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <div className="relative inline-block mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">
                  Want to see more of my work?
                </h2>
                <div className="absolute -bottom-1 left-0 right-0 h-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full animate-pulse">
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                I'm constantly working on new projects and case studies. Feel free to reach out if you'd like to discuss
                potential collaborations or see additional examples of my work.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center"
                >
                  <span>Get in touch</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-full font-medium transition-all hover:bg-gray-200 dark:hover:bg-gray-700/50 hover:shadow-lg inline-flex items-center"
                >
                  <span>Learn about my process</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
