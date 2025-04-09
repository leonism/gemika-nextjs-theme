"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search } from "@/components/search";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { SearchDialog } from "@/components/search/search-dialog"

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
    <header className="sticky top-0 z-50 w-full h-14 sm:h-16 md:h-18 lg:h-20 border-b border-gray-200/50 shadow-md bg-white dark:bg-gray-900 dark:border-gray-800/50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-full flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <div className="flex-1">
          <Logo />
        </div>

        {/* Desktop Navigation - centered */}
        <div className="flex-1 flex justify-center">
          <DesktopNav items={items} pathname={pathname} />
        </div>

        {/* Right side controls */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
            {/* Desktop controls (theme toggle and CTA) */}
            <DesktopControls cta={cta} />

            {/* Mobile controls - only search and hamburger */}
            <div className="flex items-center md:hidden">
              {/* Search icon - visible on mobile */}
              <div className="mr-1">
                <Search />
              </div>

              {/* Mobile Navigation */}
              <MobileMenuButton items={items} cta={cta} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Sub-components for better organization
function Logo() {
  return (
    <div className="flex-shrink-0">
      <Link
        href="/"
        className="relative inline-flex items-center justify-center px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 overflow-hidden font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
        aria-label="Go to Homepage"
      >
        <LogoIcon />
        <span className="relative text-white font-bold text-xs sm:text-sm md:text-base tracking-wide">
          BenJo
        </span>
      </Link>
    </div>
  );
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

function DesktopNav({ items, pathname }: { items: NavItem[]; pathname: string | null }) {
  return (
    <nav className="hidden md:flex items-center space-x-0.5 sm:space-x-1 md:space-x-2">
      {items.map((item) => (
        <NavItem key={item.label} item={item} pathname={pathname} />
      ))}
    </nav>
  );
}

function NavItem({ item, pathname }: { item: NavItem; pathname: string | null }) {
  return item.children ? (
    <DropdownNavItem item={item} pathname={pathname} />
  ) : (
    <SimpleNavItem item={item} pathname={pathname} />
  );
}

function DropdownNavItem({ item, pathname }: { item: NavItem; pathname: string | null }) {
  return (
    <div className="relative group">
      <button className={cn(
        "px-3 py-1.5 sm:px-4 sm:py-2 font-medium flex items-center transition-all duration-300 text-sm sm:text-base",
        pathname?.startsWith(item.href)
          ? "text-indigo-600 dark:text-[#C4F468] font-semibold"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      )}>
        <NavLinkContent label={item.label} active={pathname?.startsWith(item.href)} />
        <DropdownIcon active={pathname?.startsWith(item.href)} />
      </button>
      <DropdownMenu item={item} pathname={pathname} />
    </div>
  );
}

function SimpleNavItem({ item, pathname }: { item: NavItem; pathname: string | null }) {
  const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

  return (
    <Link
      href={item.href}
      className={cn(
        "px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 font-medium transition-all duration-300 relative group text-xs sm:text-sm md:text-base",
        isActive
          ? "text-indigo-600 font-semibold"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      )}
    >
      <NavLinkContent label={item.label} active={isActive} />
    </Link>
  );
}

function NavLinkContent({ label, active }: { label: string; active?: boolean }) {
  return (
    <>
      {label}
      <span className={cn(
        "absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300",
        active ? "w-full" : "w-0 group-hover:w-full"
      )}>
      </span>
    </>
  );
}

function DropdownIcon({ active }: { active?: boolean }) {
  return (
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
      className={cn(
        "ml-0.5 sm:ml-1 h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 transition-transform",
        active ? "rotate-180 text-indigo-500 dark:text-[#C4F468]" : "group-hover:rotate-180"
      )}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}

function DropdownMenu({ item, pathname }: { item: NavItem; pathname: string | null }) {
  return (
    <div className="absolute left-1/2 transform-translate-x-1/2 mt-1 w-36 sm:w-40 md:w-48 bg-white/90 dark:bg-[#141D2B]/90 rounded-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-lg border border-gray-200 dark:border-[#313F55] backdrop-blur-sm">
      {item.children?.map((child) => (
        <DropdownMenuItem key={child.label} item={child} pathname={pathname} />
      ))}
    </div>
  );
}

function DropdownMenuItem({ item, pathname }: { item: NavItem; pathname: string | null }) {
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        "block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-colors relative group",
        isActive
          ? "text-indigo-600 font-medium"
          : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      )}
    >
      {item.label}
      <span className={cn(
        "absolute left-3 sm:left-4 bottom-1 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300",
        isActive ? "w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)]" : "w-0 group-hover:w-[calc(100%-1.5rem)] sm:group-hover:w-[calc(100%-2rem)]"
      )}></span>
    </Link>
  );
}

function DesktopControls({ cta }: { cta: { label: string; href: string } }) {
  return (
    <div className="hidden md:flex items-center space-x-3 md:space-x-4">
      {/* Search button - removed rounded background, simplified hover */}
      <div className="flex items-center justify-center transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
        <Search />
      </div>

      {/* Theme toggle - aligned with search icon, removed rounded background */}
      <div className="flex items-center justify-center transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
        <ThemeToggle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </div>

      {/* Contact Button */}
      {cta?.href && cta?.label && (
        <Link href={cta.href} className="block">
          <Button
            variant="default"
            size="sm"
            className="text-white font-bold text-xs px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 text-xs sm:text-sm md:text-base shadow-sm hover:shadow-md"
          >
            {cta.label}
          </Button>
        </Link>
      )}
    </div>
  );
}

function MobileMenuButton({ items, cta }: { items: NavItem[]; cta: { label: string; href: string } }) {
  return (
    <div className="flex items-center md:hidden">
      <MobileMenu items={items} cta={cta} />
    </div>
  );
}

export default Navbar;
