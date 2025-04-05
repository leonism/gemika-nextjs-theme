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
    <section className="py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 mb-2.5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <span className="text-sm font-medium text-indigo-600">
              AREA OF EXPERTISE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent">
              My Core Specializations
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto">
            Areas where I bring the most value to projects and teams
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
