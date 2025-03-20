import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BooksResourcesPage() {
  const bookResources = [
    {
      title: "UX Design Books",
      description: "Essential reading for UX designers at all levels, from beginners to advanced practitioners.",
      link: "#",
    },
    {
      title: "Mobile Development Books",
      description: "Recommended books on mobile app development, covering iOS, Android, and cross-platform frameworks.",
      link: "#",
    },
    {
      title: "Design Thinking",
      description: "Books that explore design thinking methodologies and their application in product development.",
      link: "#",
    },
    {
      title: "Web Development",
      description: "Resources for modern web development, including JavaScript frameworks and best practices.",
      link: "#",
    },
    {
      title: "Design Psychology",
      description:
        "Books that delve into the psychology behind user behavior and decision-making in digital interfaces.",
      link: "#",
    },
    {
      title: "Industry Articles",
      description: "A collection of thought-provoking articles on design, development, and digital product strategy.",
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Books & Articles
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            A curated collection of books, articles, and publications that have shaped my thinking and approach to
            design and development.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookResources.map((resource, index) => (
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

