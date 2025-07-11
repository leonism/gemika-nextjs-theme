import './styles/globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import { Footer } from '@/components/navigation/footer'
import { Navbar } from '@/components/navigation/navbar'
import { SkipNav } from '@/components/navigation/skip-nav'
import { ThemeProvider } from '@/components/utility/theme-provider'
import { CookieConsent } from '@/components/cookie-consent'
import { DebugGTM } from '@/components/debug-gtm'
import { navItems } from '@/data/nav-items'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gemika.vercel.app'
const gtmId = process.env.NEXT_PUBLIC_GTM_ID

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Gemika Haziq Nugroho | Creative Technologist & UX Designer',
    template: '%s | Gemika Haziq Nugroho',
  },
  description:
    'Digital garden of thoughts on design, code and creative processes. Expert in UX/UI design, frontend development, and creative technology solutions.',
  keywords: [
    'UX Designer',
    'Creative Technologist',
    'Frontend Developer',
    'UI/UX Design',
    'Web Development',
    'Portfolio',
    'Design Systems',
    'React Developer',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Gemika Haziq Nugroho' }],
  creator: 'Gemika Haziq Nugroho',
  publisher: 'Gemika Haziq Nugroho',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Gemika Haziq Nugroho',
    title: 'Gemika Haziq Nugroho | Creative Technologist & UX Designer',
    description:
      'Digital garden of thoughts on design, code and creative processes. Expert in UX/UI design, frontend development, and creative technology solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gemika Haziq Nugroho - Creative Technologist & UX Designer',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gemika',
    creator: '@gemika',
    title: 'Gemika Haziq Nugroho | Creative Technologist & UX Designer',
    description:
      'Digital garden of thoughts on design, code and creative processes. Expert in UX/UI design, frontend development, and creative technology solutions.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  alternates: {
    canonical: siteUrl,
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        {gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        )}
      </head>
      <body
        className={`${inter.variable} min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800`}
      >
        {/* Google Tag Manager (noscript) */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SkipNav />
          <Navbar items={navItems} />
          <main id="main-content" className="relative z-10">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          <DebugGTM />
        </ThemeProvider>
        {/* Animated background elements from design page */}
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
          <div className="animate-blob absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-indigo-200 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-10"></div>
          <div className="animate-blob animation-delay-2000 absolute -right-20 top-1/2 h-72 w-72 rounded-full bg-emerald-200 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-10"></div>
          <div className="animate-blob animation-delay-4000 absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-amber-200 opacity-20 mix-blend-multiply blur-3xl filter dark:opacity-10"></div>
        </div>
      </body>
    </html>
  )
}
