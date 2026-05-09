import { Search } from '@/components/search'
import { MobileMenu } from '@/components/navigation/mobile-menu'
import { NavItem, NavCTA } from '@/types/nav'

interface MobileControlsProps {
  items: NavItem[]
  cta: NavCTA
}

export function MobileControls({ items, cta }: MobileControlsProps) {
  return (
    <div className="flex items-center md:hidden">
      {/* Search icon - visible on mobile */}
      <div className="mr-1">
        <Search />
      </div>

      {/* Mobile Navigation */}
      <MobileMenu items={items} cta={cta} />
    </div>
  )
}
