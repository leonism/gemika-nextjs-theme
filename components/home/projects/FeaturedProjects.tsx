import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import ProjectCard from './ProjectCard';

// Changed from named import to default import

interface FeaturedProjectsProps {
  projects: {
    slug: string;
    frontmatter: {
      title: string;
      coverImage?: string;
      category: string;
    };
  }[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="mb-2.5 rounded-[12px] bg-white py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:mb-8 sm:gap-4 md:mb-10 md:flex-row md:items-center lg:mb-12">
          <div>
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <span className="text-sm font-medium text-indigo-600">
                PORTFOLIO
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="group relative flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900 sm:gap-2 sm:text-sm md:text-base"
          >
            View all projects
            <span className="absolute bottom-0 left-0 h-px w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            <ChevronRight className="h-3 w-3 text-gray-400 sm:h-4 sm:w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isFeatured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
