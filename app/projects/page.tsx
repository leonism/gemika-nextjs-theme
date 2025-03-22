import Image from "next/image"
import Link from "next/link"
import { getAllContent } from "@/lib/content"
import JsonLd from "@/components/json-ld"
import type { Metadata } from "next"
import type { WebPage, WithContext } from "schema-dts"

export const metadata: Metadata = {
  title: "Projects | Gemika",
  description: "A showcase of my recent work across UX design, mobile development, and branding projects.",
}

export default async function ProjectsPage() {
  const projects = await getAllContent("projects")

  // Create JSON-LD structured data
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects | Gemika",
    description: "A showcase of my recent work across UX design, mobile development, and branding projects.",
    url: "https://Gemika.netlify.app/projects",
    isPartOf: {
      "@type": "WebSite",
      name: "Gemika",
      url: "https://Gemika.netlify.app",
    },
  }

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      <main>
        <section className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
            A showcase of my recent work across UX design, mobile development, and branding projects.
          </p>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No projects found</h2>
              <p className="text-gray-600 dark:text-gray-400">Check back soon for new projects!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
                  <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-video relative mb-4">
                    <Image
                      src={(project.frontmatter.coverImage as string) || "/placeholder.svg"}
                      alt={project.frontmatter.title as string}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                    {project.frontmatter.title as string}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {project.frontmatter.category as string}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">{project.frontmatter.excerpt as string}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
