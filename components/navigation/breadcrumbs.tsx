import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbsProps {
  items: {
    label: string
    href: string
  }[]
  className?: string
  homeHref?: string
  showHome?: boolean
}

export function Breadcrumbs({ items, className, homeHref = "/", showHome = true }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
      <ol className="flex items-center flex-wrap">
        {showHome && (
          <li className="flex items-center">
            <Link
              href={homeHref}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          </li>
        )}

        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index === items.length - 1 ? (
              <span className="font-medium text-gray-900 dark:text-gray-100" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {item.label}
                </Link>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

