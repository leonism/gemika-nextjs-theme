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
}

export function ExpertiseSection({ topics }: ExpertiseSectionProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <span className="text-sm font-medium text-indigo-600">
              EXPERTISE
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">
              My Core Specializations
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Specialized in creating exceptional digital experiences through thoughtful design and robust development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {topics.map((topic) => (
            <ExpertiseCard key={topic.title} topic={topic} />
          ))}
        </div>
      </div>
    </section>
  )
}
