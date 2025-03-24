import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/utility/theme-provider";
import { Footer } from "@/components/navigation/footer";
import { Navbar } from "@/components/navigation/navbar";
import { navItems } from "@/data/nav-items";

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Navigation Bar */}
          <Navbar items={navItems} />

          {/* Main Content */}
          <main className="flex-1 min-h-screen">
            <div className="container mx-auto px-4 py-8">{children}</div>
          </main>

          {/* Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
