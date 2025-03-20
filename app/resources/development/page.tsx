import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DevelopmentResourcesPage() {
  const developmentResources = [
    {
      title: "React Component Libraries",
      description: "A collection of high-quality React component libraries and UI kits for faster development.",
      link: "#",
    },
    {
      title: "Mobile Development Tools",
      description: "Essential tools and frameworks for building cross-platform mobile applications.",
      link: "#",
    },
    {
      title: "API Documentation Tools",
      description: "Tools for creating and maintaining comprehensive API documentation.",
      link: "#",
    },
    {
      title: "Performance Optimization",
      description: "Resources and techniques for optimizing web and mobile application performance.",
      link: "#",
    },
    {
      title: "Testing Frameworks",
      description: "Tools and frameworks for unit testing, integration testing, and end-to-end testing.",
      link: "#",
    },
    {
      title: "Deployment & DevOps",
      description: "Resources for streamlining deployment processes and implementing DevOps practices.",
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Development Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            A curated collection of development tools, libraries, and resources that I use and recommend for building
            modern web and mobile applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="bg-gradient-to-r from-gray-800 to-gray-500 dark:from-gray-200 dark:to-gray-500 bg-clip-text text-transparent">
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={resource.link} className="text-primary hover:underline">
                    Explore Resources →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

