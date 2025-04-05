export function ProjectsHeader() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 shadow-sm backdrop-blur-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <span className="text-sm font-medium text-indigo-600">
            PORTFOLIO SHOWCASE
          </span>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            My
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">
              Projects
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            A curated collection of my recent work.
          </p>
        </div>
      </div>
    </section>
  );
}
