import type { ReactNode } from "react"
import { Container } from "@/components/ui/container"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface NotFoundLayoutProps {
  children?: ReactNode
  title?: string
  message?: string
  image?: ReactNode
  searchBar?: ReactNode
}

export function NotFoundLayout({
  children,
  title = "404 - Page Not Found",
  message = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  image,
  searchBar,
}: NotFoundLayoutProps) {
  return (
    <Container>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          {title}
        </h1>

        {image && <div className="my-8">{image}</div>}

        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">{message}</p>

        {searchBar ? (
          <div className="mb-8 w-full max-w-md">{searchBar}</div>
        ) : (
          <div className="mb-8 w-full max-w-md">
            <div className="flex">
              <input
                type="search"
                placeholder="Search for content..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="rounded-l-none">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            <Button asChild variant="outline">
              <Link href="/">Go to homepage</Link>
            </Button>
          </div>
        )}

        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>

        {children}
      </div>
    </Container>
  )
}
