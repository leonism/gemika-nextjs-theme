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
          className="rounded-full bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200"
        >
          {tag.name} ({tag.count})
        </Link>
      ))}
    </div>
  )
}
