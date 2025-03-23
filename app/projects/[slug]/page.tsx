import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { getContent, getAllContent } from "@/lib/content"
import JsonLd from "@/components/json-ld"
import type { WithContext } from "schema-dts"
import { serialize } from "next-mdx-remote/serialize";
import DynamicClientMDXRenderer from "@/components/DynamicClientMDXRenderer";

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
  const { slug } = await params;
  const project = await getContent("projects", slug)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${project.frontmatter.title} | gemika Projects`,
    description: project.frontmatter.excerpt,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.excerpt,
      type: "website",
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getContent("projects", slug);
  if (!project) {
    notFound();
  }
  const serializedContent = await serialize(project.content || "");

  if (!project) {
    notFound()
  }

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
      "@id": `https://gemika.netlify.app/projects/${slug}`,
    },
  }

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      <main>
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="mb-8">
            <Link
              href="/projects"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white inline-flex items-center"
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
                className="mr-2 h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Projects
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                {project.frontmatter.title as string}
              </h1>
              <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
                <Image
                  src={(project.frontmatter.coverImage as string) || "/placeholder.svg"}
                  alt={project.frontmatter.title as string}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <DynamicClientMDXRenderer source={serializedContent} />
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-500 dark:from-gray-200 dark:to-gray-500 bg-clip-text text-transparent">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(project.frontmatter.gallery as string[])?.map((image, index) => (
                    <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.frontmatter.title as string} gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-500 dark:from-gray-200 dark:to-gray-500 bg-clip-text text-transparent">
                  Project Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-600 dark:text-gray-400">Client</h3>
                    <p className="font-medium">{project.frontmatter.client as string}</p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-600 dark:text-gray-400">Category</h3>
                    <p className="font-medium">{project.frontmatter.category as string}</p>
                  </div>

                  <div>
                    <h3 className="text-sm text-gray-600 dark:text-gray-400">Year</h3>
                    <p className="font-medium">{project.frontmatter.year as string}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="w-full rounded-full">Contact About This Project</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
