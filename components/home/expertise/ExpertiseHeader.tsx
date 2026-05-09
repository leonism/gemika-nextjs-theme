import { AuroraText } from '@/components/ui/aurora-text'
import { TypographyH2, TypographyP } from '@/components/ui/typography'

interface ExpertiseHeaderProps {
  badge: string
  titlePrefix: string
  highlightedTitle: string
  description: string
}

export function ExpertiseHeader({ 
  badge, 
  titlePrefix, 
  highlightedTitle, 
  description 
}: ExpertiseHeaderProps) {
  return (
    <div className="mb-10 text-center sm:mb-12 md:mb-16">
      <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <span className="text-xs font-medium text-indigo-600">{badge}</span>
      </div>
      <TypographyH2 className="mb-4 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl border-none">
        <span className="font-bold leading-tight text-gray-900 dark:text-white bg-clip-text">
          {titlePrefix} <AuroraText>{highlightedTitle}</AuroraText>
        </span>
      </TypographyH2>
      <TypographyP className="mx-auto max-w-3xl text-lg text-gray-600 mt-0">
        {description}
      </TypographyP>
    </div>
  )
}