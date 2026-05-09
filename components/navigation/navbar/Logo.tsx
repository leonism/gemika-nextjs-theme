import Link from 'next/link'
import Image from 'next/image'

export function Logo() {
  return (
    <div className="shrink-0">
      <Link
        href="/"
        className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-indigo-600 to-purple-600 px-4 py-2 font-medium shadow-sm transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-md md:px-5 md:py-2"
        aria-label="Go to Homepage"
      >
        <LogoIcon />
        <span className="relative text-sm font-bold tracking-wide text-white md:text-base">
          Gemika
        </span>
      </Link>
    </div>
  )
}

function LogoIcon() {
  return (
    <Image
      src="/logo-transbg.png"
      alt="Gemika Logo"
      width={34}
      height={34}
      className="mr-1 h-5 w-5 brightness-0 invert filter sm:h-6 sm:w-6 md:h-7 md:w-7"
      priority
    />
  )
}
