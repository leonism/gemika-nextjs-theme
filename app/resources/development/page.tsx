import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function DevelopmentResourcesPage() {
  const developmentResources = [
    {
      title: "React Component Libraries",
      description: "A collection of high-quality React component libraries and UI kits for faster development.",
      link: "#",
      icon: "🧩",
    },
    {
      title: "Mobile Development Tools",
      description: "Essential tools and frameworks for building cross-platform mobile applications.",
      link: "#",
      icon: "📱",
    },
    {
      title: "API Documentation Tools",
      description: "Tools for creating and maintaining comprehensive API documentation.",
      link: "#",
      icon: "📄",
    },
    {
      title: "Performance Optimization",
      description: "Resources and techniques for optimizing web and mobile application performance.",
      link: "#",
      icon: "⚡",
    },
    {
      title: "Testing Frameworks",
      description: "Tools and frameworks for unit testing, integration testing, and end-to-end testing.",
      link: "#",
      icon: "🧪",
    },
    {
      title: "Deployment & DevOps",
      description: "Resources for streamlining deployment processes and implementing DevOps practices.",
      link: "#",
      icon: "🚀",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">
              DEVELOPER TOOLKIT
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Development <span className="text-indigo-600 dark:text-indigo-400">Resources</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A curated collection of tools, libraries, and resources I recommend for building modern web and mobile applications.
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentResources.map((resource, index) => (
              <Link href={resource.link} key={index} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{resource.icon}</span>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {resource.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-400 mb-4">
                      {resource.description}
                    </CardDescription>
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                      Explore resources
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Have a resource to suggest?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always looking for great tools to add to my toolkit. If you have recommendations, I'd love to hear them!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Suggest a resource
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
