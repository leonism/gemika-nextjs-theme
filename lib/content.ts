'use server'

import path from 'path'
import fs from 'fs/promises'

import matter from 'gray-matter'

import type { Frontmatter, Post } from '@/types/post'

const VALID_CONTENT_TYPES = ['posts', 'projects', 'pages'] as const
type ContentType = (typeof VALID_CONTENT_TYPES)[number]

/**
 * Reads and parses a single MDX file by slug within a content directory.
 * Returns null when the file doesn't exist, letting callers decide how to handle missing content.
 */
export async function getContent(type: ContentType, slug: string): Promise<Post | null> {
  if (!VALID_CONTENT_TYPES.includes(type)) {
    console.error('Invalid content type:', type)
    return null
  }

  if (!slug || slug.trim() === '') {
    console.error('getContent called with empty slug for type:', type)
    return null
  }

  const filePath = path.join(process.cwd(), 'content', type, `${slug}.mdx`)

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    const frontmatter = data as Frontmatter

    if (!frontmatter.title || !content) {
      console.warn(`Invalid MDX file structure (missing title or content): ${filePath}`)
      return null
    }

    return { slug, frontmatter, content }
  } catch (error: unknown) {
    const err = error as NodeJS.ErrnoException
    if (err.code === 'ENOENT') {
      console.warn(`Content file not found: ${filePath}`)
    } else {
      console.error(`Error reading content file ${filePath}:`, err.message)
    }
    return null
  }
}

/**
 * Reads all MDX files from a content directory and returns them as Post[].
 * Silently returns an empty array when the directory doesn't exist.
 */
export async function getAllContent(type: ContentType): Promise<Post[]> {
  const directoryPath = path.join(process.cwd(), 'content', type)

  try {
    await fs.access(directoryPath)
  } catch {
    return []
  }

  const filenames = await fs.readdir(directoryPath)
  const mdxFiles = filenames.filter(
    (filename) => filename.endsWith('.mdx') && filename.replace(/\.mdx$/, '').trim() !== ''
  )

  if (mdxFiles.length === 0) {
    return []
  }

  const results = await Promise.all(
    mdxFiles.map(async (filename): Promise<Post | null> => {
      const slug = filename.replace(/\.mdx$/, '')
      const filePath = path.join(directoryPath, filename)

      try {
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const { data, content } = matter(fileContent)
        const frontmatter = data as Frontmatter

        return frontmatter.title && content ? { slug, frontmatter, content } : null
      } catch (error: unknown) {
        const err = error as NodeJS.ErrnoException
        console.error(`Error processing ${filename}:`, err.message)
        return null
      }
    })
  )

  return results.filter((item): item is Post => item !== null)
}
