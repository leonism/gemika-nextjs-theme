import type { ReactNode } from "react"
import { Container } from "@/components/ui/container"

interface HomeLayoutProps {
  children: ReactNode
  heroSection?: ReactNode
  featuredPostsSection?: ReactNode
  trendingTopicsSection?: ReactNode
  latestPostsSection?: ReactNode
  newsletterSection?: ReactNode
}

export function HomeLayout({
  children,
  heroSection,
  featuredPostsSection,
  trendingTopicsSection,
  latestPostsSection,
  newsletterSection,
}: HomeLayoutProps) {
  return (
    <div className="min-h-screen">
      {heroSection && (
        <section className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
          {heroSection}
        </section>
      )}

      <Container>
        {featuredPostsSection && <section className="py-12">{featuredPostsSection}</section>}

        {trendingTopicsSection && (
          <section className="py-12 bg-gray-50 dark:bg-gray-900 rounded-lg my-12">{trendingTopicsSection}</section>
        )}

        {latestPostsSection && <section className="py-12">{latestPostsSection}</section>}

        {newsletterSection && (
          <section className="py-12 bg-gray-50 dark:bg-gray-900 rounded-lg my-12">{newsletterSection}</section>
        )}

        {children}
      </Container>
    </div>
  )
}

