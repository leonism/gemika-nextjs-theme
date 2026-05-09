import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { TypographyH1, TypographyH2 } from '@/components/ui/typography'

interface HeroHeadingsProps {
  name: string
  title: string
}

export function HeroHeadings({ name, title }: HeroHeadingsProps) {
  return (
    <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4 md:mb-10 md:space-y-5">
      <TypographyH1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        <AnimatedGradientText colorFrom="#6366f1" colorTo="#10b981">
          {name}
        </AnimatedGradientText>
      </TypographyH1>
      <TypographyH2 className="border-none text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        {title}
      </TypographyH2>
    </div>
  )
}

