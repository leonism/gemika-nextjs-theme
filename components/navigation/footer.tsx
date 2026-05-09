import { NewsletterSection } from './footer/NewsletterSection'
import { MainFooterContent } from './footer/MainFooterContent'
import { Container } from '@/components/ui/container'

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
    <footer className="z-60 border-t border-gray-200 bg-white py-12 sm:py-16 dark:border-gray-800 dark:bg-gray-900">
      <Container>
        {/* Newsletter Section - Optional based on showNewsletter prop */}
        {showNewsletter && <NewsletterSection />}
        {/* Main Footer Content */}
        <MainFooterContent />
      </Container>
    </footer>
  )
}
