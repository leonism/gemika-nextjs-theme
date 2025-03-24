import Image from "next/image"
import Link from "next/link"
import { getAllContent } from "@/lib/content"
import JsonLd from "@/components/json-ld"
import type { Metadata } from "next"
import type { WebPage, WithContext } from "schema-dts"

export const metadata: Metadata = {
  title: "Projects | Daryl Mercer",
  description: "A showcase of my recent work across UX design, mobile development, and branding projects.",
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <JsonLd data={jsonLd} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 block">
                PORTFOLIO SHOWCASE
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                My <span className="text-indigo-600 dark:text-indigo-400">Projects</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                A curated collection of my recent work across UX design, mobile development, and branding projects.
                Each piece represents a unique challenge and creative solution.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="container mx-auto px-4 max-w-6xl py-16">
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={(project.frontmatter.coverImage as string) || "/placeholder.svg"}
                      alt={project.frontmatter.title as string}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded-full">
                        {project.frontmatter.category as string}
                      </span>
                      {project.frontmatter.featured && (
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.frontmatter.title as string}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                      {project.frontmatter.excerpt as string}
                    </p>
                    <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      View case study
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        {projects.length > 0 && (
          <section className="bg-gray-100 dark:bg-gray-800 py-16">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Want to see more of my work?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                I'm constantly working on new projects and case studies. Feel free to reach out if you'd like to discuss
                potential collaborations or see additional examples of my work.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  Get in touch
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-full font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Learn about my process
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
