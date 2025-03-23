import { getAllContent } from "@/lib/content"
import { NextResponse } from "next/server"

export async function GET() {
  const posts = await getAllContent("posts")

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gemika.netlify.app"

  // Create RSS XML
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>gemika - UX Strategist &amp; Mobile Developer</title>
    <link>${baseUrl}</link>
    <description>Expert user experience strategist and mobile developer portfolio</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${(post.frontmatter.title as string).replace(/&/g, "&amp;")}</title>
      <link>${baseUrl}/posts/${post.slug}</link>
      <pubDate>${new Date(post.frontmatter.date as string).toUTCString()}</pubDate>
      <guid>${baseUrl}/posts/${post.slug}</guid>
      <description>${(post.frontmatter.excerpt as string).replace(/&/g, "&amp;")}</description>
      ${(post.frontmatter.tags as string[])?.map((tag) => `<category>${tag}</category>`).join("")}
    </item>`,
      )
      .join("")}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
