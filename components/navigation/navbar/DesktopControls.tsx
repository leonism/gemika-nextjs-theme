import Link from 'next/link'
import { Search } from '@/components/search'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { NavCTA } from '@/types/nav'

interface DesktopControlsProps {
  cta: NavCTA
}

export function DesktopControls({ cta }: DesktopControlsProps) {
  return (
    <div className="hidden items-center space-x-3 md:flex md:space-x-4">
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
            className="rounded-full bg-linear-to-r from-indigo-600 to-purple-600 px-3 py-1 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-md sm:px-4 sm:py-1.5 sm:text-sm md:px-5 md:py-2 md:text-base"
          >
            {cta.label}
          </Button>
        </Link>
      )}
    </div>
  )
}
