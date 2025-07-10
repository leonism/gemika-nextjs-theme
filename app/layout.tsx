import './styles/globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from '@/components/navigation/footer'
import { Navbar } from '@/components/navigation/navbar'
import { SkipNav } from '@/components/navigation/skip-nav'
import { ThemeProvider } from '@/components/utility/theme-provider'
import { CookieConsent } from '@/components/cookie-consent'
import { navItems } from '@/data/nav-items'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Gemika | Creative Technologist',
    template: '%s | Gemika',
  },
  description: 'Digital garden of thoughts on design, code and creative processes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SkipNav />
          <Navbar items={navItems} />
          <main id="main-content" className="relative z-10">
            {children}
          </main>
          <Footer />
          <CookieConsent />
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
