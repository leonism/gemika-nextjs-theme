"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extract headings from the page
  useEffect(() => {
    const extractHeadings = () => {
      const elements = Array.from(document.querySelectorAll("h2, h3, h4"))

      const items = elements
        .filter((el) => el.id) // Only include elements with IDs
        .map((el) => ({
          id: el.id,
          text: el.textContent || "",
          level: Number(el.tagName.substring(1)), // Get heading level (2 for h2, 3 for h3, etc.)
        }))

      setHeadings(items)
    }

    extractHeadings()

    // Re-extract headings if content changes
    const observer = new MutationObserver(extractHeadings)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  // Track active heading based on scroll position
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "0px 0px -80% 0px",
      },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className={cn("space-y-2", className)}>
      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Table of Contents</h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "transition-colors",
              heading.level === 2 ? "pl-0" : "",
              heading.level === 3 ? "pl-4" : "",
              heading.level === 4 ? "pl-8" : "",
              activeId === heading.id
                ? "text-primary font-medium"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100",
            )}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

