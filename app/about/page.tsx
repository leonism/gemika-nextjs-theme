import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getContent } from "@/lib/content"
import { MDXProvider } from "@/components/mdx-provider"
import JsonLd from "@/components/json-ld"
import type { Person, WithContext } from "schema-dts"

export async function generateMetadata() {
  const about = await getContent("pages", "about")

  return {
    title: "About Me | Gerous",
    description: about?.frontmatter.excerpt || "Learn more about Daryl Mercer, UX Strategist & Mobile Developer",
  }
}

export default async function AboutPage() {
  const about = await getContent("pages", "about")

  // Create JSON-LD structured data
  const jsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Daryl Mercer",
    jobTitle: "UX Strategist & Mobile Developer",
    description: about?.frontmatter.excerpt as string,
    image: "/placeholder.svg",
    sameAs: [
      "https://linkedin.com/in/darylmercer",
      "https://twitter.com/darylmercer",
      "https://github.com/darylmercer",
    ],
    url: "https://gerous.netlify.app/about",
  }

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      <main>
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/3">
              <div className="sticky top-8">
                <div className="aspect-square relative rounded-lg overflow-hidden mb-6">
                  <Image
                    src={(about?.frontmatter.profileImage as string) || "/placeholder.svg"}
                    alt="Daryl Mercer"
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  Daryl Mercer
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">UX Strategist & Mobile Developer</p>
                <div className="flex space-x-4 mb-6">
                  <a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
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
                      className="h-5 w-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
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
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
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
                      className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
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
                      className="h-5 w-5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
                <Button className="w-full rounded-full">Contact Me</Button>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                About Me
              </h2>

              <div className="prose prose-lg dark:prose-invert">{about && <MDXProvider source={about.content} />}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

