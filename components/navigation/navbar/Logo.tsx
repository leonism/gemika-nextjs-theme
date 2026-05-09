import Link from 'next/link'
import Image from 'next/image'

export function Logo() {
  return (
    <div className="shrink-0">
      <Link
        href="/"
        className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-linear-to-tr from-indigo-600 to-purple-600 p-0 shadow-md transition-all duration-500 hover:scale-110 hover:shadow-lg active:scale-95 md:h-12 md:w-12"
        aria-label="Go to Homepage"
      >
        <div className="relative flex h-full w-full items-center justify-center transition-transform duration-700 ease-in-out group-hover:rotate-360">
          <LogoIcon />
        </div>

        {/* Subtle inner glow */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>
    </div>
  )
}

function LogoIcon() {
  return (
    <Image
      src="/logo-transbg.png"
      alt="Gemika Logo"
      width={28}
      height={28}
      className="h-[28px] w-[28px] brightness-0 invert filter"
      priority
    />
  )
}
