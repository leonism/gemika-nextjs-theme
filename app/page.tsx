import Image from "next/image"
import Link from "next/link"
import JsonLd from "@/components/json-ld"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { HomeLayout } from "@/components/layouts/home-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllContent } from "@/lib/content"
import { WithContext } from "schema-dts"

export default async function Home() {
  const featuredProjects = await getAllContent("projects")
  const latestPosts = await getAllContent("posts")

  // Limit content
  const limitedProjects = featuredProjects.slice(0, 5)
  const limitedPosts = latestPosts.slice(0, 9)

  // JSON-LD structured data
  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gemika Haziq Nugroho - UX Strategist & Mobile Developer",
    url: "https://example.com",
    description: "Expert user experience strategist and mobile developer portfolio",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://example.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  // Hero Section with enhanced animations
  const heroSection = (
    <div className="relative bg-gradient-to-b from-gray-50 to-white dark:from-[#111927] dark:to-[#1A2332] py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Floating gradient blobs - light mode only */}
      <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-0">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-0 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
        {/* Profile Image with pop effect */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-[#313F55] transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
              alt="Gemika Haziq Nugroho"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>
        </div>

        {/* Headings with enhanced gradients */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:text-white bg-clip-text text-transparent">
              Gemika Haziq Nugroho
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 dark:text-gray-300 bg-clip-text text-transparent">
              UX Strategist & Mobile Developer
            </span>
          </h2>
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
          Crafting exceptional digital experiences through thoughtful design and cutting-edge development.
        </p>

        {/* CTA Buttons with enhanced hover effects */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
          <Link
            href="/projects"
            className="relative px-6 sm:px-8 py-2.5 sm:py-3 overflow-hidden font-medium rounded-full group"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:translate-x-12 group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform -translate-x-12 -skew-x-12 bg-gradient-to-r from-indigo-700 to-purple-700 group-hover:translate-x-0 group-hover:skew-x-12"></span>
            <span className="relative text-white font-medium text-sm sm:text-base">View My Work</span>
          </Link>
          <Link
            href="/contact"
            className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-full font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#1A2332] hover:shadow-lg relative overflow-hidden group text-sm sm:text-base"
          >
            <span className="absolute inset-0 bg-gray-100 dark:bg-[#313F55] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            Get In Touch
          </Link>
        </div>

        {/* Brand Logos with enhanced hover */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {["Apple", "Adobe", "Google", "Microsoft", "Samsung", "Spotify", "Amazon", "Netflix"].map((brand, index) => (
            <div
              key={index}
              className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-all duration-300 hover:scale-110 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:bg-[#313F55]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src={`https://logo.clearbit.com/${brand.toLowerCase()}.com`}
                alt={brand}
                fill
                className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 dark:brightness-125"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Featured Projects Section with enhanced animations
  const featuredProjectsSection = (
    <div className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#111927]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-[#C4F468] mb-1 sm:mb-2 block">
              PORTFOLIO
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:text-white bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/projects"
              className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative group"
            >
              View all projects
              <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 dark:bg-[#C4F468] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {limitedProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 ${index === 0 ? 'md:col-span-2' : ''}`}
            >
              {/* Project Image with zoom effect */}
              <div className={`relative ${index === 0 ? 'aspect-[16/8]' : 'aspect-[16/9]'} overflow-hidden`}>
                <Image
                  src={project.frontmatter.coverImage || "/placeholder.svg"}
                  alt={project.frontmatter.title as string}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                {/* Floating tags with colored backgrounds */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap gap-1 sm:gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full backdrop-blur-sm border border-white/20 shadow-sm">
                    {project.frontmatter.category}
                  </span>
                  {index === 0 && (
                    <span className="px-2 sm:px-3 py-1 bg-rose-600 text-white text-xs font-medium rounded-full backdrop-blur-sm border border-white/20 shadow-sm">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom gradient animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  // Trending Topics Section with enhanced animations
  const trendingTopicsSection = (
    <div className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-[#1A2332]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-[#C4F468] mb-1 sm:mb-2 block">
            EXPERTISE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 dark:text-white bg-clip-text text-transparent">
              My Core Specializations
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Areas where I bring the most value to projects and teams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "UX Design",
              description: "Principles, methods, and tools for creating exceptional user experiences",
              image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
              count: 8,
              tags: ["Research", "Wireframing", "Prototyping"],
              color: "bg-indigo-600"
            },
            {
              title: "Mobile Development",
              description: "Building responsive, cross-platform mobile applications",
              image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
              count: 6,
              tags: ["Flutter", "React Native", "Swift"],
              color: "bg-emerald-600"
            },
            {
              title: "Design Systems",
              description: "Creating scalable and consistent design systems for products",
              image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
              count: 5,
              tags: ["Figma", "Storybook", "Tokens"],
              color: "bg-amber-600"
            }
          ].map((topic, index) => (
            <Link
              key={index}
              href={`/category/${topic.title.toLowerCase().replace(' ', '-')}`}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white dark:bg-[#141D2B] shadow-lg transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Topic Image with zoom effect */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Floating tags */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap gap-1 sm:gap-2">
                  {topic.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`${topic.color} text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm bg-opacity-90 border border-white/20`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content with pop-up effect */}
              <div className="p-4 sm:p-6 relative">
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:text-white bg-clip-text text-transparent">
                      {topic.title}
                    </span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                    {topic.description}
                  </p>
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center mr-3 sm:mr-4">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {topic.count} projects
                    </span>
                    <span className="flex items-center text-indigo-600 dark:text-[#C4F468]">
                      Explore
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </span>
                  </div>
                </div>
                {/* Soft blurry background effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/30 dark:from-[#141D2B]/80 dark:to-[#141D2B]/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl sm:rounded-b-2xl"></div>
              </div>

              {/* Bottom gradient animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  // Latest Posts Section with enhanced animations
  const latestPostsSection = (
    <div className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#111927]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-[#C4F468] mb-1 sm:mb-2 block">
              BLOG
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:text-white bg-clip-text text-transparent">
                Latest Articles
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/posts"
              className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative group"
            >
              View all articles
              <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 dark:bg-[#C4F468] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {limitedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white dark:bg-[#141D2B] shadow-lg transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Post Image with zoom effect */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.frontmatter.coverImage || "/placeholder.svg"}
                  alt={post.frontmatter.title || "Untitled Post"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content with pop-up effect */}
              <div className="p-4 sm:p-6 relative">
                <div className="relative z-10">
                  <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:bg-[#313F55]/20 text-indigo-600 dark:text-[#C4F468] text-xs font-medium rounded-full">
                      {(post.frontmatter.tags || ["Uncategorized"])[0]}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {post.frontmatter.date || "Unknown date"}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-indigo-600 dark:group-hover:text-[#C4F468] transition-colors">
                    {post.frontmatter.title || "Untitled Post"}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3">
                    {post.frontmatter.excerpt || "No excerpt available."}
                  </p>
                  <div className="inline-flex items-center text-indigo-600 dark:text-[#C4F468] font-medium text-sm sm:text-base">
                    Read more
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
                {/* Soft blurry background effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/30 dark:from-[#141D2B]/80 dark:to-[#141D2B]/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl sm:rounded-b-2xl"></div>
              </div>

              {/* Bottom gradient animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
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
