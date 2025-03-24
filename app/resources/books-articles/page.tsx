import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BooksResourcesPage() {
  const bookResources = [
    {
      title: "UX Design Books",
      description: "Essential reading for UX designers at all levels, from beginners to advanced practitioners.",
      link: "#",
      icon: "📚",
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
    },
    {
      title: "Mobile Development Books",
      description: "Recommended books on mobile app development, covering iOS, Android, and cross-platform frameworks.",
      link: "#",
      icon: "📱",
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
    },
    {
      title: "Design Thinking",
      description: "Books that explore design thinking methodologies and their application in product development.",
      link: "#",
      icon: "💡",
      color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400"
    },
    {
      title: "Web Development",
      description: "Resources for modern web development, including JavaScript frameworks and best practices.",
      link: "#",
      icon: "🌐",
      color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
    },
    {
      title: "Design Psychology",
      description: "Books that delve into the psychology behind user behavior and decision-making in digital interfaces.",
      link: "#",
      icon: "🧠",
      color: "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400"
    },
    {
      title: "Industry Articles",
      description: "A collection of thought-provoking articles on design, development, and digital product strategy.",
      link: "#",
      icon: "📄",
      color: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2 block">
                KNOWLEDGE RESOURCES
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Books & <span className="text-indigo-600 dark:text-indigo-400">Articles</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                A curated collection of books, articles, and publications that have shaped my thinking and approach to design and development.
              </p>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="container mx-auto px-4 max-w-6xl py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookResources.map((resource, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="pb-0">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 ${resource.color}`}>
                    {resource.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 dark:text-gray-300 mb-4">
                    {resource.description}
                  </CardDescription>
                  <Link
                    href={resource.link}
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
                  >
                    Explore resources
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Have recommendations?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm always looking for great resources to add to my collection. Share your favorite books or articles with me!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Suggest a resource
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
