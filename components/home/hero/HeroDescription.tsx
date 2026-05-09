import { TypographyLead } from '@/components/ui/typography'

interface HeroDescriptionProps {
  children: React.ReactNode
}

export function HeroDescription({ children }: HeroDescriptionProps) {
  return (
    <TypographyLead className="mx-auto mb-8 max-w-xl leading-relaxed sm:mb-10 sm:max-w-2xl md:mb-12 md:max-w-3xl lg:text-2xl">
      {children}
    </TypographyLead>
  )
}
