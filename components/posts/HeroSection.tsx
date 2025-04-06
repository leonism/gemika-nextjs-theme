export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
        {/* Animated status badge */}
        <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            LATEST ARTICLES
          </span>
          <span className="ml-2 w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
        </div>

        {/* Main title with gradient */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">
            Thoughts</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Explore my latest writings on UX design, development, and creative processes.
        </p>
      </div>
    </section>
  );
}
