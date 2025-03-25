import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/utility/theme-provider";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: "Gemika | Creative Technologist",
    template: "%s | Gemika"
  },
  description: "Digital garden of thoughts on design, code and creative processes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} scroll-smooth`}>
      <body className="bg-gray-50 text-gray-900 dark:bg-[#111927] dark:text-gray-100 antialiased transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Floating gradient blobs background - light mode only */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 dark:hidden">
            <div className="absolute top-[20%] -left-20 w-72 h-72 bg-indigo-300/20 rounded-full filter blur-3xl animate-float animation-delay-2000"></div>
            <div className="absolute top-[60%] -right-20 w-96 h-96 bg-emerald-300/20 rounded-full filter blur-3xl animate-float animation-delay-4000"></div>
            <div className="absolute bottom-[20%] left-[25%] w-80 h-80 bg-amber-300/20 rounded-full filter blur-3xl animate-float"></div>
          </div>

          <Navbar />
          <main className="flex-1 min-h-[calc(100vh-10rem)]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
