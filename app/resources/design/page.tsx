import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DesignResourcesPage() {
  const designResources = [
    {
      title: "Figma UI Kits",
      description:
        "A collection of premium and free UI kits for Figma to jumpstart your design projects.",
      link: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
          <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
        </svg>
      ),
      color:
        "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300",
    },
    {
      title: "Color Palette Generators",
      description:
        "Tools and resources for creating harmonious color schemes for your digital products.",
      link: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      ),
      color:
        "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300",
    },
    {
      title: "Typography Resources",
      description:
        "Font pairing tools, typography guidelines, and resources for better text design.",
      link: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" y1="20" x2="15" y2="20" />
          <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
      ),
      color:
        "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-300",
    },
    {
      title: "Icon Libraries",
      description:
        "Curated collections of high-quality icons for various design needs and styles.",
      link: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
          <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
          <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
          <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
        </svg>
      ),
      color:
        "bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300",
    },
    {
      title: "UX Research Templates",
      description:
        "Ready-to-use templates for user interviews, surveys, and usability testing.",
      link: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      color: "bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300",
    },
    {
      title: "Design System Examples",
      description:
        "Inspiration from well-crafted design systems by leading companies and organizations.",
      link: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      color: "bg-sky-100 dark:bg-sky-900/20 text-sky-600 dark:text-sky-300",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-blob absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-indigo-200 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-10"></div>
        <div className="animate-blob animation-delay-2000 absolute -right-20 top-1/2 h-72 w-72 rounded-full bg-emerald-200 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-10"></div>
        <div className="animate-blob animation-delay-4000 absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-amber-200 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-10"></div>
      </div>

      <main className="relative z-10">
        <section className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          {/* Header Section with floating badge */}
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                DESIGN TOOLKIT
              </span>
              <span className="ml-2 h-2 w-2 animate-pulse rounded-full bg-indigo-400"></span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Curated{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                Design Resources
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              My handpicked collection of tools, assets, and references to
              elevate your design workflow and creativity.
            </p>
          </div>

          {/* Resources Grid with floating cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {designResources.map((resource, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800/80"
              >
                {/* Icon with colored background */}
                <CardHeader className="flex flex-row items-start gap-4 pb-0">
                  <div
                    className={`rounded-xl p-3 ${resource.color} transition-all duration-300 group-hover:rotate-6 group-hover:scale-110`}
                  >
                    {resource.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {resource.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="pt-4">
                  <Link
                    href={resource.link}
                    className="group/link inline-flex items-center text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Explore resources
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 transition-transform group-hover/link:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </CardContent>

                {/* Hover effect elements */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-indigo-500/10 dark:group-hover:border-indigo-400/10" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-gray-800/50" />
              </Card>
            ))}
          </div>

          {/* CTA Section with animated button */}
          <div className="mt-20 text-center">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Have a resource to recommend?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600 dark:text-gray-400">
              I'm always looking for great design tools to add to this
              collection. Share your favorites with me!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-emerald-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-emerald-700 hover:shadow-lg"
            >
              Suggest a resource
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 transition-transform group-hover:translate-y-1"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
