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
              <Navbar items={navItems} />
          {/* Main content with subtle decorative elements */}
          <main className="flex-1 min-h-[calc(100vh-10rem)] bg-gray-50 text-gray-900">
              {children}
          </main>

          {/* Footer with gradient top border */}
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent dark:via-[#313F55]/50">
            </div>
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
