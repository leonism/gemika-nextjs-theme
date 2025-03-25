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

export function Navbar({
  items,
  cta = { label: "Contact", href: "/contact" } // Default CTA
}: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full dark:bg-gray-950/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - removed hover animation */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300"
              aria-label="Go to homepage"
            >
              <span className="relative text-white font-bold text-sm tracking-wide">
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
                      "px-4 py-2 font-medium flex items-center transition-all duration-300",
                      pathname?.startsWith(item.href)
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    )}
                  >
                    <span className="relative group">
                      {item.label}
                      {/* Hover animation underline */}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
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
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white/90 dark:bg-gray-900/90 rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={cn(
                          "block px-4 py-3 text-sm transition-colors relative",
                          pathname === child.href
                            ? "text-indigo-600 dark:text-indigo-400 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                        )}
                      >
                        {child.label}
                        {/* Only show hover animation when directly hovered */}
                        <span className="absolute left-4 bottom-2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 hover:w-[calc(100%-2rem)]"></span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 font-medium transition-all duration-300 relative group",
                    pathname === item.href
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  )}
                >
                  {item.label}
                  {/* Hover animation underline */}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            )}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" />
              </div>

              <ThemeToggle className="w-5 h-5" />

              {/* CTA Button - removed translate animation, kept color change */}
              {cta?.href && cta?.label && (
                <Link href={cta.href} className="block">
                  <Button
                    variant="default"
                    size="sm"
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-colors duration-300"
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
