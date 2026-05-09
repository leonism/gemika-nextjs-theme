import Link from 'next/link'

interface HeroActionProps {
  href: string
  label: string
}

function HeroButton({ href, label }: HeroActionProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-full px-5 py-2 font-medium sm:px-6 sm:py-2.5 md:px-8 md:py-3"
    >
      <span className="absolute inset-0 h-full w-full translate-x-0 -skew-x-12 transform bg-linear-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out group-hover:translate-x-12 group-hover:skew-x-12"></span>
      <span className="absolute inset-0 h-full w-full -translate-x-12 -skew-x-12 transform bg-linear-to-r from-indigo-700 to-purple-700 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:skew-x-12"></span>
      <span className="relative text-sm font-medium text-white sm:text-base md:text-lg">
        {label}
      </span>
    </Link>
  )
}

export function HeroActions() {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-3 sm:mb-12 sm:gap-4 md:mb-16 md:gap-5">
      <HeroButton href="/projects" label="View My Work" />
      <HeroButton href="/contact" label="Get In Touch" />
    </div>
  )
}
