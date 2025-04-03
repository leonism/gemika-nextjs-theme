import { NextResponse } from "next/server"
import { getAllContent } from "@/lib/content"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.toLowerCase() || ""

  try {
    const [posts, projects] = await Promise.all([
      getAllContent("posts"),
      getAllContent("projects")
    ])

    const results = [
      ...posts.map(post => ({
        ...post,
        type: "posts",
        relevance:
          (post.frontmatter.title?.toLowerCase().includes(query) ? 3 : 0) +
          (post.frontmatter.excerpt?.toLowerCase().includes(query) ? 2 : 0) +
          (post.frontmatter.tags?.some((tag: string) => tag.toLowerCase().includes(query)) ? 1 : 0)
      })),
      ...projects.map(project => ({
        ...project,
        type: "projects",
        relevance:
          (project.frontmatter.title?.toLowerCase().includes(query) ? 3 : 0) +
          (project.frontmatter.description?.toLowerCase().includes(query) ? 2 : 0) +
          (project.frontmatter.tags?.some((tag: string) => tag.toLowerCase().includes(query)) ? 1 : 0)
      }))
    ]
    .filter(item => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)

    return NextResponse.json(results)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    )
  }
}
