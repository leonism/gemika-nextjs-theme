export function ProjectsHeader() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <span className="text-sm font-medium text-indigo-600">PORTFOLIO SHOWCASE</span>
        </div>

        <div className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            My
            <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
            A curated collection of my recent work.
          </p>
        </div>
      </div>
    </section>
  )
}
