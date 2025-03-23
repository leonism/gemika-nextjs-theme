import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/utility/theme-provider";
import { Footer } from "@/components/navigation/footer";
import { Toaster } from "@/components/ui/toaster";
import { BackToTop } from "@/components/utility/back-to-top";
import { Navbar } from "@/components/navigation/navbar";
import { SkipNav } from "@/components/navigation/skip-nav";
import { Button } from "@/components/ui/button"
import { navItems } from "@/data/nav-items";
import ClientOnly from "@/components/utility/client-only";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gemika Next.Js Blog",
  description: "Gemika's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientOnly>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SkipNav />
            <Navbar items={navItems} cta={{ label: "Get in touch", href: "/contact" }} />
            {/* Pass navItems as a prop */}
            {children}
            <Footer />
            <Toaster />
            <BackToTop />
          </ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
