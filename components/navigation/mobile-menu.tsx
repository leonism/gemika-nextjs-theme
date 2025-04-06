"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search } from "@/components/search";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";

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

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button (Hamburger) */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative z-50 cursor-pointer"
        aria-label="Open mobile menu"
      >
        <Menu className="h-8 w-8 font-bold text-gray-900 dark:text-gray-100" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 overflow-y-auto">
          <div className="container mx-auto px-6 py-8 h-full flex flex-col">
            {/* Header with Close Button */}
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="text-3xl font-bold text-gray-900 dark:text-gray-100">

              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
                aria-label="Close mobile menu"
              >
                <X className="h-8 w-8 font-bold text-gray-900 dark:text-gray-100" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto space-y-8">
              {items.map((item) => (
                <div key={item.href} className="space-y-4">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block text-2xl font-medium py-2 transition-colors duration-300",
                      "text-gray-900 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-6 space-y-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block text-xl py-2 transition-colors duration-300",
                            "text-gray-700 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
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

            {/* Bottom Section */}
            <div className="pt-8">
              <div className="flex items-center justify-between mb-8">
                <div className="h-8 w-8 font-bold">
                  <Search />
                </div>
                <ThemeToggle className="h-8 w-8 font-bold" />
              </div>

              {/* Call-to-Action Button */}
              {cta && (
                <Button
                  asChild
                  className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 text-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <Link href={cta.href} onClick={() => setIsOpen(false)}>
                    {cta.label}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
