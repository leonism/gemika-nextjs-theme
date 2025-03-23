"use client"; // Mark this as a Client Component

import type { ReactNode } from "react"
import { Container } from "@/components/ui/container"

interface PageLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  hero?: ReactNode
}

export function PageLayout({ children, title, subtitle, hero }: PageLayoutProps) {
  return (
    <Container>
      {hero && <div className="mb-12">{hero}</div>}

      {(title || subtitle) && (
        <header className="mb-12">
          {title && (
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              {title}
            </h1>
          )}
          {subtitle && <p className="text-xl text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </header>
      )}

      <main className="prose prose-lg dark:prose-invert max-w-none">{children}</main>
    </Container>
  )
}
