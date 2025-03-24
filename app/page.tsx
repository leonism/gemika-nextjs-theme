import Image from "next/image"
import Link from "next/link"
import JsonLd from "@/components/json-ld"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { HomeLayout } from "@/components/layouts/home-layout"
import { getAllContent } from "@/lib/content"
import { WithContext } from "schema-dts"

export default async function Home() {
  const featuredProjects = await getAllContent("projects")
  const latestPosts = await getAllContent("posts")

  // Limit to 4 featured projects and 3 latest posts
  const limitedProjects = featuredProjects.slice(0, 4)
  const limitedPosts = latestPosts.slice(0, 3)

  // Create JSON-LD structured data
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Daryl Mercer - UX Strategist & Mobile Developer",
    url: "https://example.com",
    description: "Expert user experience strategist and mobile developer portfolio",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://example.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  // Hero Section
  const heroSection = (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        {/* Profile Image */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
              alt="Daryl Mercer"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Daryl Mercer
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            <span className="bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
              UX Strategist & Mobile Developer
            </span>
          </h2>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Crafting exceptional digital experiences through thoughtful design and cutting-edge development.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            href="/projects"
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            View My Work
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Get In Touch
          </Link>
        </div>

        {/* Brand Logos */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-80 hover:opacity-100 transition-opacity duration-300">
          {[
            "Apple", "Adobe", "Google", "Microsoft", "Samsung",
            "Spotify", "Amazon", "Netflix"
          ].map((brand, index) => (
            <div key={index} className="relative w-12 h-12 md:w-16 md:h-16 grayscale hover:grayscale-0 transition-all duration-300">
              <Image
                src={`https://logo.clearbit.com/${brand.toLowerCase()}.com`}
                alt={brand}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  // Featured Projects Section
  const featuredProjectsSection = (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 block">
              PORTFOLIO
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-gray-100 dark:via-gray-300 dark:to-gray-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/projects" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              View all projects
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {limitedProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:shadow-2xl ${index === 0 ? 'md:col-span-2' : ''}`}
            >
              {/* Project Image */}
              <div className={`relative ${index === 0 ? 'aspect-[16/8]' : 'aspect-[16/9]'} overflow-hidden`}>
                <Image
                  src={project.frontmatter.coverImage || "/placeholder.svg"}
                  alt={project.frontmatter.title as string}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>

              {/* Project Info */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium rounded-full">
                    {project.frontmatter.category}
                  </span>
                  {index === 0 && (
                    <span className="px-3 py-1 bg-white/10 text-white/90 text-xs font-medium rounded-full backdrop-blur-sm">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {project.frontmatter.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )

  // Trending Topics Section
  const trendingTopicsSection = (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 block">
            EXPERTISE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 dark:from-gray-200 dark:via-gray-300 dark:to-gray-400 bg-clip-text text-transparent">
              My Core Specializations
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Areas where I bring the most value to projects and teams
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "UX Design",
              description: "Principles, methods, and tools for creating exceptional user experiences",
              image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
              count: 8
            },
            {
              title: "Mobile Development",
              description: "Building responsive, cross-platform mobile applications",
              image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
              count: 6
            },
            {
              title: "Design Systems",
              description: "Creating scalable and consistent design systems for products",
              image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
              count: 5
            }
          ].map((topic, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-700 shadow-lg transition-all duration-500 hover:shadow-xl"
            >
              {/* Topic Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Topic Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {topic.title}
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {topic.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {topic.count} projects
                  </span>
                  <Link
                    href={`/category/${topic.title.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                  >
                    Explore
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  // Latest Posts Section
  const latestPostsSection = (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 block">
              BLOG
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-gray-100 dark:via-gray-300 dark:to-gray-400 bg-clip-text text-transparent">
                Latest Articles
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/posts" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              View all articles
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {limitedPosts.map((post) => (
            <article
              key={post.slug}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-all duration-500 hover:shadow-xl"
            >
              {/* Post Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.frontmatter.coverImage || "/placeholder.svg"}
                  alt={post.frontmatter.title || "Untitled Post"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded-full">
                    {(post.frontmatter.tags || ["Uncategorized"])[0]}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {post.frontmatter.date || "Unknown date"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.frontmatter.title || "Untitled Post"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.frontmatter.excerpt || "No excerpt available."}
                </p>
                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-medium"
                >
                  Read more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeLayout>
        {heroSection}
        {featuredProjectsSection}
        {trendingTopicsSection}
        {latestPostsSection}
      </HomeLayout>
    </>
  )
}
