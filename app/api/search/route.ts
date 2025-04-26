import { NextResponse } from "next/server";

import { getAllContent } from "@/lib/content";
export const runtime = "nodejs"; // Add this at the top

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const [posts, projects] = await Promise.all([
      getAllContent("posts"),
      getAllContent("projects"),
    ]);

    const results = [
      ...posts
        .filter((post) => post && post.frontmatter)
        .map((post) => ({
          id: `post-${post.slug}`,
          slug: post.slug,
          type: "Blog Post",
          url: `/posts/${post.slug}`,
          date: post.frontmatter.date || "",
          frontmatter: {
            title: post.frontmatter.title || "",
            excerpt: post.frontmatter.excerpt || "",
          },
          relevance:
            (post.frontmatter.title?.toLowerCase().includes(query) ? 3 : 0) +
            (post.frontmatter.excerpt?.toLowerCase().includes(query) ? 2 : 0) +
            ((post.frontmatter.tags as string[])?.some((tag) =>
              tag.toLowerCase().includes(query),
            )
              ? 1
              : 0),
        })),
      ...projects
        .filter((project) => project && project.frontmatter)
        .map((project) => ({
          id: `project-${project.slug}`,
          slug: project.slug,
          type: "Project",
          url: `/projects/${project.slug}`,
          date: project.frontmatter.year || "",
          frontmatter: {
            title: project.frontmatter.title || "",
            excerpt: project.frontmatter.excerpt || "",
          },
          relevance:
            (project.frontmatter.title?.toLowerCase().includes(query) ? 3 : 0) +
            (project.frontmatter.excerpt?.toLowerCase().includes(query)
              ? 2
              : 0) +
            ((project.frontmatter.tags as string[])?.some((tag) =>
              tag.toLowerCase().includes(query),
            )
              ? 1
              : 0),
        })),
    ]
      .filter((item) => item.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 },
    );
  }
}
