import { Navbar } from "@/components/navigation/navbar";
import { ErrorBoundary } from "@/components/error-boundary";

interface PostLayoutProps {
  children: React.ReactNode;
}

export function PostLayout({ children }: PostLayoutProps) {
  return (
    <>
      <Navbar items={[]} cta={undefined} />
      <div className="relative min-h-screen">
        <main className="container mx-auto px-4 py-12">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>
    </>
  );
}
