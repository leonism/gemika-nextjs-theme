import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BlurNavbar } from "@/components/navigation/blur-navbar"
import { Footer } from "@/components/navigation/footer"
import { Toaster } from "@/components/ui/toaster"
import { BackToTop } from "@/components/utility/back-to-top"
import JsonLd from "@/components/json-ld"

const inter = Inter({ subsets: ["latin"] })

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Posts",
    href: "/posts",
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Design Resources",
        href: "/resources/design",
      },
      {
        label: "Development Tools",
        href: "/resources/development",
      },
      {
        label: "Books & Articles",
        href: "/resources/books",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
]

export const metadata: Metadata = {
  title: "Gerous - UX Strategist & Mobile Developer",
  description: "Expert user experience strategist and mobile developer portfolio",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gerous.netlify.app"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gerous - UX Strategist & Mobile Developer",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://gerous.netlify.app",
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://gerous.netlify.app"}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <JsonLd data={jsonLd} />
          <div className="flex flex-col min-h-screen">
            <BlurNavbar items={navItems} cta={{ label: "Get in touch", href: "/contact" }} />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'