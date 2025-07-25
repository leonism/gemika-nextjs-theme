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
  title: string
  description: string
  date: string
  author: string
  readingTime: string
  tags: string[]
  coverImage: string
  excerpt: string
  slug: string
  frontmatter: Frontmatter
  content: string
}
