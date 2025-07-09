import Image from 'next/image'
import { Code, Layout, Eye, Rocket, Award, Sparkles, Lightbulb, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div>
      <main>
        <section className="container mx-auto max-w-4xl px-4 py-16">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="group relative h-64 w-64 overflow-hidden rounded-full border-4 border-white shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
                alt="Profile"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </div>
          </div>

          {/* Header with Projects page styling */}
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <span className="text-sm font-medium text-indigo-600">ABOUT ME</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                Gemika Haziq Nugroho
              </span>
            </h1>
            <div className="mx-auto max-w-lg">
              <div className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-2 text-indigo-600 shadow-sm transition-all duration-300 hover:shadow-md">
                <Rocket className="h-5 w-5" />
                <span className="text-lg font-medium">UX Strategist & Mobile Developer</span>
              </div>
            </div>
          </div>

          {/* Expertise Cards with Resources styling */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Layout className="h-6 w-6" />,
                title: 'User Experience Design',
                description: 'Creating intuitive and engaging digital experiences',
                gradient: 'from-purple-500 to-violet-600',
                bgColor: 'bg-purple-50 dark:bg-purple-900/20',
              },
              {
                icon: <Code className="h-6 w-6" />,
                title: 'Mobile Development',
                description: 'Building performant cross-platform applications',
                gradient: 'from-blue-500 to-cyan-600',
                bgColor: 'bg-blue-50 dark:bg-blue-900/20',
              },
              {
                icon: <Eye className="h-6 w-6" />,
                title: 'User Research',
                description: 'Understanding user needs through testing',
                gradient: 'from-emerald-500 to-teal-600',
                bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/80"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 ${item.gradient} transition-opacity duration-500`}
                ></div>

                <div className="pb-0">
                  {/* Floating emoji icon */}
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${item.bgColor} shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="pt-0">
                  <p className="mb-4 text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>

                {/* Hover border animation */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-indigo-500/10 dark:group-hover:border-indigo-400/10"></div>
              </div>
            ))}
          </div>

          {/* Professional Journey */}
          <div className="mt-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Professional Journey
              </span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  icon: <Award className="h-5 w-5" />,
                  title: 'Award-Winning Work',
                  description: 'Recognized by industry leaders for innovative design solutions',
                  gradient: 'from-amber-500 to-orange-500',
                  bgColor: 'bg-amber-50 dark:bg-amber-900/20',
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  title: 'Diverse Clientele',
                  description: 'From startups to Fortune 500 companies across multiple industries',
                  gradient: 'from-sky-500 to-blue-500',
                  bgColor: 'bg-sky-50 dark:bg-sky-900/20',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/80"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 ${item.gradient} transition-opacity duration-500`}
                  ></div>

                  <div className="pb-0">
                    {/* Floating emoji icon */}
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${item.bgColor} shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="pt-0">
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>

                  {/* Hover border animation */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-indigo-500/10 dark:group-hover:border-indigo-400/10"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Design Philosophy */}
          <div className="mt-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Design Philosophy
              </span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Lightbulb className="h-5 w-5" />,
                  title: 'Invisible Design',
                  description:
                    'Great design feels intuitive and natural, letting users focus on their goals',
                  gradient: 'from-violet-500 to-purple-500',
                  bgColor: 'bg-violet-50 dark:bg-violet-900/20',
                },
                {
                  icon: <Sparkles className="h-5 w-5" />,
                  title: 'Beautiful & Functional',
                  description: 'Combining aesthetic appeal with technical excellence',
                  gradient: 'from-pink-500 to-rose-500',
                  bgColor: 'bg-pink-50 dark:bg-pink-900/20',
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  title: 'User-Centered',
                  description: 'Design decisions rooted in real user needs and behaviors',
                  gradient: 'from-indigo-500 to-blue-500',
                  bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/80"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 ${item.gradient} transition-opacity duration-500`}
                  ></div>

                  <div className="pb-0">
                    {/* Floating emoji icon */}
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${item.bgColor} shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="pt-0">
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>

                  {/* Hover border animation */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-indigo-500/10 dark:group-hover:border-indigo-400/10"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
