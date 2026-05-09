import { ExpertiseCard } from '@/components/home/expertise/ExpertiseCard'
import { ExpertiseHeader } from './ExpertiseHeader'

interface AreaExpertise {
  image: string
  title: string
  description: string
  count: number
  tags: string[]
  color: string
  categorySlug: string
}

interface ExpertiseSectionProps {
  topics: AreaExpertise[]
}

export function ExpertiseSection({ topics }: ExpertiseSectionProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ExpertiseHeader
          badge="EXPERTISE"
          titlePrefix="Core"
          highlightedTitle="Specializations"
          description="Specialized in creating exceptional digital experiences through thoughtful design and robust development"
        />

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {topics.map((topic) => (
            <ExpertiseCard key={topic.title} topic={topic} />
          ))}
        </div>
      </div>
    </section>
  )
}