/**
 * Shared type definitions for all content items (posts, projects, pages).
 *
 * Every MDX file's YAML header is parsed into a Frontmatter object.
 * The Post type wraps the parsed frontmatter with its slug and raw MDX body.
 */

export interface Frontmatter {
  title: string
  description: string
  date: string
  author?: string
  readingTime?: string
  tags?: string[]
  coverImage?: string
  excerpt?: string
  year?: string
  category?: string
  gallery?: string[]
  website?: string
  client?: string
  updatedDate?: string
  createdDate?: string
  status?: string
  permalink?: string
}

export interface Post {
  slug: string
  frontmatter: Frontmatter
  content: string
}
