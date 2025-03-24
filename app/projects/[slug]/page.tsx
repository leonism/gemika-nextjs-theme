import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { getContent, getAllContent } from "@/lib/content"
import JsonLd from "@/components/json-ld"
import type { WithContext } from "schema-dts"
import { serialize } from "next-mdx-remote/serialize"
import DynamicClientMDXRenderer from "@/components/DynamicClientMDXRenderer"

interface ProjectPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const projects = await getAllContent("projects")
  return projects
    .filter((project) => project !== null)
    .map((project) => ({
      slug: project.slug,
    }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getContent("projects", slug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${project.frontmatter.title} | Daryl Mercer Projects`,
    description: project.frontmatter.excerpt,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.excerpt,
      images: [
        {
          url: project.frontmatter.coverImage as string,
          width: 1200,
          height: 630,
          alt: project.frontmatter.title as string,
        },
      ],
      type: "website",
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getContent("projects", slug)
  if (!project) {
    notFound()
  }
  const serializedContent = await serialize(project.content || "")

  // Create JSON-LD structured data
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.frontmatter.title as string,
    description: project.frontmatter.excerpt as string,
    image: project.frontmatter.coverImage as string,
    creator: {
      "@type": "Person",
      name: "Daryl Mercer",
    },
    dateCreated: project.frontmatter.year,
    keywords: project.frontmatter.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://example.com/projects/${slug}`,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <JsonLd data={jsonLd} />
      <main>
        {/* Back Button */}
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Link
            href="/projects"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Projects
          </Link>
        </div>

        {/* Project Content */}
        <section className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Project Header */}
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">
                  {project.frontmatter.category as string}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  {project.frontmatter.title as string}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                  {project.frontmatter.excerpt as string}
                </p>
              </div>

              {/* Cover Image */}
              <div className="aspect-video relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={(project.frontmatter.coverImage as string) || "/placeholder.svg"}
                  alt={project.frontmatter.title as string}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Project Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-300 prose-img:rounded-xl prose-img:shadow-md">
                <DynamicClientMDXRenderer source={serializedContent} />
              </div>

              {/* Project Gallery */}
              {(project.frontmatter.gallery as string[])?.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(project.frontmatter.gallery as string[])?.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-square rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.frontmatter.title as string} gallery image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Project Details Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Project Details
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                        Client
                      </h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {project.frontmatter.client as string}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                        Category
                      </h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {project.frontmatter.category as string}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                        Year
                      </h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {project.frontmatter.year as string}
                      </p>
                    </div>

                    {project.frontmatter.website && (
                      <div>
                        <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                          Website
                        </h3>
                        <a
                          href={project.frontmatter.website as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center"
                        >
                          Visit Live Site
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 ml-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    <Button className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                      Contact About This Project
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                {(project.frontmatter.tags as string[])?.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Technologies Used
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {(project.frontmatter.tags as string[])?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects CTA */}
        <section className="bg-gray-100 dark:bg-gray-800 py-16 mt-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Explore More Projects
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover other case studies and projects in my portfolio
              </p>
            </div>
            <div className="flex justify-center">
              <Link
                href="/projects"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center"
              >
                View All Projects
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 ml-2"
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
      </main>
    </div>
  )
}
