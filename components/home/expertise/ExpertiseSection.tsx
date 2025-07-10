import { ExpertiseCard } from '@/components/home/expertise/ExpertiseCard'

interface ExpertiseSectionProps {
  topics: AreaExpertise[]
}

interface AreaExpertise {
  image: string
  title: string
  description: string
  count: number
  tags: string[]
  color: string
  categorySlug: string
}

export function ExpertiseSection({ topics }: ExpertiseSectionProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <span className="text-sm font-medium text-indigo-600">EXPERTISE</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              My Core Specializations
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Specialized in creating exceptional digital experiences through thoughtful design and
            robust development
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {topics.map((topic) => (
            <ExpertiseCard key={topic.title} topic={topic} />
          ))}
        </div>
      </div>
    </section>
  )
}
