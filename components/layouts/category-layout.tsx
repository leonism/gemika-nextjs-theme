import type { ReactNode } from "react"
import { Container } from "@/components/ui/container"
import { Breadcrumbs } from "@/components/navigation/breadcrumbs"

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
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
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

