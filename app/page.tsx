import Image from "next/image"
import PortfolioCard from "@/components/portfolio-card"
import Link from "next/link"
import JsonLd from "@/components/json-ld"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HomeLayout } from "@/components/layouts/home-layout"
import { PostCard } from "@/components/cards/post-card"
import { CategoryCard } from "@/components/cards/category-card"
// import { NewsletterForm } from "@/components/forms/newsletter-form"
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
    name: "gemika - UX Strategist & Mobile Developer",
    url: "https://gemika.netlify.app",
    description: "Expert user experience strategist and mobile developer portfolio",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://gemika.netlify.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  // Hero Section
  const heroSection = (
    <div className="container mx-auto px-4 py-16 md:py-24 text-center">
      <div className="flex justify-center mb-6">
        <div className="relative w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
            alt="Gemika Haziq Nugroho"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
        Gemika Haziq Nugroho
      </h1>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight mb-6 bg-gradient-to-r from-gray-800 to-gray-500 dark:from-gray-200 dark:to-gray-500 bg-clip-text text-transparent">
        Specializing in UI/UX strategy & mobile development.
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
        With my expertise, I’m here to partner with you in creating design solutions that go beyond expectations. Let’s embark on a journey of innovation together!
      </p>

      <div className="flex justify-center space-x-8 mb-16">
        <Image
          src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32&q=80"
          alt="Apple"
          width={32}
          height={32}
        />
        <Image
          src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32&q=80"
          alt="Adobe"
          width={32}
          height={32}
        />
        <Image
          src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32&q=80"
          alt="HP"
          width={32}
          height={32}
        />
        <Image
          src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32&q=80"
          alt="Diamond"
          width={32}
          height={32}
        />
        <Image
          src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32&q=80"
          alt="Dropbox"
          width={32}
          height={32}
        />
        <Image
          src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32&q=80"
          alt="EA"
          width={32}
          height={32}
        />
        <Image
          src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32&q=80"
          alt="Chrome"
          width={32}
          height={32}
        />
        <Image
          src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32&q=80"
          alt="Apple"
          width={32}
          height={32}
        />
      </div>
    </div>
  )

  // Featured Projects Section
  const featuredProjectsSection = (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Selected Work
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {limitedProjects.map((project) =>
          project && (
            <PortfolioCard
              key={project.slug}
              title={project.frontmatter.title as string}
              category={project.frontmatter.category as string}
              imageUrl={project.frontmatter.coverImage as string}
              slug={project.slug}
            />
          )
        )}
      </div>

      <div className="mt-12 text-center">
        <Link href="/projects">
          <Button variant="outline" className="rounded-full">
            View All Projects
          </Button>
        </Link>
      </div>
    </div>
  )

  // Trending Topics Section
  const trendingTopicsSection = (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Explore Topics
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover content across different categories and interests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CategoryCard
          title="UX Design"
          description="Principles, methods, and tools for creating exceptional user experiences"
          imageUrl="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          postCount={8}
          slug="ux-design"
        />
        <CategoryCard
          title="Mobile Development"
          description="Building responsive, cross-platform mobile applications"
          imageUrl="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          postCount={6}
          slug="mobile-development"
        />
        <CategoryCard
          title="Design Systems"
          description="Creating scalable and consistent design systems for products"
          imageUrl="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          postCount={5}
          slug="design-systems"
        />
      </div>
    </div>
  )

  // Latest Posts Section
  const latestPostsSection = (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Latest Blog Posts
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Insights and thoughts on UX design, development, and creative processes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {limitedPosts
          .filter((post) => post) // Filter out undefined or null posts
          .map((post) =>
            post ? (
              <PostCard
                key={post.slug}
                title={post.frontmatter.title || "Untitled Post"}
                excerpt={post.frontmatter.excerpt || "No excerpt available."}
                date={post.frontmatter.date || "Unknown date"}
                author={post.frontmatter.author || "Unknown author"}
                imageUrl={post.frontmatter.coverImage || "/placeholder.svg"}
                slug={post.slug}
                category={(post.frontmatter.tags || ["Uncategorized"])[0]}
              />
            ) : null
          )}
      </div>

      <div className="mt-12 text-center">
        <Link href="/posts">
          <Button variant="outline" className="rounded-full">
            Read All Posts
          </Button>
        </Link>
      </div>
    </div>
  )

  /* Newsletter Section - temporarily disabled
  const newsletterSection = (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
        Stay Updated
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Subscribe to my newsletter for the latest design insights, development tips, and project updates.
      </p>
      <NewsletterForm />
    </div>
  )
  */

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeLayout
        heroSection={heroSection}
        featuredPostsSection={featuredProjectsSection}
        trendingTopicsSection={trendingTopicsSection}
        latestPostsSection={latestPostsSection}
        // newsletterSection={newsletterSection} // Temporarily disabled
      >
        <div />
      </HomeLayout>
    </>
  )
}
