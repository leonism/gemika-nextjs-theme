import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react"
import { Container } from "@/components/ui/container"
import { NewsletterForm } from "@/components/forms/newsletter-form"

interface FooterProps {
  showNewsletter?: boolean
}

/**
 * Footer component that displays website footer with optional newsletter section,
 * quick links, resources, contact information, and copyright notice.
 *
 * @param {boolean} showNewsletter - Determines whether to show the newsletter subscription section
 * @returns {JSX.Element} - The footer component with responsive design
 */
export function Footer({ showNewsletter = true }: FooterProps) {
  return (
    <footer className="bg-white shadow-inner border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 mt-10 sm:mt-12 md:mt-14 lg:mt-16">
      <Container>
        {/* Newsletter Section - Optional based on showNewsletter prop */}
        {showNewsletter && (
          <div className="py-12 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-xl mx-auto text-center px-4"> {/* Added responsive padding */}
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Subscribe to our Newsletter
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Stay updated with the latest design trends, development tips, and industry news.
              </p>
              <NewsletterForm />
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8"> {/* Added responsive padding */}
            {/* Brand/Company Information Column */}
            <div className="space-y-4">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                BenJo Theme
              </Link>
              <p className="text-gray-600 dark:text-gray-400">
                Expert user experience strategist and mobile developer creating intuitive digital experiences.
              </p>
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </Link>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/posts"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/resources/design"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Design Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/development"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Development Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/books"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Books & Articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap.xml"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    Sitemap
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rss.xml"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    RSS Feed
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information Column */}
            <div>
              <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Contact
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail size={16} className="mr-2 text-gray-600 dark:text-gray-400" />
                  <a
                    href="mailto:hello@gemika.com"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    hello@gemika.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 text-gray-600 dark:text-gray-400" />
                  <a
                    href="tel:+1234567890"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
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
            </div>
          </div>

          {/* Copyright and Legal Links Section */}
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400 px-4 sm:px-6 lg:px-8"> {/* Added responsive padding */}
            <p>© {new Date().getFullYear()} gemika. All rights reserved.</p>
            <div className="mt-2 text-sm">
              <Link href="/privacy" className="hover:underline mr-4">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
