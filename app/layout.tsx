import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import JsonLd from "../components/json-ld"
import Head from "next/head"
import { Inter } from "next/font/google"
import type { WithContext, WebPage } from "schema-dts"
import { ThemeProvider } from "@/components/utility/theme-provider"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"
import { Toaster } from "@/components/ui/toaster"
import { BackToTop } from "@/components/utility/back-to-top"

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
    label: "About",
    href: "/about",
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
]

export const metadata: Metadata = {
  title: "Gemika - UX Strategist & Mobile Developer",
  description: "Expert user experience strategist and mobile developer portfolio",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://Gemika.netlify.app"),
    generator: 'Next.JS'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Create JSON-LD structured data
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Gemika - UX Strategist & Mobile Developer",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://Gemika.netlify.app",
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://gemika.netlify.app"}/search?q={search_term_string}`,
      query: "required name=search_term_string",
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
      </Head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <JsonLd data={jsonLd} />
          <div className="flex flex-col min-h-screen">
            <Navbar items={navItems} cta={{ label: "Get in touch", href: "/contact" }} />
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
