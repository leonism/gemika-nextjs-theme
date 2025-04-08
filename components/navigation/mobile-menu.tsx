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
        className="relative inline-flex items-center justify-center px-2 py-1 overflow-hidden font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
        aria-label="Go to homepage"
      >
        <LogoIcon />
        <span className="relative text-white font-bold text-xs tracking-wide">
          BenJo
        </span>
      </Link>
    </div>
  );
}

export function MobileMenu({ items, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes and prevent body scrolling when menu is open
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    // Prevent body scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button (Hamburger) */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative z-50 cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Open mobile menu"
      >
        <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" />
      </button>

      {/* Mobile Menu Overlay with transition */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel with slide-in animation */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-xs z-50 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
            <Logo />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close mobile menu"
            >
              <X className="h-6 w-6 text-gray-900 dark:text-gray-100" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {items.map((item) => (
              <div key={item.href} className="py-1">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block text-base font-medium py-1 px-3 rounded-lg transition-colors duration-200",
                    "text-gray-900 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-indigo-400 dark:hover:bg-gray-800"
                  )}
                >
                  {item.label}
                </Link>
                {/* Navigation Sub Items */}
                {item.children && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block text-sm py-2 px-3 rounded-lg transition-colors duration-200",
                          "text-gray-700 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-800"
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
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="h-8 w-8">
                <Search />
              </div>
              <div className="h-8 w-8">
                <ThemeToggle className="h-8 w-8" />
              </div>
            </div>

            {/* Call-to-Action / Contact Button */}
            {cta && (
              <Button
                asChild
                className="w-full rounded-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 text-base font-medium shadow-md hover:shadow-lg transition-all"
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
  );
}
