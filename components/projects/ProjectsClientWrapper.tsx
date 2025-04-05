"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useEffect } from "react";
import { ProjectsGrid } from "./ProjectsGrid";
import { ProjectsPagination } from "./ProjectsPagination";
import { PROJECTS_PER_PAGE } from "@/lib/constants";

interface Props {
  projects: any[];
}

export default function ProjectsClientWrapper({ projects }: Props) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const validatedPage = isNaN(page) || page < 1 ? 1 : page;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [validatedPage]);

  const totalProjects = projects.length;
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE);
  const startIndex = (validatedPage - 1) * PROJECTS_PER_PAGE;
  const currentProjects = useMemo(
    () => projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE),
    [projects, startIndex]
  );

  return (
    <section className="container mx-auto px-4 max-w-7xl py-12 md:py-20">
      {currentProjects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <>
          <ProjectsGrid projects={currentProjects} />
          <ProjectsPagination currentPage={validatedPage} totalPages={totalPages} />
        </>
      )}
    </section>
  );
}
