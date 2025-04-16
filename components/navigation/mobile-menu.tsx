"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from 'next/navigation';

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

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

// Changed from export to regular function to avoid conflicts
function Logo() {
  return (
    <div className="flex-shrink-0">
      <Link href="/" aria-label="Go to homepage">
        <LogoIcon />
      </Link>
    </div>
  );
}

function LogoIcon() {
  return (
    <Image
      src="/logo.png"
      alt="Gemika Logo"
      width={28}
      height={28}
      className="mr-1 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 filter brightness-0 invert"
      priority
    />
  );
}

export function MobileMenu({ items, cta }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    // Improved type safety for window and document checks
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const body = document.body;

      // Prevent body scrolling when menu is open
      body.style.overflow = isOpen ? "hidden" : "";

      if (isOpen) {
        window.addEventListener("popstate", handleRouteChange);
      } else {
        window.removeEventListener("popstate", handleRouteChange);
      }
    }

    // Cleanup function
    return () => {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        document.body.style.overflow = "";
        window.removeEventListener("popstate", handleRouteChange);
      }
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button (Hamburger) */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative z-50 cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Open mobile menu"
      >
        <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" />
      </button>

      {/* Mobile Menu Overlay with transition */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel with slide-in animation */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-gray-900 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header with Close Button and Theme Toggle (replacing logo) */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
            {/* Theme Toggle - perfectly rounded */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 shadow-sm dark:bg-gray-800">
              <ThemeToggle className="h-5 w-5" />
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close mobile menu"
            >
              <X className="h-6 w-6 text-gray-900 dark:text-gray-100" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {items.map((item) => (
              <div key={item.href} className="py-1">
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-1 text-base font-medium transition-colors duration-200",
                    pathname === item.href ||
                    (item.href !== "/" && pathname?.startsWith(item.href))
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                      : "text-gray-900 hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-indigo-400"
                  )}
                >
                  {item.label}
                </Link>
                {/* Navigation Sub Items */}
                {item.children && (
                  <div className="mt-1 space-y-1 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                          pathname === child.href
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                            : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-indigo-400"
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

          {/* Bottom Section - Call-to-Action / Contact Button */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            {cta && (
              <Button
                asChild
                className="w-full rounded-full bg-indigo-600 py-2 text-base font-medium text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
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
