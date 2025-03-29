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

<<<<<<< HEAD
=======
  // Get all projects for pagination
  const allProjects = await getAllContent("projects")
  const currentIndex = allProjects.findIndex(p => p?.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

>>>>>>> 938797c (fix the projects controller to stable hydration)
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

  // Color palette for tags
  const TAG_COLORS = [
    { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-300" },
    { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-300" },
    { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-300" },
    { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-300" },
    { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-300" },
  ]

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
=======
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
>>>>>>> 938797c (fix the projects controller to stable hydration)
      <JsonLd data={jsonLd} />
      <main>
        {/* Animated Back Button */}
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Link
            href="/projects"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 group"
          >
            <div className="relative h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-2 mr-2 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="font-medium">All Projects</span>
          </Link>
        </div>

        {/* Project Content */}
        <section className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
<<<<<<< HEAD
              {/* Project Header with floating category */}
              <div className="relative space-y-6">
                <div className="absolute -top-4 -left-4 z-10">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform rotate-[-4deg] hover:rotate-0 transition-transform duration-300">
                    {project.frontmatter.category as string}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white pt-6">
=======
              {/* Project Header */}
              <div className="relative space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 pt-6">
>>>>>>> 938797c (fix the projects controller to stable hydration)
                  {project.frontmatter.title as string}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                  {project.frontmatter.excerpt as string}
                </p>
              </div>

<<<<<<< HEAD
              {/* Cover Image with floating tags */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src={(project.frontmatter.coverImage as string) || "/placeholder.svg"}
                  alt={project.frontmatter.title as string}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
=======
              {/* Cover Image with floating category and tags */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                {/* Border gradient effect */}
                <div className="absolute inset-0 rounded-2xl p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                <div className="absolute inset-0 rounded-2xl p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 animate-spin-slow"></div>

                <div className="relative h-full w-full rounded-2xl overflow-hidden">
                  <Image
                    src={(project.frontmatter.coverImage as string) || "/placeholder.svg"}
                    alt={project.frontmatter.title as string}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
>>>>>>> 938797c (fix the projects controller to stable hydration)

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

<<<<<<< HEAD
                {/* Floating tags at bottom */}
                {(project.frontmatter.tags as string[])?.length > 0 && (
                  <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
=======
                {/* Category button positioned at bottom right */}
                <div className="absolute bottom-4 right-4 z-10">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500/80 to-purple-600/80 text-white backdrop-blur-sm border border-white/20 shadow-lg hover:scale-105 transition-transform duration-300">
                    {project.frontmatter.category as string}
                  </span>
                </div>

                {/* Floating tags at bottom left */}
                {(project.frontmatter.tags as string[])?.length > 0 && (
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
>>>>>>> 938797c (fix the projects controller to stable hydration)
                    {(project.frontmatter.tags as string[])?.map((tag, index) => {
                      const colorIndex = index % TAG_COLORS.length
                      const color = TAG_COLORS[colorIndex]

                      return (
                        <span
                          key={index}
                          className={`${color.bg} ${color.text} px-3 py-1.5 text-xs font-semibold rounded-full backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-sm hover:scale-105 transition-all duration-300`}
                        >
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Project Content with animated background */}
              <div className="relative">
                {/* Blurry background effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-800/50 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-700 dark:hover:prose-a:text-indigo-300 prose-img:rounded-xl prose-img:shadow-md">
                  <DynamicClientMDXRenderer source={serializedContent} />
                </div>
              </div>

              {/* Project Gallery */}
              {(project.frontmatter.gallery as string[])?.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                    <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(project.frontmatter.gallery as string[])?.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                      >
<<<<<<< HEAD
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.frontmatter.title as string} gallery image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
=======
                        {/* Border gradient effect */}
                        <div className="absolute inset-0 rounded-2xl p-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                        <div className="absolute inset-0 rounded-2xl p-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 animate-spin-slow"></div>

                        <div className="relative h-full w-full rounded-2xl overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${project.frontmatter.title as string} gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
>>>>>>> 938797c (fix the projects controller to stable hydration)
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
<<<<<<< HEAD
=======

              {/* Pagination */}
              <div className="flex items-center justify-between pt-12 border-t border-gray-200 dark:border-gray-700">
                {prevProject ? (
                  <Link
                    href={`/projects/${prevProject.slug}`}
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 group"
                  >
                    <div className="relative h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-2 mr-2 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Previous Project</span>
                      <p className="font-medium">{prevProject.frontmatter.title}</p>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}

                {nextProject ? (
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 group ml-auto text-right"
                  >
                    <div className="text-right">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Next Project</span>
                      <p className="font-medium">{nextProject.frontmatter.title}</p>
                    </div>
                    <div className="relative h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-2 ml-2 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Link>
                ) : (
                    <div>
                  </div>
                )}
              </div>
>>>>>>> 938797c (fix the projects controller to stable hydration)
            </div>

            {/* Sidebar with sticky details */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Project Details Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-opacity-70 dark:bg-opacity-70">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Project Details
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Client
                      </h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {project.frontmatter.client as string}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Category
                      </h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {project.frontmatter.category as string}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Year
                      </h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {project.frontmatter.year as string}
                      </p>
                    </div>

                    {project.frontmatter.website && (
                      <div>
                        <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          Website
                        </h3>
                        <a
                          href={project.frontmatter.website as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center group"
                        >
                          Visit Live Site
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                    <Button className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                      About This Project
                    </Button>
                  </div>
                </div>

                {/* Technologies Card */}
                {(project.frontmatter.tags as string[])?.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-opacity-70 dark:bg-opacity-70">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                      Technologies Used
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {(project.frontmatter.tags as string[])?.map((tag, index) => {
                        const colorIndex = index % TAG_COLORS.length
                        const color = TAG_COLORS[colorIndex]

                        return (
                          <span
                            key={index}
                            className={`${color.bg} ${color.text} px-3 py-1.5 text-xs font-semibold rounded-full backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-sm hover:scale-105 transition-all duration-300`}
                          >
                            {tag}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects CTA with gradient background */}
        <section className="relative py-20 mt-16 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-900/20 dark:to-purple-900/20 overflow-hidden">
<<<<<<< HEAD
            <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute top-0 -right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
            <div className="absolute -bottom-20 left-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
=======
            <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000">
            </div>
            <div className="absolute top-0 -right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000">
            </div>
            <div className="absolute -bottom-20 left-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob">
            </div>
>>>>>>> 938797c (fix the projects controller to stable hydration)
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
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
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center"
              >
                View All Projects
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
