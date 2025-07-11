/**
 * Constants and Type Definitions for Posts functionality
 */

// Pagination configuration
export const POSTS_PER_PAGE = 6

// Color mapping for post tags - ensures consistent styling
export const TAG_COLORS = [
  {
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-600 dark:text-indigo-300',
  },
  {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-600 dark:text-emerald-300',
  },
  {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-600 dark:text-amber-300',
  },
  {
    bg: 'bg-rose-100 dark:bg-rose-900/30',
    text: 'text-rose-600 dark:text-rose-300',
  },
  {
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-600 dark:text-violet-300',
  },
] as const

// Type for post frontmatter (YAML header in markdown)
export interface PostFrontmatter {
  title: string
  date: string
  coverImage?: string
  excerpt?: string
  readingTime?: string
  category?: string
  tags?: string[]
}

// Complete post type including slug
export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content?: string
}
