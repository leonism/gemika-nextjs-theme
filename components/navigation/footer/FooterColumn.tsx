import Link from 'next/link'

interface FooterLink {
  href: string
  label: string
}

interface FooterColumnProps {
  title: string
  links?: FooterLink[]
  children?: React.ReactNode
}

export function FooterColumn({ title, links, children }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-lg font-semibold text-transparent">
        {title}
      </h3>
      {links ? (
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        children
      )}
    </div>
  )
}
