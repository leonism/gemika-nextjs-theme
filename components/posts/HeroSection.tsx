export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Animated status badge */}
        <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/80">
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            LATEST ARTICLES
          </span>
          <span className="ml-2 h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
        </div>

        {/* Main title with gradient */}
        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Insights &{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
            Thoughts
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl">
          Explore my latest writings on UX design, development, and creative
          processes.
        </p>
      </div>
    </section>
  );
}
