"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search } from "@/components/search"

export function StickyHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold">
          Gerous
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`font-medium ${pathname === "/" ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-300"}`}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={`font-medium ${pathname.startsWith("/projects") ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-300"}`}
          >
            Projects
          </Link>
          <Link
            href="/posts"
            className={`font-medium ${pathname.startsWith("/posts") ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-300"}`}
          >
            Posts
          </Link>
          <div className="relative group">
            <button
              className={`font-medium flex items-center ${pathname.startsWith("/resources") ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-300"}`}
            >
              Resources
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 h-4 w-4"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                href="/resources/design"
                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${pathname === "/resources/design" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
              >
                Design Resources
              </Link>
              <Link
                href="/resources/development"
                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${pathname === "/resources/development" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
              >
                Development Tools
              </Link>
              <Link
                href="/resources/books"
                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${pathname === "/resources/books" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
              >
                Books & Articles
              </Link>
            </div>
          </div>
          <Link
            href="/about"
            className={`font-medium ${pathname === "/about" ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-300"}`}
          >
            About Me
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Search />
          <ThemeToggle />
          <Button className="rounded-full">Get in touch</Button>
        </div>
      </div>
    </header>
  )
}

