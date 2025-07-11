import { searchPosts } from './mdx'

import type { SearchResult } from '@/types/search'

export async function searchContent(query: string): Promise<SearchResult[]> {
  const normalizedQuery = query.toLowerCase().trim()

  if (!normalizedQuery) {
    return []
  }

  // Search in posts
  const matchedPosts = await searchPosts(query)

  const postResults = matchedPosts.map((post) => ({
    id: `post-${post.slug}`,
    title: post.frontmatter.title as string,
    excerpt: post.frontmatter.excerpt as string,
    url: `/posts/${post.slug}`,
    type: 'Blog Post',
    date: post.frontmatter.date as string,
  }))

  // Add more content types to search here (projects, resources, etc.)

  return postResults
}
