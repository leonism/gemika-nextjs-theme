interface HeroHeadingsProps {
  name: string
  title: string
}

export function HeroHeadings({ name, title }: HeroHeadingsProps) {
  return (
    <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4 md:mb-10 md:space-y-5">
      <h1 className="text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl xl:text-7xl">
        <span className="bg-linear-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
          {name}
        </span>
      </h1>
      <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        {title}
      </h2>
    </div>
  )
}
