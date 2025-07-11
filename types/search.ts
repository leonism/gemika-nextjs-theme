export interface SearchResult {
  id: string
  title: string
  excerpt: string
  url: string
  type: string
  date: string
  frontmatter: {
    title: string
    excerpt: string
  }
  relevance?: number
}
