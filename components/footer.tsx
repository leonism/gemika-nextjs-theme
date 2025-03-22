import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold">
              Gemika
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              Expert user experience strategist and mobile developer creating intuitive digital experiences.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
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
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
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
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-600 dark:text-gray-400" />
                <a
                  href="mailto:hello@Gemika.com"
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  hello@Gemika.com
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

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Gemika. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
