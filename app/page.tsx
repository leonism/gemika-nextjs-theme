/**
 * Main Home Page Component
 *
 * This is the root page component that serves as the homepage.
 * It organizes all sections and components in a clean layout.
 */
import Image from "next/image"
import Link from "next/link"
import JsonLd from "@/components/json-ld"
import { ChevronRight } from "lucide-react"
import { HomeLayout } from "@/components/layouts/home-layout"
import { getAllContent } from "@/lib/content"
import { WithContext } from "schema-dts"

/*
 * Constants
 *
 * These are static data used throughout the page.
 * Keeping them here makes them easy to maintain and update.
 */

// Brands to display in the hero section logos
const BRANDS = ["Apple", "Adobe", "Google", "Microsoft", "Samsung", "Spotify", "Amazon", "Netflix"];

// Trending topics data for the expertise section
const trendingTopics = [
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
];

/**
 * Home Page Component
 *
 * The main async component that fetches data and renders the homepage.
 * It uses Promise.all to fetch projects and posts in parallel for better performance.
 */
export default async function Home() {
  // Fetch featured projects and latest posts in parallel
  const [featuredProjects, latestPosts] = await Promise.all([
    getAllContent("projects").then(projects => projects.slice(0, 5)),
    getAllContent("posts").then(posts => posts.slice(0, 9))
  ]);

  // Structured data for SEO (JSON-LD)
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
  };

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <JsonLd data={jsonLd} />

      {/* Main page layout with all sections */}
      <HomeLayout>
        {/* Hero banner section at the top of the page */}
        <HeroSection brands={BRANDS} />

        {/* Featured projects showcase section */}
        <FeaturedProjectsSection
          projects={featuredProjects}
          subtitle="PORTFOLIO"
          title="Featured Projects"
          linkText="View all projects"
          linkHref="/projects"
        />

        {/* Expertise/specializations section */}
        <TrendingTopicsSection
          topics={trendingTopics}
          subtitle="EXPERTISE"
          title="My Core Specializations"
          description="Areas where I bring the most value to projects and teams"
        />

        {/* Latest blog posts section - Added mb-16 for bottom spacing */}
        <LatestPostsSection
          posts={latestPosts}
          subtitle="BLOG"
          title="Latest Articles"
          linkText="View all articles"
          linkHref="/posts"
        />
      </HomeLayout>
    </>
  )
}

/* =============================================
 * SECTION COMPONENTS
 * These components represent complete page sections
 * ============================================= */

/**
 * Featured Projects Section
 *
 * Displays a grid of featured projects with a title and link.
 * @param {Array} projects - List of project data
 * @param {string} subtitle - Section subtitle
 * @param {string} title - Section title
 * @param {string} linkText - Text for the view all link
 * @param {string} linkHref - URL for the view all link
 */
function FeaturedProjectsSection({ projects, subtitle, title, linkText, linkHref }: {
  projects: any[];
  subtitle: string;
  title: string;
  linkText: string;
  linkHref: string
}) {
  return (
    <SectionWrapper bgClass="bg-white rounded-[12px]">
      <SectionHeader
        subtitle={subtitle}
        title={title}
        linkText={linkText}
        linkHref={linkHref}
      />
      <ProjectsGrid projects={projects} />
    </SectionWrapper>
  );
}

/**
 * Trending Topics Section
 *
 * Displays expertise/specializations in a centered layout.
 * @param {Array} topics - List of topic data
 * @param {string} subtitle - Section subtitle
 * @param {string} title - Section title
 * @param {string} description - Section description
 */
function TrendingTopicsSection({ topics, subtitle, title, description }: {
  topics: any[];
  subtitle: string;
  title: string;
  description: string
}) {
  return (
    <SectionWrapper bgClass="bg-gray-50">
      <CenteredSectionHeader
        subtitle={subtitle}
        title={title}
        description={description}
      />
      <TopicsGrid topics={topics} />
    </SectionWrapper>
  );
}

/**
 * Latest Posts Section
 *
 * Displays a grid of recent blog posts.
 * Added mb-16 class to create space before footer.
 * @param {Array} posts - List of post data
 * @param {string} subtitle - Section subtitle
 * @param {string} title - Section title
 * @param {string} linkText - Text for the view all link
 * @param {string} linkHref - URL for the view all link
 */
function LatestPostsSection({ posts, subtitle, title, linkText, linkHref }: {
  posts: any[];
  subtitle: string;
  title: string;
  linkText: string;
  linkHref: string
}) {
  return (
    <SectionWrapper bgClass="bg-white rounded-xl shadow-sm mb-16"> {/* Added mb-16 here */}
      <SectionHeader
        subtitle={subtitle}
        title={title}
        linkText={linkText}
        linkHref={linkHref}
      />
      <PostsGrid posts={posts} />
    </SectionWrapper>
  );
}

/* =============================================
 * UI COMPONENTS
 * Reusable components used throughout the page
 * ============================================= */

/**
 * Section Wrapper
 *
 * A container component that provides consistent padding and max-width
 * for page sections. Handles both light and dark mode backgrounds.
 * @param {string} bgClass - Background color classes
 * @param {ReactNode} children - Child components
 */
function SectionWrapper({ bgClass, children }: { bgClass: string; children: React.ReactNode }) {
  return (
    <section className={`py-10 mb-2.5 sm:py-16 lg:py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        {children}
      </div>
    </section>
  );
}

/**
 * Section Header
 *
 * A standard section header with title, subtitle, and optional link.
 * @param {string} subtitle - Small text above the title
 * @param {string} title - Main section title
 * @param {string} linkText - Text for the optional link
 * @param {string} linkHref - URL for the optional link
 */
function SectionHeader({ subtitle, title, linkText, linkHref }: {
  subtitle: string;
  title: string;
  linkText: string;
  linkHref: string;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-12 gap-3 sm:gap-4">
      <div>
        <span className="text-xs sm:text-sm font-semibold text-indigo-600 mb-1 sm:mb-2 block">
          {subtitle}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
      </div>
      <SectionLink href={linkHref} text={linkText} />
    </div>
  );
}

/**
 * Centered Section Header
 *
 * A variation of the section header with centered text.
 * @param {string} subtitle - Small text above the title
 * @param {string} title - Main section title
 * @param {string} description - Section description below title
 */
function CenteredSectionHeader({ subtitle, title, description }: {
  subtitle: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <span className="text-xs sm:text-sm font-semibold text-indigo-600 mb-1 sm:mb-2 block">
        {subtitle}
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
        <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}

/**
 * Section Link
 *
 * A styled link component used in section headers.
 * @param {string} href - Link URL
 * @param {string} text - Link text
 */
function SectionLink({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900  transition-colors relative group"
    >
      {text}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
    </Link>
  );
}

/* =============================================
 * HERO SECTION COMPONENTS
 * Components specific to the hero banner section
 * ============================================= */

/**
 * Hero Section
 *
 * The main banner section at the top of the homepage.
 * Contains profile image, headings, description, buttons, and brand logos.
 * @param {Array} brands - List of brand names for logos
 */
function HeroSection({ brands }: { brands: string[] }) {
  return (
    <section className="relative py-8 sm:py-12 md:py-24 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
        <ProfileImage />
        <HeroHeadings />
        <HeroDescription />
        <HeroButtons />
        <BrandLogos brands={brands} />
      </div>
    </section>
  );
}

/**
 * Profile Image
 *
 * Circular profile image with hover effects.
 */
function ProfileImage() {
  return (
    <div className="flex justify-center mb-6 sm:mb-8">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl border-4 border-white transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
        <Image
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
          alt="Gemika Haziq Nugroho"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          priority
        />
      </div>
    </div>
  );
}

/**
 * Hero Headings
 *
 * The main name and title headings in the hero section.
 * Uses gradient text effects.
 */
function HeroHeadings() {
  return (
    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Gemika Haziq Nugroho
        </span>
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
        <span className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 bg-clip-text text-transparent">
          UX Strategist & Mobile Developer
        </span>
      </h2>
    </div>
  );
}

/**
 * Hero Description
 *
 * The descriptive text in the hero section.
 */
function HeroDescription() {
  return (
    <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
      Crafting exceptional digital experiences through thoughtful design and cutting-edge development.
    </p>
  );
}

/**
 * Hero Buttons
 *
 * The call-to-action buttons in the hero section.
 */
function HeroButtons() {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
      <PrimaryButton href="/projects" text="View My Work" />
      <SecondaryButton href="/contact" text="Get In Touch" />
    </div>
  );
}

/**
 * Primary Button
 *
 * A styled primary button with animated gradient background.
 * @param {string} href - Button link URL
 * @param {string} text - Button text
 */
function PrimaryButton({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="relative px-6 sm:px-8 py-2.5 sm:py-3 overflow-hidden font-medium rounded-full group">
      <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:translate-x-12 group-hover:skew-x-12"></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform -translate-x-12 -skew-x-12 bg-gradient-to-r from-indigo-700 to-purple-700 group-hover:translate-x-0 group-hover:skew-x-12"></span>
      <span className="relative text-white font-medium text-sm sm:text-base">{text}</span>
    </Link>
  );
}

/**
 * Secondary Button
 *
 * A styled secondary button with border and hover effects.
 * @param {string} href - Button link URL
 * @param {string} text - Button text
 */
function SecondaryButton({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg relative overflow-hidden group text-sm sm:text-base">
      <span className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
      {text}
    </Link>
  );
}

/**
 * Brand Logos
 *
 * Displays a grid of company logos with hover effects.
 * @param {Array} brands - List of brand names
 */
function BrandLogos({ brands }: { brands: string[] }) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
      {brands.map((brand, index) => (
        <div key={index} className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-all duration-300 hover:scale-110 group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src={`https://logo.clearbit.com/${brand.toLowerCase()}.com`}
            alt={brand}
            fill
            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
      ))}
    </div>
  );
}

/* =============================================
 * GRID COMPONENTS
 * Components for displaying content in grid layouts
 * ============================================= */

/**
 * Projects Grid
 *
 * Displays projects in a responsive grid layout.
 * The first project is featured and spans full width on medium+ screens.
 * @param {Array} projects - List of project data
 */
function ProjectsGrid({ projects }: { projects: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          isFeatured={index === 0}
        />
      ))}
    </div>
  );
}

/**
 * Project Card
 *
 * An individual project card with image, tags, and hover effects.
 * @param {Object} project - Project data
 * @param {boolean} isFeatured - Whether this is the featured project
 */
function ProjectCard({ project, isFeatured }: { project: any; isFeatured: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 ${isFeatured ? 'md:col-span-2' : ''}`}
    >
      <div className={`relative ${isFeatured ? 'aspect-[16/8]' : 'aspect-[16/9]'} overflow-hidden`}>
        <Image
          src={project.frontmatter.coverImage || "/placeholder.svg"}
          alt={project.frontmatter.title as string}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <ProjectTags project={project} isFeatured={isFeatured} />
      </div>
      <ProjectHoverIndicator />
    </Link>
  );
}

/**
 * Project Tags
 *
 * Displays tags/categories for a project.
 * Shows a "Featured" tag if the project is featured.
 * @param {Object} project - Project data
 * @param {boolean} isFeatured - Whether this is the featured project
 */
function ProjectTags({ project, isFeatured }: { project: any; isFeatured: boolean }) {
  return (
    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap gap-1 sm:gap-2">
      <span className="px-2 sm:px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full backdrop-blur-sm border border-white/20 shadow-sm">
        {project.frontmatter.category}
      </span>
      {isFeatured && (
        <span className="px-2 sm:px-3 py-1 bg-rose-600 text-white text-xs font-medium rounded-full backdrop-blur-sm border border-white/20 shadow-sm">
          Featured
        </span>
      )}
    </div>
  );
}

/**
 * Project Hover Indicator
 *
 * A subtle animated indicator that appears on hover.
 */
function ProjectHoverIndicator() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
  );
}

/**
 * Topics Grid
 *
 * Displays expertise topics in a responsive grid layout.
 * @param {Array} topics - List of topic data
 */
function TopicsGrid({ topics }: { topics: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
      {topics.map((topic) => (
        <TopicCard key={topic.title} topic={topic} />
      ))}
    </div>
  );
}

/**
 * Topic Card / Category
 *
 * An individual topic card with image, tags, description, and metadata.
 * @param {Object} topic - Topic data
 */
function TopicCard({ topic }: { topic: any }) {
  return (
    <Link
      href={`/category/${topic.title.toLowerCase().replace(' ', '-')}`}
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl"
    >
      <TopicImage topic={topic} />
      <TopicContent topic={topic} />
      <ProjectHoverIndicator />
    </Link>
  );
}

/**
 * Topic Image
 *
 * The image section of a topic card with hover zoom effect.
 * @param {Object} topic - Topic data
 */
function TopicImage({ topic }: { topic: any }) {
  return (
    <div className="relative aspect-video overflow-hidden">
      <Image src={topic.image} alt={topic.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
      <TopicTags topic={topic} />
    </div>
  );
}

/**
 * Topic Tags
 *
 * Displays tags for a topic with colored backgrounds.
 * @param {Object} topic - Topic data
 */
function TopicTags({ topic }: { topic: any }) {
  return (
    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap gap-1 sm:gap-2">
      {topic.tags.map((tag: string, index: number) => (
        <span key={index} className={`${topic.color} text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm bg-opacity-90 border border-white/20`}>
          {tag}
        </span>
      ))}
    </div>
  );
}

/**
 * Topic Content
 *
 * The text content section of a topic card.
 * @param {Object} topic - Topic data
 */
function TopicContent({ topic }: { topic: any }) {
  return (
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
        <TopicMeta topic={topic} />
      </div>
      <TopicHoverOverlay />
    </div>
  );
}

/**
 * Topic Meta
 *
 * Metadata section of a topic card (project count, explore link).
 * @param {Object} topic - Topic data
 */
function TopicMeta({ topic }: { topic: any }) {
  return (
    <div className="flex items-center text-xs sm:text-sm text-gray-500">
      <span className="flex items-center mr-3 sm:mr-4">
        <ClockIcon />
        {topic.count} projects
      </span>
      <span className="flex items-center text-indigo-600">
        Explore
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
      </span>
    </div>
  );
}

/**
 * Clock Icon
 *
 * Reusable clock icon component for metadata.
 */
function ClockIcon() {
  return (
    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

/**
 * Topic Hover Overlay
 *
 * A subtle overlay effect that appears on topic card hover.
 */
function TopicHoverOverlay() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl sm:rounded-b-2xl"></div>
  );
}

/**
 * Posts Grid
 *
 * Displays blog posts in a responsive grid layout.
 * @param {Array} posts - List of post data
 */
function PostsGrid({ posts }: { posts: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

/**
 * Post Card
 *
 * An individual blog post card with image, metadata, and content.
 * @param {Object} post - Post data
 */
function PostCard({ post }: { post: any }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white border-white/20 shadow-sm transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl"
    >
      <PostImage post={post} />
      <PostContent post={post} />
      <ProjectHoverIndicator />
    </Link>
  );
}

/**
 * Post Image
 *
 * The image section of a blog post card.
 * @param {Object} post - Post data
 */
function PostImage({ post }: { post: any }) {
  return (
    <div className="relative aspect-video overflow-hidden">
      <Image
        src={post.frontmatter.coverImage || "/placeholder.svg"}
        alt={post.frontmatter.title || "Untitled Post"}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>
  );
}

/**
 * Post Content
 *
 * The text content section of a blog post card.
 * @param {Object} post - Post data
 */
function PostContent({ post }: { post: any }) {
  return (
    <div className="p-4 sm:p-6 relative">
      <div className="relative z-10">
        <PostMeta post={post} />
        <PostTitle post={post} />
        <PostExcerpt post={post} />
        <ReadMoreLink />
      </div>
      <TopicHoverOverlay />
    </div>
  );
}

/**
 * Post Meta
 *
 * Metadata section of a blog post card (tag and date).
 * @param {Object} post - Post data
 */
function PostMeta({ post }: { post: any }) {
  return (
    <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
      <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 text-xs font-medium rounded-full">
        {(post.frontmatter.tags || ["Uncategorized"])[0]}
      </span>
      <span className="text-xs text-gray-500">
        {post.frontmatter.date || "Unknown date"}
      </span>
    </div>
  );
}

/**
 * Post Title
 *
 * The title of a blog post with hover color change.
 * @param {Object} post - Post data
 */
function PostTitle({ post }: { post: any }) {
  return (
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-indigo-600 transition-colors">
      {post.frontmatter.title || "Untitled Post"}
    </h3>
  );
}

/**
 * Post Excerpt
 *
 * The excerpt/description of a blog post, limited to 3 lines.
 * @param {Object} post - Post data
 */
function PostExcerpt({ post }: { post: any }) {
  return (
    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
      {post.frontmatter.excerpt || "No excerpt available."}
    </p>
  );
}

/**
 * Read More Link
 *
 * The "Read more" link at the bottom of post cards.
 */
function ReadMoreLink() {
  return (
    <div className="inline-flex items-center text-indigo-600 font-medium text-sm sm:text-base">
      Read more
      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform group-hover:translate-x-1" />
    </div>
  );
}
