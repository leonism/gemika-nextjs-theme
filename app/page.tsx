/**
 * Main Home Page Component
 *
 * Clean, structured layout with minimal nesting and clear section hierarchy.
 * Responsive design maintained with Tailwind viewports (sm, md, lg, xl).
 */
import Image from "next/image"
import Link from "next/link"
import JsonLd from "@/components/json-ld"
import { ChevronRight } from "lucide-react"
import { HomeLayout } from "@/components/layouts/home-layout"
import { getAllContent } from "@/lib/content"
import { WithContext } from "schema-dts"
import { Footer } from "@/components/navigation/footer"
import { Breadcrumbs } from "@/components/navigation/breadcrumbs"

// Constants - Kept at top for easy reference
const BRANDS = ["Apple", "Adobe", "Google", "Microsoft", "Samsung", "Spotify", "Amazon", "Netflix"];

// Trending topics data for the expertise section
const trendingTopics = [
  {
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "UX Design",
    description: "Principles, methods, and tools for creating exceptional user experiences",
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
];

export default async function Home() {
  const [featuredProjects, latestPosts] = await Promise.all([
    getAllContent("projects").then(projects => projects.slice(0, 5)),
    getAllContent("posts").then(posts => posts.slice(0, 9))
  ]);

  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gemika Haziq Nugroho - UX Strategist & Mobile Developer",
    url: "https://gemika.vercel.app",
    description: "Expert user experience strategist and mobile developer portfolio",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://gemika.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbs = [
    { href: '/', label: 'Home' }
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeLayout>
        {/* Hero Section - Minimal nesting */}
        <section className="relative bg-gray-50 py-8 sm:py-12 md:py-24 lg:py-28 xl:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center relative z-10">

            {/* Profile Image */}
            <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-xl border-4 border-white transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
                  alt="Gemika Haziq Nugroho"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
              </div>
            </div>

            {/* Headings */}
            <div className="space-y-3 sm:space-y-4 md:space-y-5 mb-6 sm:mb-8 md:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Gemika Haziq Nugroho
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
                <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 bg-clip-text text-transparent">
                  UX Strategist & Mobile Developer
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed">
              Crafting exceptional digital experiences through thoughtful design and cutting-edge development.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mb-10 sm:mb-12 md:mb-16">
              <Link href="/projects" className="relative px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 overflow-hidden font-medium rounded-full group">
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:translate-x-12 group-hover:skew-x-12">
                </span>
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform -translate-x-12 -skew-x-12 bg-gradient-to-r from-indigo-700 to-purple-700 group-hover:translate-x-0 group-hover:skew-x-12">
                </span>
                <span className="relative text-white font-medium text-sm sm:text-base md:text-lg">
                  View My Work
                </span>
              </Link>
              <Link href="/contact" className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg relative overflow-hidden group text-sm sm:text-base md:text-lg">
                <span className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                </span>
                Get In Touch
              </Link>
            </div>

            {/* Brand Logos */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
              {BRANDS.map((brand, index) => (
                <div key={index} className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 transition-all duration-300 hover:scale-110 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                  <Image
                    src={`https://logo.clearbit.com/${brand.toLowerCase()}.com`}
                    alt={brand}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 rounded-full p-1 group-hover:p-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects - Flattened structure */}
        <section className="py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 mb-2.5 bg-white rounded-[12px]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-3 sm:gap-4">
              <div>
                <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <span className="text-sm font-medium text-indigo-600">
                  PORTFOLIO
                </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                    Featured Projects
                  </span>
                </h2>
              </div>
              <Link href="/projects" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-medium text-gray-500 hover:text-gray-900 transition-colors relative group">
                View all projects
                <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 transition-all duration-300 group-hover:w-full">
                </span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={`group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 ${index === 0 ? 'md:col-span-2' : ''}`}
                >
                  <div className={`relative ${index === 0 ? 'aspect-[16/8]' : 'aspect-[16/9]'} overflow-hidden`}>
                    <Image
                      src={project.frontmatter.coverImage || "/placeholder.svg"}
                      alt={project.frontmatter.title as string}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
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
                  <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Section - Simplified */}
        <section className="py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 mb-2.5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
              <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <span className="text-sm font-medium text-indigo-600">
                  AREA OF EXPERTISE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
                <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent">
                  My Core Specializations
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto">
                Areas where I bring the most value to projects and teams
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {trendingTopics.map((topic) => (
                <Link
                  key={topic.title}
                  href={`/category/${topic.title.toLowerCase().replace(' ', '-')}`}
                  className="group relative overflow-hidden bg-white rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={topic.image} alt={topic.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap gap-1 sm:gap-2">
                      {topic.tags.map((tag: string, index: number) => (
                        <span key={index} className={`${topic.color} text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm bg-opacity-90 border border-white/20`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 relative">
                    <div className="relative z-10">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {topic.title}
                        </span>
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                        {topic.description}
                      </p>
                      <div className="flex items-center text-xs sm:text-sm text-gray-500">
                        <span className="flex items-center mr-3 sm:mr-4">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {topic.count} projects
                        </span>
                        <span className="flex items-center text-indigo-600">
                          Explore
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl sm:rounded-b-2xl">
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500">
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Posts - Clean structure */}
        <section className="sm:py-4 lg:py-8 xl:py-10 mb-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-3 sm:gap-4">
              <div>
                <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                  <span className="text-sm font-medium text-indigo-600">
                    BLOG
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                    Latest Articles
                  </span>
                </h2>
              </div>
              <Link href="/posts" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-medium text-gray-500 hover:text-gray-900 transition-colors relative group">
                View all articles
                <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 transition-all duration-300 group-hover:w-full">
                </span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl bg-white"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.frontmatter.coverImage || "/placeholder.svg"}
                      alt={post.frontmatter.title || "Untitled Post"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  </div>
                  <div className="p-4 sm:p-6 relative">
                    <div className="relative z-10">
                      <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 text-xs sm:text-sm font-medium rounded-full">
                          {(post.frontmatter.tags || ["Uncategorized"])[0]}
                        </span>
                        <span className="flex items-center text-xs sm:text-sm text-gray-500">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) || "Unknown date"}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3 group-hover:text-indigo-600 transition-colors">
                        {post.frontmatter.title || "Untitled Post"}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4 line-clamp-2 sm:line-clamp-3">
                        {post.frontmatter.excerpt || "No excerpt available."}
                      </p>
                      <div className="inline-flex items-center text-indigo-600 font-medium text-xs sm:text-sm md:text-base">
                        Read more
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500">
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </HomeLayout>
    </>
  );
}
