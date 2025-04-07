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

function LogoIcon() {
  return (
    <svg
      className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5 md:mr-2 animate-pulse"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="url(#logo-gradient)" />
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Logo() {
  return (
    <div className="flex-shrink-0">
      <Link
        href="/"
        className="relative inline-flex items-center justify-center px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 overflow-hidden font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
        aria-label="Go to homepage"
      >
        <LogoIcon />
        <span className="relative text-white font-bold text-xs sm:text-sm md:text-base tracking-wide">
          BenJo Theme
        </span>
      </Link>
    </div>
  );
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
        <div className="fixed top-0 left-0 w-full h-120 z-50 bg-white dark:bg-gray-900 overflow-y-auto transform translate-y-0 transition-transform duration-300 ease-in-out">
          <div className="container mx-auto px-0 py-0 h-full flex flex-col">
            {/* Header with Close Button */}
            <div className="flex justify-between items-center px-0 py-0 mx-5 my-2">
              <Logo />
              {/* X Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
                aria-label="Close mobile menu"
              >
                <X className="h-8 w-8 mt-1 mr-1 font-bold text-gray-900 dark:text-gray-100" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto space-y-1 mx-5 my-2">
              {items.map((item) => (
                <div key={item.href} className="space-y-1">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block text-md font-medium py-1 transition-colors duration-300",
                      "text-gray-900 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
                    )}
                  >
                    {item.label}
                  </Link>
                  {/* Navigation Sub Items */}
                  {item.children && (
                    <div className="pl-3 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "block text-md py-1 transition-colors duration-300",
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
            <div className="pt-1 px-0 mx-5 my-2">
              <div className="flex items-center justify-between mb-4">
                <div className="h-8 w-8 block text-md">
                  <Search />
                </div>
                <div className="h-8 w-8 block text-md">
                  <ThemeToggle className="h-8 w-8" />
                </div>
              </div>

              {/* Call-to-Action / Contact Button */}
              <div className="flex items-center justify-between m-4">
              {cta && (
                <Button
                  asChild
                  className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 text-lg font-medium shadow-md hover:shadow-lg transition-all mb-4"
                >
                  <Link href={cta.href} onClick={() => setIsOpen(false)}>
                    {cta.label}
                  </Link>
                </Button>
              )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Overlay for the transition */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen( false )}>
        </div>
      )}
    </div>
  );
}
