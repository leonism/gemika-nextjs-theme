import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from '@/components/navigation/footer'
import { Navbar } from '@/components/navigation/navbar'
import { SkipNav } from '@/components/navigation/skip-nav'
import { ThemeProvider } from '@/components/utility/theme-provider'
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
    <html lang="en">
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SkipNav />
          <Navbar items={navItems} />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
