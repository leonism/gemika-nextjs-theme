import { ThemeProvider } from "@/components/utility/theme-provider";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { navItems } from "@/data/nav-items";

export default function PostsLayout({
  children,
  }: {
  children: React.ReactNode;
  }) {
  return (
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
  );
}
