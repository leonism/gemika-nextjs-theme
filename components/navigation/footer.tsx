import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react"
import { Container } from "@/components/ui/container"
import { NewsletterForm } from "@/components/forms/newsletter-form"

interface FooterProps {
  showNewsletter?: boolean
}

export function Footer({ showNewsletter = true }: FooterProps) {
  const socialLinks = [
    { icon: Facebook, label: "Facebook", url: "#" },
    { icon: Twitter, label: "Twitter", url: "#" },
    { icon: Instagram, label: "Instagram", url: "#" },
    { icon: Linkedin, label: "LinkedIn", url: "#" },
    { icon: Github, label: "GitHub", url: "#" }
  ]

  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: "Blog", url: "/posts" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" }
  ]

  const resources = [
    { name: "Design Resources", url: "/resources/design" },
    { name: "Development Tools", url: "/resources/development" },
    { name: "Books & Articles", url: "/resources/books" },
    { name: "Sitemap", url: "/sitemap.xml" },
    { name: "RSS Feed", url: "/rss.xml" }
  ]

  const contactItems = [
    {
      icon: Mail,
      content: <a href="mailto:hello@gemika.com">hello@gemika.com</a>,
      iconClass: "text-indigo-600 dark:text-[#C4F468]",
      bgClass: "bg-indigo-100 dark:bg-[#313F55]/30"
    },
    {
      icon: Phone,
      content: <a href="tel:+1234567890">+1 (234) 567-890</a>,
      iconClass: "text-emerald-600 dark:text-[#C4F468]",
      bgClass: "bg-emerald-100 dark:bg-[#313F55]/30"
    },
    {
      icon: MapPin,
      content: <span>123 Design Street<br />San Francisco, CA 94103</span>,
      iconClass: "text-amber-600 dark:text-[#C4F468]",
      bgClass: "bg-amber-100 dark:bg-[#313F55]/30"
    }
  ]

  const legalLinks = [
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Terms of Service", url: "/terms" },
    { name: "Cookie Policy", url: "/cookies" }
  ]

  return (
    <footer className="bg-white w-full">
      <Container>
        {showNewsletter && (
          <div className="py-12 sm:py-16 border-b border-gray-200 dark:border-[#313F55]/50 relative overflow-hidden">
            <div className="max-w-2xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/80 dark:bg-[#141D2B]/80 shadow-sm backdrop-blur-sm border border-gray-200 dark:border-[#313F55]/50 mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-[#C4F468]">
                  STAY UPDATED
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:text-white bg-clip-text text-transparent">
                Join Our Newsletter
              </h3>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-lg mx-auto">
                Get the latest design trends, development tips, and exclusive content delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
        )}

        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10">
            {/* Brand Column */}
            <div className="space-y-4 sm:space-y-6">
              <Link href="/" className="inline-block">
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:text-white bg-clip-text text-transparent">
                  gemika
                </span>
              </Link>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Crafting intuitive digital experiences through thoughtful UX strategy and cutting-edge development.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map(({ icon: Icon, label, url }, index) => (
                  <Link
                    key={index}
                    href={url}
                    className="p-2 rounded-full bg-white dark:bg-[#141D2B] shadow-sm hover:shadow-md border border-gray-200 dark:border-[#313F55]/50 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-[#C4F468] transition-all duration-300 hover:-translate-y-1"
                    aria-label={label}
                  >
                    <Icon size={16} className="sm:w-5 sm:h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <SectionTitle>Quick Links</SectionTitle>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map(({ name, url }, index) => (
                  <ListItem key={index} url={url} name={name} hoverColor="indigo" />
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <SectionTitle color="emerald">Resources</SectionTitle>
              <ul className="space-y-2 sm:space-y-3">
                {resources.map(({ name, url }, index) => (
                  <ListItem key={index} url={url} name={name} hoverColor="emerald" />
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <SectionTitle color="amber">Get In Touch</SectionTitle>
              <ul className="space-y-3 sm:space-y-4">
                {contactItems.map(({ icon: Icon, content, bgClass, iconClass }, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`p-2 ${bgClass} rounded-full mr-3 flex-shrink-0`}>
                      <Icon size={16} className={iconClass} />
                    </div>
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-current">
                      {content}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-200 dark:border-[#313F55]/50 mt-12 sm:mt-16 pt-6 sm:pt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              © {new Date().getFullYear()} gemika. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {legalLinks.map(({ name, url }) => (
                <Link
                  key={name}
                  href={url}
                  className="text-xs sm:text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-[#C4F468] transition-colors font-medium"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

// Helper components for better organization
function SectionTitle({ children, color = "indigo" }: { children: React.ReactNode, color?: string }) {
  const colorClasses = {
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500"
  }

  return (
    <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 text-gray-900 dark:text-white flex items-center">
      <span className={`w-4 h-0.5 ${colorClasses[color]} mr-3`}></span>
      {children}
    </h3>
  )
}

function ListItem({ url, name, hoverColor }: { url: string, name: string, hoverColor: "indigo" | "emerald" }) {
  const hoverClasses = {
    indigo: "group-hover:bg-indigo-500 hover:text-indigo-600",
    emerald: "group-hover:bg-emerald-500 hover:text-emerald-600"
  }

  return (
    <li>
      <Link
        href={url}
        className="text-sm sm:text-base text-gray-600 dark:text-gray-400 dark:hover:text-[#C4F468] transition-colors duration-300 flex items-center group"
      >
        <span className={`w-2 h-2 bg-gray-400 rounded-full mr-3 ${hoverClasses[hoverColor]} transition-colors`}></span>
        {name}
      </Link>
    </li>
  )
}

export default Footer
