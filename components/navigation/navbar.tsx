'use client'

import { usePathname } from 'next/navigation'
import { Logo } from './navbar/Logo'
import { DesktopNav } from './navbar/DesktopNav'
import { DesktopControls } from './navbar/DesktopControls'
import { MobileControls } from './navbar/MobileControls'
import { NavItem, NavCTA } from '@/types/nav'

interface NavbarProps {
  items: NavItem[]
  cta?: NavCTA
}

/**
 * Main Navbar component that orchestrates the logo, desktop navigation,
 * and controls for both desktop and mobile views.
 */
export function Navbar({ items, cta = { label: 'Contact', href: '/contact' } }: NavbarProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-gray-200/50 bg-white shadow-md sm:h-16 md:h-18 lg:h-20 dark:border-gray-800/50 dark:bg-gray-900">
      <div className="container mx-auto flex h-full max-w-7xl items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex-1">
          <Logo />
        </div>

        {/* Center: Desktop Navigation */}
        <div className="flex flex-1 justify-center">
          <DesktopNav items={items} pathname={pathname} />
        </div>

        {/* Right: Controls (Theme, Search, CTA, Mobile Menu) */}
        <div className="flex flex-1 justify-end">
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
            <DesktopControls cta={cta} />
            <MobileControls items={items} cta={cta} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
