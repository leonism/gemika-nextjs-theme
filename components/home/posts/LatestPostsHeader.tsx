interface LatestPostsHeaderProps {
  badge: string
  title: string
  description: string
}

export function LatestPostsHeader({ badge, title, description }: LatestPostsHeaderProps) {
  return (
    <div className="mb-10 text-center sm:mb-12 md:mb-16">
      <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <span className="text-sm font-medium text-indigo-600">{badge}</span>
      </div>
      <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
        <span className="bg-linear-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p className="mx-auto max-w-3xl text-lg text-gray-600">{description}</p>
    </div>
  )
}
