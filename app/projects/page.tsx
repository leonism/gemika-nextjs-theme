import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import JsonLd from "@/components/json-ld";
import { serialize } from "next-mdx-remote/serialize";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import ProjectsClientWrapper from "@/components/projects/ProjectsClientWrapper";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of my recent work across UX design, mobile development, and branding projects.",
};

export default async function ProjectsPage() {
  const allProjects = await getAllContent("projects");

  const sortedProjects = allProjects.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || a.frontmatter.year || "2000-01-01");
    const dateB = new Date(b.frontmatter.date || b.frontmatter.year || "2000-01-01");
    return dateB.getTime() - dateA.getTime();
  });

  const serializedProjects = await Promise.all(
    sortedProjects.map(async (project) => ({
      ...project,
      content: await serialize(project.content || ""),
    }))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Projects",
          description: "A showcase of my recent work across UX design, mobile development, and branding projects.",
        }}
      />
      <main>
        <ProjectsHeader />
        <ProjectsClientWrapper projects={serializedProjects} />
      </main>
    </div>
  );
}
