"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search } from "@/components/search";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/navigation/mobile-menu"; // Import MobileMenu

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
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold">
          gemika
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {items.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button
                  className={cn(
                    "font-medium flex items-center",
                    pathname?.startsWith(item.href)
                      ? "text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-300"
                  )}
                >
                  {item.label}
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
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className={cn(
                        "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800",
                        pathname === child.href
                          ? "bg-gray-100 dark:bg-gray-800"
                          : ""
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
                  "font-medium",
                  pathname === item.href
                    ? "text-black dark:text-white"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <MobileMenu items={items} cta={cta} /> {/* Render MobileMenu */}
        </div>

        {/* Desktop CTA and Theme Toggle */}
        <div className="hidden md:flex items-center space-x-2">
          <Search />
          <ThemeToggle />
          {cta && (
            <Link href={cta.href}>
              <Button className="rounded-full">
                {cta.label}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
