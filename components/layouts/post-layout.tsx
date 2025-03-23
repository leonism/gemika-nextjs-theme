import { Container } from "@/components/ui/container";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
// import { navItems } from "@/data/nav-items"; // Adjusted the path to the correct location

interface PostLayoutProps {
  children: React.ReactNode;
}

export function PostLayout({ children }: PostLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar items={navItems} /> {/* Pass a valid navItems array to Navbar */}
      <main className="flex-1">
        <Container className="py-12">
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
