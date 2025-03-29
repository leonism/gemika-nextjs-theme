import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/utility/theme-provider"
import { Navbar } from "@/components/navigation/navbar"
import { navItems } from "@/data/nav-items"
import { Footer } from "@/components/navigation/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: "Gemika | Creative Technologist",
    template: "%s | Gemika"
  },
  description: "Digital garden of thoughts on design, code and creative processes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth`}>
      <body suppressHydrationWarning>
        <ClientThemeProvider>
          {/* Glass-like navigation bar */}
          <header className="sticky top-0 z-50 w-full">
            <div className="container">
              <Navbar items={navItems} />
            </div>
          </header>

          {/* Main content with subtle decorative elements */}
          <main className="flex-1 min-h-[calc(100vh-10rem)] bg-gray-50 text-gray-900 dark:bg-[#111927] dark:text-gray-100 antialiased transition-colors duration-500">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
              {/* Decorative vertical lines (desktop only) */}
              <div className="hidden lg:block absolute left-8 top-1/4 h-48 w-0.5 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent dark:via-[#313F55]/50"></div>
              <div className="hidden lg:block absolute right-8 bottom-1/4 h-48 w-0.5 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent dark:via-[#313F55]/50"></div>

              {children}
            </div>
          </main>

          {/* Footer with gradient top border */}
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent dark:via-[#313F55]/50"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Footer />
            </div>
          </div>
        </ClientThemeProvider>
      </body>
    </html>
  )
}

function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
