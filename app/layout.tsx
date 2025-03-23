import "./globals.css";
import type React from "react";
import type { Metadata } from "next";
import JsonLd from "../components/json-ld";
import Head from "next/head";
import { Inter } from "next/font/google";
import type { WithContext, WebPage } from "schema-dts";
import { ThemeProvider } from "@/components/utility/theme-provider";
import { Footer } from "@/components/navigation/footer";
import { Toaster } from "@/components/ui/toaster";
import { BackToTop } from "@/components/utility/back-to-top";
import { navItems } from "@/data/nav-items"; // Import navItems
import { SkipNav } from "@/components/navigation/skip-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "gemika",
  description: "gemika's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>gemika</title>
        <meta name="description" content="gemika's personal website" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SkipNav />
          {children}
          <Footer /> {/* Render Footer */}
          <Toaster />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
