import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/utility/theme-provider";
import { Navbar } from "@/components/navigation/navbar";
import { navItems } from "@/data/nav-items";
import { Footer } from "@/components/navigation/footer";
//

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: "Creative Technologist",
    template: "%s | Gemika"
  },
  description: "Digital garden of thoughts on design, code and creative processes",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth`}>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Animated background elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 -right-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-20 animate-blob animation-delay-4000"></div>
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 dark:opacity-20 animate-blob"></div>
          </div>

          {/* Navigation Bar with subtle border */}
          <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80">
            <Navbar items={navItems} />
          </header>

          {/* Main Content with creative padding */}
          <main className="flex-1 min-h-[calc(100vh-8rem)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Subtle decorative elements */}
              <div className="hidden md:block absolute left-8 top-1/4 h-32 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent">
              </div>
              <div className="hidden md:block absolute right-8 bottom-1/4 h-32 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent">
              </div>
              {children}
            </div>
          </main>

          {/* Footer with creative divider */}
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-px backdrop-blur-lg bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            <Footer />
          </div>
        </ThemeProvider>

      </body>
    </html>
  );
}
