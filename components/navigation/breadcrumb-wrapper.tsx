"use client"

import { Breadcrumbs } from "./breadcrumbs"
import { usePathname } from "next/navigation"

export function BreadcrumbWrapper({ title }: { title?: string }) {
  const pathname = usePathname()

  const breadcrumbs = [
    { href: '/', label: 'Home' },
    ...pathname.split('/')
      .filter(Boolean)
      .map((segment, i, segments) => ({
        href: `/${segments.slice(0, i + 1).join('/')}`,
        label: segment.replace(/-/g, ' '),
        isCurrent: i === segments.length - 1
      }))
  ]

  return (
    <Breadcrumbs
      items={breadcrumbs}
      className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-4"
    />
  )
}
