import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"

// Color palette for subtle gradient accents
const CARD_GRADIENTS = [
  "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
  "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
  "from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
  "from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20",
  "from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20",
  "from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20",
]

export default function DevelopmentResourcesPage() {
  const developmentResources = [
    {
      title: "React Component Libraries",
      description: "A collection of high-quality React component libraries and UI kits for faster development.",
      link: "#",
      icon: "🧩",
      emojiBg: "bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      title: "Mobile Development Tools",
      description: "Essential tools and frameworks for building cross-platform mobile applications.",
      link: "#",
      icon: "📱",
      emojiBg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      title: "API Documentation Tools",
      description: "Tools for creating and maintaining comprehensive API documentation.",
      link: "#",
      icon: "📄",
      emojiBg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      title: "Performance Optimization",
      description: "Resources and techniques for optimizing web and mobile application performance.",
      link: "#",
      icon: "⚡",
      emojiBg: "bg-violet-100 dark:bg-violet-900/30",
    },
    {
      title: "Testing Frameworks",
      description: "Tools and frameworks for unit testing, integration testing, and end-to-end testing.",
      link: "#",
      icon: "🧪",
      emojiBg: "bg-rose-100 dark:bg-rose-900/30",
    },
    {
      title: "Deployment & DevOps",
      description: "Resources for streamlining deployment processes and implementing DevOps practices.",
      link: "#",
      icon: "🚀",
      emojiBg: "bg-cyan-100 dark:bg-cyan-900/30",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
          <div className="text-center mb-16">
            {/* Animated badge */}
            <div className="inline-flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 mb-6 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                DEVELOPER TOOLKIT
              </span>
              <Sparkles className="w-4 h-4 ml-2 text-amber-400 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">Resources</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A curated collection of tools, libraries, and resources I recommend for building modern web and mobile applications.
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentResources.map((resource, index) => (
              <Link href={resource.link} key={index} className="group">
                <Card className={`h-full transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border-0 bg-gradient-to-br ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]} overflow-hidden`}>
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 dark:bg-black/10 rounded-bl-full backdrop-blur-sm"></div>

                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center gap-4">
                      {/* Emoji with floating animation */}
                      <div className={`${resource.emojiBg} w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                        {resource.icon}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {resource.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-gray-600 dark:text-gray-400 mb-4">
                      {resource.description}
                    </CardDescription>
                    <div className="flex items-center font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                      Explore resources
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
                    </div>
                  </CardContent>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-white/30 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm"></div>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20 relative">
            {/* Floating decorative elements */}
            <div className="absolute -top-10 left-1/4 w-8 h-8 bg-indigo-400/10 rounded-full blur-md"></div>
            <div className="absolute -bottom-5 right-1/4 w-10 h-10 bg-emerald-400/10 rounded-full blur-md"></div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Have a resource to suggest?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always looking for great tools to add to my toolkit. If you have recommendations, I'd love to hear them!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:brightness-110"
            >
              Suggest a resource
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
