import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

interface HomeLayoutProps {
  children: ReactNode;
  heroSection?: ReactNode;
  featuredPostsSection?: ReactNode;
  trendingTopicsSection?: ReactNode;
  latestPostsSection?: ReactNode;
  newsletterSection?: ReactNode;
}

/**
 * HomeLayout component provides the main structure for the home page.
 * It's composed of optional sections that can be passed as props.
 *
 * @param {ReactNode} children - Main content children
 * @param {ReactNode} heroSection - Optional hero section component
 * @param {ReactNode} featuredPostsSection - Optional featured posts section
 * @param {ReactNode} trendingTopicsSection - Optional trending topics section
 * @param {ReactNode} latestPostsSection - Optional latest posts section
 * @param {ReactNode} newsletterSection - Optional newsletter section
 */
export function HomeLayout({
  children,
  heroSection,
  featuredPostsSection,
  trendingTopicsSection,
  latestPostsSection,
  newsletterSection,
}: HomeLayoutProps) {

  // Helper component for consistent section styling
  const SectionWrapper = ({
    children,
    className = ""
  }: {
    children: ReactNode;
    className?: string
  }) => (
    <section className={`py-12 ${className}`}>
      {children}
    </section>
  );

  // Helper component for special background sections
  const HighlightSection = ({ children }: { children: ReactNode }) => (
    <SectionWrapper className="bg-gray-50 dark:bg-gray-900 rounded-lg my-12">
      {children}
    </SectionWrapper>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section - Only rendered if provided */}
      {heroSection && (
        <div className="relative overflow-hidden">
          <SectionWrapper className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-5 md:py-24 px-4">
            <div className="container mx-auto">
              {heroSection}
            </div>
          </SectionWrapper>
        </div>
      )}

      {/* Main Content Area */}
      <Container>
        {/* Featured Posts Section */}
        {featuredPostsSection && (
          <SectionWrapper>
            {featuredPostsSection}
          </SectionWrapper>
        )}

        {/* Trending Topics Section */}
        {trendingTopicsSection && (
          <HighlightSection>
            {trendingTopicsSection}
          </HighlightSection>
        )}

        {/* Latest Posts Section */}
        {latestPostsSection && (
          <SectionWrapper>
            {latestPostsSection}
          </SectionWrapper>
        )}

        {/* Newsletter Section */}
        {newsletterSection && (
          <HighlightSection>
            {newsletterSection}
          </HighlightSection>
        )}

        {/* Main Children Content */}
        {children}
      </Container>
    </div>
  );
}
