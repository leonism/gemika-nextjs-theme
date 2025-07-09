import type { ReactNode } from 'react'

import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { Container } from '@/components/ui/container'

interface CategoryLayoutProps {
  children: ReactNode
  title: string
  description?: string
  breadcrumbs?: { label: string; href: string }[]
  filters?: ReactNode
  pagination?: ReactNode
}

export function CategoryLayout({
  children,
  title,
  description,
  breadcrumbs,
  filters,
  pagination,
}: CategoryLayoutProps) {
  return (
    <Container>
      {breadcrumbs && (
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      <div className="mb-12">
        <h1 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-gray-100 dark:to-gray-400">
          {title}
        </h1>
        {description && <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>}
      </div>

      {filters && <div className="mb-8">{filters}</div>}

      <main>{children}</main>

      {pagination && <div className="mt-12">{pagination}</div>}
    </Container>
  )
}
