import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { FooterSocials } from './FooterSocials'
import { FooterColumn } from './FooterColumn'
import { FooterCopyright } from './FooterCopyright'

export function MainFooterContent() {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/posts', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const resources = [
    { href: '/resources/design', label: 'Design Resources' },
    { href: '/resources/development', label: 'Development Tools' },
    { href: '/resources/books', label: 'Books & Articles' },
    { href: '/sitemap.xml', label: 'Sitemap' },
    { href: '/rss.xml', label: 'RSS Feed' },
  ]

  const legal = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/resources/books', label: 'Cookies Consent' },
  ]

  return (
    <div className="inline-grid py-12">
      <div className="grid grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-5 lg:px-8">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link
            href="/"
            className="bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent"
          >
            Gemika Theme
          </Link>
          <p className="text-gray-600 dark:text-gray-400">
            Expert user experience strategist and mobile developer creating intuitive digital
            experiences.
          </p>
          <FooterSocials />
        </div>

        {/* Links Columns */}
        <FooterColumn title="Quick Links" links={quickLinks} />
        <FooterColumn title="Resources" links={resources} />
        <FooterColumn title="Legal" links={legal} />

        {/* Contact Column */}
        <FooterColumn title="Contact">
          <ul className="space-y-2">
            <li className="flex items-center">
              <Mail size={16} className="mr-2 text-gray-600 dark:text-gray-400" />
              <a
                href="mailto:hello@gemika.com"
                className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                hello@gemika.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone size={16} className="mr-2 text-gray-600 dark:text-gray-400" />
              <a
                href="tel:+1234567890"
                className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                +1 (234) 567-890
              </a>
            </li>
            <li className="flex items-start">
              <MapPin size={16} className="mr-2 mt-1 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                123 Design Street
                <br />
                San Francisco, CA 94103
              </span>
            </li>
          </ul>
        </FooterColumn>
      </div>

      <FooterCopyright />
    </div>
  )
}
