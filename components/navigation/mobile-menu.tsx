"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search } from "@/components/search";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface MobileMenuProps {
  items: NavItem[];
  cta?: {
    label: string;
    href: string;
  };
}

export function MobileMenu({ items, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="relative z-50"
      >
        {isOpen ? <X className="h-6 w-6 text-gray-900 dark:text-gray-100" /> : <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" />}
      </Button>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 dark:bg-gray-900 transition-opacity duration-300 ease-in-out",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="container mx-auto px-6 py-8 h-full flex flex-col">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="text-3xl font-bold text-gray-900 dark:text-gray-100" onClick={() => setIsOpen(false)}>
              Daryl Mercer
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="text-gray-900 dark:text-gray-100"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto space-y-8">
            {items.map((item) => (
              <div key={item.href} className="space-y-4">
                <Link
                  href={item.href}
                  className={cn(
                    "block text-2xl font-medium py-2 transition-colors duration-300",
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-900 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-6 space-y-4 border-l-2 border-gray-300 dark:border-gray-700">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block text-xl py-2 transition-colors duration-300",
                          pathname === child.href
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-gray-700 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-300 dark:border-gray-700">
            {/* Search and Theme Toggle */}
            <div className="flex items-center justify-between mb-8">
              <Search />
              <ThemeToggle />
            </div>

            {/* Call-to-Action Button */}
            {cta && (
              <Button
                asChild
                className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 text-lg font-medium shadow-md hover:shadow-lg transition-all"
                onClick={() => setIsOpen(false)}>
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
