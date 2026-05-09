interface HeroDescriptionProps {
  children: React.ReactNode
}

export function HeroDescription({ children }: HeroDescriptionProps) {
  return (
    <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-500 sm:mb-10 sm:max-w-2xl sm:text-lg md:mb-12 md:max-w-3xl md:text-xl lg:text-2xl">
      {children}
    </p>
  )
}
