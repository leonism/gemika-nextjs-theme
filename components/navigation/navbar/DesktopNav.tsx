import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NavItem } from '@/types/nav'

interface DesktopNavProps {
  items: NavItem[]
  pathname: string | null
}

export function DesktopNav({ items, pathname }: DesktopNavProps) {
  return (
    <nav className="hidden items-center space-x-0.5 sm:space-x-1 md:flex md:space-x-2">
      {items.map((item) => (
        <NavigationItem key={item.label} item={item} pathname={pathname} />
      ))}
    </nav>
  )
}

function NavigationItem({ item, pathname }: { item: NavItem; pathname: string | null }) {
  return item.children ? (
    <DropdownNavItem item={item} pathname={pathname} />
  ) : (
    <SimpleNavItem item={item} pathname={pathname} />
  )
}

function DropdownNavItem({ item, pathname }: { item: NavItem; pathname: string | null }) {
  const isActive = pathname?.startsWith(item.href)

  return (
    <div className="group relative">
      <button
        className={cn(
          'flex items-center px-3 py-1.5 text-sm font-medium transition-all duration-300 sm:px-4 sm:py-2 sm:text-base',
          isActive
            ? 'dark:text-dark-accent font-semibold text-indigo-600'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
        )}
      >
        <NavLinkContent label={item.label} active={isActive} />
        <DropdownIcon active={isActive} />
      </button>
      <DropdownMenu item={item} pathname={pathname} />
    </div>
  )
}

function SimpleNavItem({ item, pathname }: { item: NavItem; pathname: string | null }) {
  const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))

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
  )
}

function NavLinkContent({ label, active }: { label: string; active?: boolean }) {
  return (
    <>
      {label}
      <span
        className={cn(
          'absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-300',
          active ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      ></span>
    </>
  )
}

function DropdownIcon({ active }: { active?: boolean }) {
  return (
    <ChevronDown
      className={cn(
        'ml-0.5 h-2 w-2 transition-transform sm:ml-1 sm:h-3 sm:w-3 md:h-4 md:w-4',
        active ? 'dark:text-dark-accent rotate-180 text-indigo-500' : 'group-hover:rotate-180'
      )}
    />
  )
}

function DropdownMenu({ item, pathname }: { item: NavItem; pathname: string | null }) {
  return (
    <div className="transform-translate-x-1/2 dark:border-dark-4 dark:bg-dark-1/90 invisible absolute left-1/2 z-50 mt-1 w-36 rounded-lg border border-gray-200 bg-white/90 py-1 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:opacity-100 sm:w-40 md:w-48">
      {item.children?.map((child) => (
        <DropdownMenuItem key={child.label} item={child} pathname={pathname} />
      ))}
    </div>
  )
}

function DropdownMenuItem({ item, pathname }: { item: NavItem; pathname: string | null }) {
  const isActive = pathname === item.href

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
          'absolute bottom-1 left-3 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-300 sm:left-4',
          isActive
            ? 'w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)]'
            : 'w-0 group-hover:w-[calc(100%-1.5rem)] sm:group-hover:w-[calc(100%-2rem)]'
        )}
      ></span>
    </Link>
  )
}
