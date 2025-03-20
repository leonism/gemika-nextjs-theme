"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Search } from "@/components/search"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import { SkipNav } from "@/components/navigation/skip-nav"

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

interface BlurNavbarProps {
  logo?: React.ReactNode
  items: NavItem[]
  cta?: {
    label: string
    href: string
  }
}

export function BlurNavbar({ logo, items, cta }: BlurNavbarProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled
          ? "backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm"
          : "bg-transparent",
      )}
    >
      <SkipNav />
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center">
          {logo || (
            <Link href="/" className="text-3xl font-bold">
              Gerous
            </Link>
          )}
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {items.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className={cn(
                  "font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "text-black dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white",
                )}
              >
                {item.label}
                {item.children && (
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
                    className="inline-block ml-1 h-4 w-4"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </Link>

              {item.children && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800",
                        pathname === child.href ? "bg-gray-100 dark:bg-gray-800" : "",
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Search />
          <ThemeToggle />

          {cta && (
            <Button asChild className="rounded-full hidden md:flex">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          )}

          <div className="md:hidden">
            <MobileMenu items={items} cta={cta} />
          </div>
        </div>
      </div>
    </header>
  )
}

