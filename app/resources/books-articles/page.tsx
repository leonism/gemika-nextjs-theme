import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BooksResourcesPage() {
  const bookResources = [
    {
      title: "UX Design Books",
      description: "Essential reading for UX designers at all levels, from beginners to advanced practitioners.",
      link: "#",
      icon: "📚",
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      title: "Mobile Development Books",
      description: "Recommended books on mobile app development, covering iOS, Android, and cross-platform frameworks.",
      link: "#",
      icon: "📱",
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      title: "Design Thinking",
      description: "Books that explore design thinking methodologies and their application in product development.",
      link: "#",
      icon: "💡",
      color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
      gradient: "from-yellow-500 to-amber-600"
    },
    {
      title: "Web Development",
      description: "Resources for modern web development, including JavaScript frameworks and best practices.",
      link: "#",
      icon: "🌐",
      color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Design Psychology",
      description: "Books that delve into the psychology behind user behavior and decision-making in digital interfaces.",
      link: "#",
      icon: "🧠",
      color: "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      title: "Industry Articles",
      description: "A collection of thought-provoking articles on design, development, and digital product strategy.",
      link: "#",
      icon: "📄",
      color: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
      gradient: "from-indigo-500 to-blue-600"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-20 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl backdrop-blur-lg">
            <div className="max-w-3xl">
              {/* Floating badge */}
              <div className="inline-flex items-center mb-6 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  KNOWLEDGE RESOURCES
                </span>
                <span className="ml-2 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Books & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Articles</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                A curated collection of books, articles, and publications that have shaped my thinking and approach to design and development.
              </p>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="container mx-auto px-4 max-w-6xl py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookResources.map((resource, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient highlight on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 ${resource.gradient} transition-opacity duration-500`}></div>

                <CardHeader className="pb-0">
                  {/* Floating emoji icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${resource.color} shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}>
                    {resource.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300">
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
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:scale-110"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </CardContent>

                {/* Hover border animation */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/10 dark:group-hover:border-indigo-400/10 rounded-2xl transition-all duration-500 pointer-events-none"></div>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center relative">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl opacity-20"></div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Have recommendations?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm always looking for great resources to add to my collection. Share your favorite books or articles with me!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full font-medium transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Suggest a resource
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-0.5 group-hover:scale-110"
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
