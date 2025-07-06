import Link from "next/link";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Container } from "@/components/ui/container";

interface FooterProps {
  showNewsletter?: boolean;
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
    <footer className="border-t border-gray-200 bg-white shadow-inner dark:border-gray-800 dark:bg-gray-900">
      {/* mt-10 sm:mt-12 md:mt-14 lg:mt-16 */}
      <Container>
        {/* Newsletter Section - Optional based on showNewsletter prop */}
        {showNewsletter && (
          <div className="border-b border-gray-200 py-12 dark:border-gray-800">
            <div className="mx-auto max-w-xl px-4 text-center">
              {" "}
              {/* Added responsive padding */}
              <h3 className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent">
                Subscribe to our Newsletter
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Stay updated with the latest design trends, development tips,
                and industry news.
              </p>
              <NewsletterForm />
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
            {" "}
            {/* Added responsive padding */}
            {/* Brand/Company Information Column */}
            <div className="space-y-4">
              <Link
                href="/"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent"
              >
                Gemika Theme
              </Link>
              <p className="text-gray-600 dark:text-gray-400">
                Expert user experience strategist and mobile developer creating
                intuitive digital experiences.
              </p>
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </Link>
              </div>
            </div>
            {/* Quick Links Column */}
            <div>
              <h3 className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-lg font-semibold text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/posts"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            {/* Resources Column */}
            <div>
              <h3 className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-lg font-semibold text-transparent">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/resources/design"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Design Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/development"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Development Tools
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/books"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Books & Articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap.xml"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    Sitemap
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rss.xml"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    RSS Feed
                  </Link>
                </li>
              </ul>
            </div>
            {/* Contact Information Column */}
            <div>
              <h3 className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-lg font-semibold text-transparent">
                Contact
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail
                    size={16}
                    className="mr-2 text-gray-600 dark:text-gray-400"
                  />
                  <a
                    href="mailto:hello@gemika.com"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    hello@gemika.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone
                    size={16}
                    className="mr-2 text-gray-600 dark:text-gray-400"
                  />
                  <a
                    href="tel:+1234567890"
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin
                    size={16}
                    className="mr-2 mt-1 text-gray-600 dark:text-gray-400"
                  />
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
          <div className="mt-12 border-t border-gray-200 px-4 pt-8 text-center text-gray-600 dark:border-gray-800 dark:text-gray-400 sm:px-6 lg:px-8">
            {" "}
            {/* Added responsive padding */}
            <p>© {new Date().getFullYear()} gemika. All rights reserved.</p>
            <div className="mt-2 text-sm">
              <Link href="/privacy" className="mr-4 hover:underline">
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
  );
}
