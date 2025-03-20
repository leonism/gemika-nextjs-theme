"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

interface MobileMenuProps {
  items: NavItem[]
  cta?: {
    label: string
    href: string
  }
}

export function MobileMenu({ items, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = ""
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label={isOpen ? "Close menu" : "Open menu"}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="text-3xl font-bold" onClick={closeMenu}>
              Gerous
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="space-y-6">
            {items.map((item) => (
              <div key={item.href} className="space-y-2">
                <Link
                  href={item.href}
                  className={cn(
                    "block text-xl font-medium",
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-300",
                  )}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>

                {item.children && (
                  <div className="pl-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-700">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block text-lg",
                          pathname === child.href ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-300",
                        )}
                        onClick={closeMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {cta && (
            <div className="mt-8">
              <Button asChild className="w-full rounded-full" onClick={closeMenu}>
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

