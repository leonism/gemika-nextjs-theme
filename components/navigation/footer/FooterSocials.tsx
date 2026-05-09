import Link from 'next/link'
import { Facebook, Github, Instagram, Linkedin, Twitter } from '@/components/icons/BrandIcons'

export function FooterSocials() {
  const socials = [
    { href: '#', label: 'Facebook', Icon: Facebook },
    { href: '#', label: 'Twitter', Icon: Twitter },
    { href: '#', label: 'Instagram', Icon: Instagram },
    { href: '#', label: 'LinkedIn', Icon: Linkedin },
    {
      href: 'https://github.com/leonism/gemika-nextjs-theme',
      label: 'GitHub',
      Icon: Github,
    },
  ]

  return (
    <div className="flex space-x-4">
      {socials.map(({ href, label, Icon }) => (
        <Link
          key={label}
          href={href}
          className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
          aria-label={label}
        >
          <Icon size={20} />
        </Link>
      ))}
    </div>
  )
}
