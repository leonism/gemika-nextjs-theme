'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MobileMenu } from '@/components/navigation/mobile-menu';
import { Search } from '@/components/search';
import { SearchDialog } from '@/components/search/search-dialog';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

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
  cta = { label: 'Contact', href: '/contact' },
}: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="md:h-18 sticky top-0 z-50 h-14 w-full border-b border-gray-200/50 bg-white shadow-md dark:border-gray-800/50 dark:bg-gray-900 sm:h-16 lg:h-20">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-1">
          <Logo />
        </div>

        {/* Desktop Navigation - centered */}
        <div className="flex flex-1 justify-center">
          <DesktopNav items={items} pathname={pathname} />
        </div>

        {/* Right side controls */}
        <div className="flex flex-1 justify-end">
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
        className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 font-medium shadow-sm transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-md sm:px-4 sm:py-1.5 md:px-5 md:py-2"
        aria-label="Go to Homepage"
      >
        <LogoIcon />
        <span className="relative text-xs font-bold tracking-wide text-white sm:text-sm md:text-base">
          BenJo
        </span>
      </Link>
    </div>
  );
}

function LogoIcon() {
  return (
    <svg
      className="mr-1 h-3 w-3 animate-pulse sm:mr-1.5 sm:h-4 sm:w-4 md:mr-2 md:h-5 md:w-5"
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

function DesktopNav({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string | null;
}) {
  return (
    <nav className="hidden items-center space-x-0.5 sm:space-x-1 md:flex md:space-x-2">
      {items.map((item) => (
        <NavItem key={item.label} item={item} pathname={pathname} />
      ))}
    </nav>
  );
}

function NavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string | null;
}) {
  return item.children ? (
    <DropdownNavItem item={item} pathname={pathname} />
  ) : (
    <SimpleNavItem item={item} pathname={pathname} />
  );
}

function DropdownNavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string | null;
}) {
  return (
    <div className="group relative">
      <button
        className={cn(
          'flex items-center px-3 py-1.5 text-sm font-medium transition-all duration-300 sm:px-4 sm:py-2 sm:text-base',
          pathname?.startsWith(item.href)
            ? 'font-semibold text-indigo-600 dark:text-[#C4F468]'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
        )}
      >
        <NavLinkContent
          label={item.label}
          active={pathname?.startsWith(item.href)}
        />
        <DropdownIcon active={pathname?.startsWith(item.href)} />
      </button>
      <DropdownMenu item={item} pathname={pathname} />
    </div>
  );
}

function SimpleNavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string | null;
}) {
  const isActive =
    pathname === item.href ||
    (item.href !== '/' && pathname?.startsWith(item.href));

  return (
    <Link
      href={item.href}
      className={cn(
        'group relative px-2 py-1 text-xs font-medium transition-all duration-300 sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base',
        isActive
          ? 'font-semibold text-indigo-600'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
      )}
    >
      <NavLinkContent label={item.label} active={isActive} />
    </Link>
  );
}

function NavLinkContent({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <>
      {label}
      <span
        className={cn(
          'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300',
          active ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      ></span>
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
        'ml-0.5 h-2 w-2 transition-transform sm:ml-1 sm:h-3 sm:w-3 md:h-4 md:w-4',
        active
          ? 'rotate-180 text-indigo-500 dark:text-[#C4F468]'
          : 'group-hover:rotate-180'
      )}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}

function DropdownMenu({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string | null;
}) {
  return (
    <div className="transform-translate-x-1/2 invisible absolute left-1/2 z-50 mt-1 w-36 rounded-lg border border-gray-200 bg-white/90 py-1 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-[#313F55] dark:bg-[#141D2B]/90 sm:w-40 md:w-48">
      {item.children?.map((child) => (
        <DropdownMenuItem key={child.label} item={child} pathname={pathname} />
      ))}
    </div>
  );
}

function DropdownMenuItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string | null;
}) {
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        'group relative block px-3 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm',
        isActive
          ? 'font-medium text-indigo-600'
          : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
      )}
    >
      {item.label}
      <span
        className={cn(
          'absolute bottom-1 left-3 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 sm:left-4',
          isActive
            ? 'w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)]'
            : 'w-0 group-hover:w-[calc(100%-1.5rem)] sm:group-hover:w-[calc(100%-2rem)]'
        )}
      ></span>
    </Link>
  );
}

function DesktopControls({ cta }: { cta: { label: string; href: string } }) {
  return (
    <div className="hidden items-center space-x-3 md:flex md:space-x-4">
      {/* Search button - removed rounded background, simplified hover */}
      <div className="flex items-center justify-center transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
        <Search />
      </div>

      {/* Theme toggle - aligned with search icon, removed rounded background */}
      <div className="flex items-center justify-center transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
        <ThemeToggle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </div>

      {/* Contact Button */}
      {cta?.href && cta?.label && (
        <Link href={cta.href} className="block">
          <Button
            variant="default"
            size="sm"
            className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-md sm:px-4 sm:py-1.5 sm:text-sm md:px-5 md:py-2 md:text-base"
          >
            {cta.label}
          </Button>
        </Link>
      )}
    </div>
  );
}

function MobileMenuButton({
  items,
  cta,
}: {
  items: NavItem[];
  cta: { label: string; href: string };
}) {
  return (
    <div className="flex items-center md:hidden">
      <MobileMenu items={items} cta={cta} />
    </div>
  );
}

export default Navbar;
