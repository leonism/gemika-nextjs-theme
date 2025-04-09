/**
 * Main Home Page Component
 *
 * Clean, structured layout with minimal nesting and clear section hierarchy.
 * Responsive design maintained with Tailwind viewports (sm, md, lg, xl).
 */
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { WithContext } from "schema-dts";

import JsonLd from "@/components/json-ld";
import { HomeLayout } from "@/components/layouts/home-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Footer } from "@/components/navigation/footer";
import { getAllContent } from "@/lib/content";

// Constants - Kept at top for easy reference
const BRANDS = [
  "Apple",
  "Adobe",
  "Google",
  "Microsoft",
  "Samsung",
  "Spotify",
  "Amazon",
  "Netflix",
];

// Trending topics data for the expertise section
const trendingTopics = [
  {
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "UX Design",
    description:
      "Principles, methods, and tools for creating exceptional user experiences",
    count: 8,
    tags: ["Research", "Wireframing", "Prototyping"],
    color: "bg-indigo-600",
  },
  {
    title: "Mobile Development",
    description: "Building responsive, cross-platform mobile applications",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    count: 6,
    tags: ["Flutter", "React Native", "Swift"],
    color: "bg-emerald-600",
  },
  {
    title: "Design Systems",
    description: "Creating scalable and consistent design systems for products",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    count: 5,
    tags: ["Figma", "Storybook", "Tokens"],
    color: "bg-amber-600",
  },
];

export default async function Home() {
  const [featuredProjects, latestPosts] = await Promise.all([
    getAllContent("projects").then((projects) => projects.slice(0, 5)),
    getAllContent("posts").then((posts) => posts.slice(0, 9)),
  ]);

  const jsonLd: WithContext<any> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gemika Haziq Nugroho - UX Strategist & Mobile Developer",
    url: "https://gemika.vercel.app",
    description:
      "Expert user experience strategist and mobile developer portfolio",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://gemika.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbs = [{ href: "/", label: "Home" }];

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeLayout>
        {/* Hero Section - Minimal nesting */}
        <section className="relative overflow-hidden bg-gray-50 py-8 sm:py-12 md:py-24 lg:py-28 xl:py-32">
          <div className="container relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            {/* Profile Image */}
            <div className="mb-6 flex justify-center sm:mb-8 md:mb-10">
              <div className="group relative h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-36 lg:w-36">
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
            <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4 md:mb-10 md:space-y-5">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Gemika Haziq Nugroho
                </span>
              </h1>
              <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 bg-clip-text text-transparent">
                  UX Strategist & Mobile Developer
                </span>
              </h2>
            </div>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-500 sm:mb-10 sm:max-w-2xl sm:text-lg md:mb-12 md:max-w-3xl md:text-xl lg:text-2xl">
              Crafting exceptional digital experiences through thoughtful design
              and cutting-edge development.
            </p>

            {/* Buttons */}
            <div className="mb-10 flex flex-wrap justify-center gap-3 sm:mb-12 sm:gap-4 md:mb-16 md:gap-5">
              <Link
                href="/projects"
                className="group relative overflow-hidden rounded-full px-5 py-2 font-medium sm:px-6 sm:py-2.5 md:px-8 md:py-3"
              >
                <span className="absolute inset-0 h-full w-full translate-x-0 -skew-x-12 transform bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out group-hover:translate-x-12 group-hover:skew-x-12"></span>
                <span className="absolute inset-0 h-full w-full -translate-x-12 -skew-x-12 transform bg-gradient-to-r from-indigo-700 to-purple-700 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:skew-x-12"></span>
                <span className="relative text-sm font-medium text-white sm:text-base md:text-lg">
                  View My Work
                </span>
              </Link>
              <Link
                href="/contact"
                className="group relative overflow-hidden rounded-full border-2 border-gray-900 px-5 py-2 text-sm font-medium text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:shadow-lg sm:px-6 sm:py-2.5 sm:text-base md:px-8 md:py-3 md:text-lg"
              >
                <span className="absolute inset-0 bg-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
                Get In Touch
              </Link>
            </div>

            {/* Brand Logos */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
              {BRANDS.map((brand, index) => (
                <div
                  key={index}
                  className="group relative h-8 w-8 transition-all duration-300 hover:scale-110 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <Image
                    src={`https://logo.clearbit.com/${brand.toLowerCase()}.com`}
                    alt={brand}
                    fill
                    className="rounded-full object-contain p-1 grayscale transition-all duration-500 group-hover:p-0 group-hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects - Flattened structure */}
        <section className="mb-2.5 rounded-[12px] bg-white py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:mb-8 sm:gap-4 md:mb-10 md:flex-row md:items-center lg:mb-12">
              <div>
                <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <span className="text-sm font-medium text-indigo-600">
                    PORTFOLIO
                  </span>
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                    Featured Projects
                  </span>
                </h2>
              </div>
              <Link
                href="/projects"
                className="group relative flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900 sm:gap-2 sm:text-sm md:text-base"
              >
                View all projects
                <span className="absolute bottom-0 left-0 h-px w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                <ChevronRight className="h-3 w-3 text-gray-400 sm:h-4 sm:w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-1 sm:rounded-2xl sm:hover:-translate-y-2 ${index === 0 ? "md:col-span-2" : ""}`}
                >
                  <div
                    className={`relative ${index === 0 ? "aspect-[16/8]" : "aspect-[16/9]"} overflow-hidden`}
                  >
                    <Image
                      src={project.frontmatter.coverImage || "/placeholder.svg"}
                      alt={project.frontmatter.title as string}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 sm:bottom-4 sm:left-4 sm:right-4 sm:gap-2">
                      <span className="rounded-full border border-white/20 bg-indigo-600 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm sm:px-3">
                        {project.frontmatter.category}
                      </span>
                      {index === 0 && (
                        <span className="rounded-full border border-white/20 bg-rose-600 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm sm:px-3">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-500 group-hover:scale-x-100 sm:h-1.5"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Section - Simplified */}
        <section className="mb-2.5 py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center sm:mb-10 md:mb-12 lg:mb-16">
              <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <span className="text-sm font-medium text-indigo-600">
                  AREA OF EXPERTISE
                </span>
              </div>
              <h2 className="mb-2 text-2xl font-bold sm:mb-3 sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent">
                  My Core Specializations
                </span>
              </h2>
              <p className="mx-auto max-w-xl text-base text-gray-600 sm:max-w-2xl sm:text-lg md:max-w-3xl md:text-xl lg:text-2xl">
                Areas where I bring the most value to projects and teams
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              {trendingTopics.map((topic) => (
                <Link
                  key={topic.title}
                  href={`/category/${topic.title.toLowerCase().replace(" ", "-")}`}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl sm:hover:-translate-y-2"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 sm:bottom-4 sm:left-4 sm:right-4 sm:gap-2">
                      {topic.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className={`${topic.color} rounded-full border border-white/20 bg-opacity-90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative p-4 sm:p-6">
                    <div className="relative z-10">
                      <h3 className="mb-2 text-lg font-bold sm:mb-3 sm:text-xl">
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {topic.title}
                        </span>
                      </h3>
                      <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
                        {topic.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 sm:text-sm">
                        <span className="mr-3 flex items-center sm:mr-4">
                          <svg
                            className="mr-1 h-3 w-3 sm:h-4 sm:w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {topic.count} projects
                        </span>
                        <span className="flex items-center text-indigo-600">
                          Explore
                          <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-b-xl bg-gradient-to-b from-white/80 to-white/30 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 sm:rounded-b-2xl"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-500 group-hover:scale-x-100 sm:h-1.5"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Posts - Clean structure */}
        <section className="mb-0 sm:py-4 lg:py-8 xl:py-10">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:mb-8 sm:gap-4 md:mb-10 md:flex-row md:items-center lg:mb-12">
              <div>
                <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <span className="text-sm font-medium text-indigo-600">
                    BLOG
                  </span>
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                    Latest Articles
                  </span>
                </h2>
              </div>
              <Link
                href="/posts"
                className="group relative flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900 sm:gap-2 sm:text-sm md:text-base"
              >
                View all articles
                <span className="absolute bottom-0 left-0 h-px w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                <ChevronRight className="h-3 w-3 text-gray-400 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl sm:hover:-translate-y-2"
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
                  <div className="relative p-4 sm:p-6">
                    <div className="relative z-10">
                      <div className="mb-2 flex items-center gap-1 sm:mb-3 sm:gap-2">
                        <span className="rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-2 py-0.5 text-xs font-medium text-indigo-600 sm:px-3 sm:py-1 sm:text-sm">
                          {(post.frontmatter.tags || ["Uncategorized"])[0]}
                        </span>
                        <span className="flex items-center text-xs text-gray-500 sm:text-sm">
                          <svg
                            className="mr-1 h-3 w-3 sm:h-4 sm:w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {new Date(post.frontmatter.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          ) || "Unknown date"}
                        </span>
                      </div>
                      <h3 className="mb-1 text-base font-bold text-gray-900 transition-colors group-hover:text-indigo-600 sm:mb-2 sm:text-lg md:mb-3 md:text-xl">
                        {post.frontmatter.title || "Untitled Post"}
                      </h3>
                      <p className="mb-2 line-clamp-2 text-xs text-gray-600 sm:mb-3 sm:line-clamp-3 sm:text-sm md:mb-4 md:text-base">
                        {post.frontmatter.excerpt || "No excerpt available."}
                      </p>
                      <div className="inline-flex items-center text-xs font-medium text-indigo-600 sm:text-sm md:text-base">
                        Read more
                        <ChevronRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-500 group-hover:scale-x-100 sm:h-1.5"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </HomeLayout>
    </>
  );
}
