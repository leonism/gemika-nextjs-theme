import Link from 'next/link'
import { Sparkles } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-blob absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-indigo-200 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-10"></div>
        <div className="animate-blob animation-delay-2000 absolute -right-20 top-1/2 h-72 w-72 rounded-full bg-emerald-200 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-10"></div>
        <div className="animate-blob animation-delay-4000 absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-amber-200 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-10"></div>
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

            <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
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
                <Card className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/80">
                  <CardHeader className="pb-0">
                    {/* Floating emoji icon */}
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${resource.emojiBg} shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      {resource.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent dark:text-white">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 text-gray-600 dark:text-gray-300">
                      {resource.description}
                    </CardDescription>
                    <span className="inline-flex items-center font-medium text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      Explore resources
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:scale-110"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>
                  </CardContent>

                  {/* Hover border animation */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-indigo-500/10 dark:group-hover:border-indigo-400/10"></div>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="relative mt-20 text-center">
            <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 transform rounded-full bg-indigo-500/10 opacity-20 blur-3xl filter"></div>

            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              Have a resource to recommend?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600 dark:text-gray-300">
              I'm always looking for great design tools to add to this collection. Share your
              favorites with me!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-emerald-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-emerald-700 hover:shadow-lg"
            >
              Suggest a resource
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 transition-transform group-hover:translate-y-1"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
