import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { AuroraText } from '@/components/ui/aurora-text'
import { TypographyH2 } from '@/components/ui/typography'

interface FeaturedProjectsHeaderProps {
  badge: string
  title: string
  viewAllHref: string
  viewAllLabel: string
}

export function FeaturedProjectsHeader({
  badge,
  title,
  viewAllHref,
  viewAllLabel,
}: FeaturedProjectsHeaderProps) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:mb-8 sm:gap-4 md:mb-10 md:flex-row md:items-center lg:mb-12">
      <div>
        <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <span className="text-sm font-medium text-indigo-600">{badge}</span>
        </div>
        <TypographyH2 className="mb-4 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl border-none">
          <span className="bg-linear-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
            Featured <AuroraText>Projects</AuroraText>
          </span>
        </TypographyH2>
      </div>
      <Link
        href={viewAllHref}
        className="group flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-indigo-600 sm:gap-2 sm:text-sm md:text-base dark:text-gray-400 dark:hover:text-indigo-300"
      >
        {viewAllLabel}
        <ChevronRight className="h-3 w-3 text-gray-400 sm:h-4 sm:w-4" />
      </Link>
    </div>
  )
}
