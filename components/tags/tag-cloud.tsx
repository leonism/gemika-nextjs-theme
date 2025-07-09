'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { getAllContent } from '@/lib/content'

export function TagCloud() {
  const [tags, setTags] = useState<{ name: string; count: number }[]>([])

  useEffect(() => {
    async function loadTags() {
      const posts = await getAllContent('posts')
      const projects = await getAllContent('projects')

      const allTags: Record<string, number> = {}

      ;[...posts, ...projects].forEach((item) => {
        item.frontmatter.tags?.forEach((tag: string) => {
          allTags[tag] = (allTags[tag] || 0) + 1
        })
      })

      setTags(
        Object.entries(allTags)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
      )
    }

    loadTags()
  }, [])

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.name}
          href={`/tags/${encodeURIComponent(tag.name.toLowerCase().replace(/\s+/g, '-'))}`}
          className="inline-flex items-center rounded-md bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-800/50"
        >
          {tag.name} ({tag.count})
        </Link>
      ))}
    </div>
  )
}
