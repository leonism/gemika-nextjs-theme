import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DesignResourcesPage() {
  const designResources = [
    {
      title: "Figma UI Kits",
      description: "A collection of premium and free UI kits for Figma to jumpstart your design projects.",
      link: "#",
    },
    {
      title: "Color Palette Generators",
      description: "Tools and resources for creating harmonious color schemes for your digital products.",
      link: "#",
    },
    {
      title: "Typography Resources",
      description: "Font pairing tools, typography guidelines, and resources for better text design.",
      link: "#",
    },
    {
      title: "Icon Libraries",
      description: "Curated collections of high-quality icons for various design needs and styles.",
      link: "#",
    },
    {
      title: "UX Research Templates",
      description: "Ready-to-use templates for user interviews, surveys, and usability testing.",
      link: "#",
    },
    {
      title: "Design System Examples",
      description: "Inspiration from well-crafted design systems by leading companies and organizations.",
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Design Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
            A curated collection of my favorite design resources, tools, and assets to help you create better digital
            experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designResources.map((resource, index) => (
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

