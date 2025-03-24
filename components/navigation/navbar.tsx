"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search } from "@/components/search";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/navigation/mobile-menu";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface NavbarProps {
  items: NavItem[];
  cta?: { label: string; href: string };
}

export function Navbar({ items, cta }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/95 dark:bg-gray-950/95 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="relative inline-flex items-center justify-center px-4 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 ease-out rounded-full group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
              aria-label="Go to homepage"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></span>
              <span className="relative group-hover:tracking-wider transition-all duration-200 font-bold text-sm">
                BenJo Theme
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {items.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button
                    className={cn(
                      "px-4 py-2 font-medium flex items-center rounded-full transition-all duration-200",
                      pathname?.startsWith(item.href)
                        ? "text-indigo-600 dark:text-indigo-400 bg-gray-100 dark:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    )}
                  >
                    {item.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100 dark:border-gray-800">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={cn(
                          "block px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                          pathname === child.href
                            ? "text-indigo-600 dark:text-indigo-400 font-medium"
                            : "text-gray-700 dark:text-gray-300"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 font-medium rounded-full transition-all duration-200",
                    pathname === item.href
                      ? "text-indigo-600 dark:text-indigo-400 bg-gray-100 dark:bg-gray-800"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-2">
              <Search />
              <ThemeToggle />
              {cta && (
                <Link href={cta.href}>
                  <Button
                    variant="default"
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    {cta.label}
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <MobileMenu items={items} cta={cta} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
