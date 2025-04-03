import { getAllContent } from "@/lib/content"
import { NextResponse } from "next/server"

export async function GET() {
  const [posts, projects] = await Promise.all([
    getAllContent("posts"),
    getAllContent("projects")
  ])

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gemika.netlify.app"

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>gemika - UX Strategist &amp; Mobile Developer</title>
    <link>${baseUrl}</link>
    <description>Latest posts and projects from gemika</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>

    ${posts.map(post => `
    <item>
      <title>${(post.frontmatter.title as string).replace(/&/g, "&amp;")}</title>
      <link>${baseUrl}/posts/${post.slug}</link>
      <guid>${baseUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${post.frontmatter.excerpt.replace(/&/g, "&amp;")}</description>
    </item>
    `).join("")}

    ${projects.map(project => `
    <item>
      <title>Project: ${(project.frontmatter.title as string).replace(/&/g, "&amp;")}</title>
      <link>${baseUrl}/projects/${project.slug}</link>
      <guid>${baseUrl}/projects/${project.slug}</guid>
      <pubDate>${new Date(project.frontmatter.date).toUTCString()}</pubDate>
      <description>${project.frontmatter.description.replace(/&/g, "&amp;")}</description>
    </item>
    `).join("")}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
