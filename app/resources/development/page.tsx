import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Color palette for subtle gradient accents
const CARD_GRADIENTS = [
  'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20',
  'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
  'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
  'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20',
  'from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20',
  'from-cyan-50 to-sky-50 dark:from-cyan-900/20 dark:to-sky-900/20',
]

export default function DevelopmentResourcesPage() {
  const developmentResources = [
    {
      title: 'React Component Libraries',
      description:
        'A collection of high-quality React component libraries and UI kits for faster development.',
      link: '#',
      icon: '🧩',
      emojiBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
    {
      title: 'Mobile Development Tools',
      description:
        'Essential tools and frameworks for building cross-platform mobile applications.',
      link: '#',
      icon: '📱',
      emojiBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      title: 'API Documentation Tools',
      description: 'Tools for creating and maintaining comprehensive API documentation.',
      link: '#',
      icon: '📄',
      emojiBg: 'bg-amber-100 dark:bg-amber-900/30',
    },
    {
      title: 'Performance Optimization',
      description:
        'Resources and techniques for optimizing web and mobile application performance.',
      link: '#',
      icon: '⚡',
      emojiBg: 'bg-violet-100 dark:bg-violet-900/30',
    },
    {
      title: 'Testing Frameworks',
      description:
        'Tools and frameworks for unit testing, integration testing, and end-to-end testing.',
      link: '#',
      icon: '🧪',
      emojiBg: 'bg-rose-100 dark:bg-rose-900/30',
    },
    {
      title: 'Deployment & DevOps',
      description:
        'Resources for streamlining deployment processes and implementing DevOps practices.',
      link: '#',
      icon: '🚀',
      emojiBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-10 dark:opacity-5">
        <div className="animate-blob animation-delay-2000 absolute left-10 top-1/4 h-64 w-64 rounded-full bg-indigo-300 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob animation-delay-4000 absolute right-20 top-1/3 h-72 w-72 rounded-full bg-emerald-300 mix-blend-multiply blur-3xl filter"></div>
        <div className="animate-blob absolute bottom-1/4 left-1/3 h-60 w-60 rounded-full bg-amber-300 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mb-16 text-center">
            {/* Animated badge */}
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                DEVELOPER TOOLKIT
              </span>
              <Sparkles className="ml-2 h-4 w-4 animate-pulse text-amber-400" />
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Development{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              A curated collection of tools, libraries, and resources I recommend for building
              modern web and mobile applications.
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {developmentResources.map((resource, index) => (
              <Link href={resource.link} key={index} className="group">
                <Card
                  className={`h-full border-0 bg-gradient-to-br transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]} overflow-hidden`}
                >
                  {/* Decorative corner accent */}
                  <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-white/20 backdrop-blur-sm dark:bg-black/10"></div>

                  <CardHeader className="relative z-10 pb-3">
                    <div className="flex items-center gap-4">
                      {/* Emoji with floating animation */}
                      <div
                        className={`${resource.emojiBg} flex h-12 w-12 items-center justify-center rounded-lg text-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                      >
                        {resource.icon}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        {resource.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="mb-4 text-gray-600 dark:text-gray-400">
                      {resource.description}
                    </CardDescription>
                    <div className="flex items-center font-medium text-indigo-600 transition-colors group-hover:text-indigo-700 dark:text-indigo-400 dark:group-hover:text-indigo-300">
                      Explore resources
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
                    </div>
                  </CardContent>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-white/30 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 dark:bg-black/20"></div>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="relative mt-20 text-center">
            {/* Floating decorative elements */}
            <div className="absolute -top-10 left-1/4 h-8 w-8 rounded-full bg-indigo-400/10 blur-md"></div>
            <div className="absolute -bottom-5 right-1/4 h-10 w-10 rounded-full bg-emerald-400/10 blur-md"></div>

            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Have a resource to suggest?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
              I'm always looking for great tools to add to my toolkit. If you have recommendations,
              I'd love to hear them!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:brightness-110"
            >
              Suggest a resource
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
