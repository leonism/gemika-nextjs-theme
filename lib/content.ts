import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import rehypeSlug from "rehype-slug"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"

// Base content directory
const contentDirectory = path.join(process.cwd(), "content")

// Get content for any page type
export async function getContent(contentType: string, slug: string) {
  const directory = path.join(contentDirectory, contentType)
  const fullPath = path.join(directory, `${slug}.mdx`)

  // Check if the file exists
  if (!fs.existsSync(fullPath)) {
    console.warn(`Content file not found: ${fullPath}`)
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    },
    scope: data,
  })

  return {
    slug,
    frontmatter: data,
    content: mdxSource,
  }
}

// Get all content of a specific type
export async function getAllContent(contentType: string) {
  const directory = path.join(contentDirectory, contentType)

  // Ensure the directory exists
  if (!fs.existsSync(directory)) {
    console.warn(`Content directory not found: ${directory}`)
    return []
  }

  const filenames = fs.readdirSync(directory).filter((file) => file.endsWith(".mdx"))

  const allContent = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const content = await getContent(contentType, slug)
      return content
    }),
  )

  // Filter out null content and sort by date if available
  return allContent.filter(Boolean).sort((a, b) => {
    // Sort by date if available, otherwise by title
    if (a?.frontmatter.date && b?.frontmatter.date) {
      return new Date(b.frontmatter.date as string).getTime() - new Date(a.frontmatter.date as string).getTime()
    }

    // Fallback to sorting by title
    const titleA = ((a?.frontmatter.title as string) || "").toLowerCase()
    const titleB = ((b?.frontmatter.title as string) || "").toLowerCase()
    return titleA.localeCompare(titleB)
  })
}

// Search across all content types
export async function searchAllContent(query: string) {
  const normalizedQuery = query.toLowerCase().trim()

  if (!normalizedQuery) {
    return []
  }

  // Define content types to search
  const contentTypes = ["posts", "projects", "pages"]

  // Search in all content types
  const results = await Promise.all(
    contentTypes.map(async (type) => {
      const allContent = await getAllContent(type)

      return allContent
        .filter((item) => {
          if (!item || !item.frontmatter) return false; // Ensure item and frontmatter exist
          const title = ((item.frontmatter.title as string) || "").toLowerCase()
          const excerpt = ((item.frontmatter.excerpt as string) || "").toLowerCase()
          const tags = ((item.frontmatter.tags as string[]) || []).map((tag) => tag.toLowerCase())

          return ( // Search in title, excerpt and tags
            title.includes(normalizedQuery) ||
            excerpt.includes(normalizedQuery) ||
            tags.some((tag) => tag.includes(normalizedQuery))
          )
        })
        .map((item) => ({
          id: `${type}-${item?.slug}`,
          title: item?.frontmatter.title as string,
          excerpt: item?.frontmatter.excerpt as string,
          url:
            type === "posts" ? `/posts/${item?.slug}` : type === "projects" ? `/projects/${item?.slug}` : `/${item?.slug}`,
          type: type === "posts" ? "Blog Post" : type === "projects" ? "Project" : "Page",
          date: (item?.frontmatter.date as string) || "",
          image: (item?.frontmatter.coverImage as string) || "/placeholder.svg",
        }))
    }),
  )

  // Flatten and return results
  return results.flat()
}
