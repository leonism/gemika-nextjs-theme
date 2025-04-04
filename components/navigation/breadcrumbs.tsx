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

export function Breadcrumbs({
  items,
  className,
  homeHref = "/",
  showHome = true
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "w-full border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 py-4",
        className
      )}
    >
      <div className="container mx-auto px-4 flex justify-center">
        <ol className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
          {showHome && (
            <li className="flex items-center">
              <Link
                href={homeHref}
                className={cn(
                  "flex items-center text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400",
                  "transition-colors duration-200"
                )}
              >
                <Home className="h-4 w-4 flex-shrink-0" />
                <span className="sr-only">Home</span>
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            </li>
          )}

          {items.map((item, index) => {
            // Convert label to Title Case
            const formattedLabel = item.label
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return (
              <li key={item.href} className="flex items-center">
                {index === items.length - 1 ? (
                  <span
                    className={cn(
                      "text-sm font-medium text-gray-900 dark:text-gray-100",
                      "truncate max-w-[160px] md:max-w-none"
                    )}
                    aria-current="page"
                  >
                    {formattedLabel}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400",
                        "truncate max-w-[160px] md:max-w-none transition-colors duration-200"
                      )}
                    >
                      {formattedLabel}
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  )
}
