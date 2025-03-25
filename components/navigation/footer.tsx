import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react"
import { Container } from "@/components/ui/container"
import { NewsletterForm } from "@/components/forms/newsletter-form"

interface FooterProps {
  showNewsletter?: boolean
}

export function Footer({ showNewsletter = true }: FooterProps) {
  // Social media data for cleaner mapping
  const socialLinks = [
    { icon: Facebook, label: "Facebook", url: "#" },
    { icon: Twitter, label: "Twitter", url: "#" },
    { icon: Instagram, label: "Instagram", url: "#" },
    { icon: Linkedin, label: "LinkedIn", url: "#" },
    { icon: Github, label: "GitHub", url: "#" }
  ]

  // Quick links data
  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: "Blog", url: "/posts" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" }
  ]

  // Resources data
  const resources = [
    { name: "Design Resources", url: "/resources/design" },
    { name: "Development Tools", url: "/resources/development" },
    { name: "Books & Articles", url: "/resources/books" },
    { name: "Sitemap", url: "/sitemap.xml" },
    { name: "RSS Feed", url: "/rss.xml" }
  ]

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800/50">
      <Container>
        {/* Newsletter Section with animated background */}
        {showNewsletter && (
          <div className="py-16 border-b border-gray-200 dark:border-gray-800/50 relative overflow-hidden">
            {/* Animated gradient dots background */}
            <div className="absolute inset-0 opacity-10 dark:opacity-5">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-300 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
              <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-emerald-300 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
              <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-amber-300 rounded-full filter blur-3xl animate-pulse"></div>
            </div>

            <div className="max-w-2xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 mb-6">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  STAY UPDATED
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                Join Our Newsletter
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
                Get the latest design trends, development tips, and exclusive content delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="space-y-6">
              <Link href="/" className="inline-block">
                <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                  BenJo Theme
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Crafting intuitive digital experiences through thoughtful UX strategy and cutting-edge development.
              </p>

              {/* Social Links with hover animations */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-200 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-all duration-300 hover:-translate-y-1`}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="font-semibold text-lg mb-6 text-gray-900 dark:text-white flex items-center">
                <span className="w-4 h-0.5 bg-indigo-500 mr-3"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 group-hover:bg-indigo-500 transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-semibold text-lg mb-6 text-gray-900 dark:text-white flex items-center">
                <span className="w-4 h-0.5 bg-emerald-500 mr-3"></span>
                Resources
              </h3>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <Link
                      href={resource.url}
                      className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 group-hover:bg-emerald-500 transition-colors"></span>
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="font-semibold text-lg mb-6 text-gray-900 dark:text-white flex items-center">
                <span className="w-4 h-0.5 bg-amber-500 mr-3"></span>
                Get In Touch
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mr-3 flex-shrink-0">
                    <Mail size={16} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <a
                    href="mailto:hello@gemika.com"
                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    hello@gemika.com
                  </a>
                </li>
                <li className="flex items-start">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mr-3 flex-shrink-0">
                    <Phone size={16} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <a
                    href="tel:+1234567890"
                    className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-start">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-3 flex-shrink-0">
                    <MapPin size={16} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    123 Design Street<br />
                    San Francisco, CA 94103
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-200 dark:border-gray-800/50 mt-16 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              © {new Date().getFullYear()} gemika. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
