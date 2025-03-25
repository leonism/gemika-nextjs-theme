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
  cta = { label: "Contact", href: "/contact" }
}: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="relative inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2.5 overflow-hidden font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300"
              aria-label="Go to homepage"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
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
              <span className="relative text-white font-bold text-xs sm:text-sm tracking-wide">
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
                      "px-3 py-1.5 sm:px-4 sm:py-2 font-medium flex items-center transition-all duration-300 text-sm sm:text-base",
                      pathname?.startsWith(item.href)
                        ? "text-indigo-600 dark:text-[#C4F468]"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    )}
                  >
                    <span className="relative group">
                      {item.label}
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
                      className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:rotate-180"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-white/90 dark:bg-[#141D2B]/90 rounded-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-lg border border-gray-200 dark:border-[#313F55]">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={cn(
                          "block px-4 py-2 text-sm transition-colors relative",
                          pathname === child.href
                            ? "text-indigo-600 dark:text-[#C4F468] font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-[#313F55]/50"
                        )}
                      >
                        {child.label}
                        <span className="absolute left-4 bottom-1 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 hover:w-[calc(100%-2rem)]"></span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 sm:px-4 sm:py-2 font-medium transition-all duration-300 relative group text-sm sm:text-base",
                    pathname === item.href
                      ? "text-indigo-600 dark:text-[#C4F468]"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  )}
                >
                  {item.label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            )}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" />
              </div>

              <ThemeToggle className="w-4 h-4 sm:w-5 sm:h-5" />

              {cta?.href && cta?.label && (
                <Link href={cta.href} className="block">
                  <Button
                    variant="default"
                    size="sm"
                    className="px-4 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-colors duration-300 text-sm sm:text-base"
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

export default Navbar;
