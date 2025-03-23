import { Navbar } from "@/components/navigation/navbar";
import { ErrorBoundary } from "@/components/error-boundary";

interface PostLayoutProps {
  children: React.ReactNode;
}

export function PostLayout({ children }: PostLayoutProps) {
  return (
    <>
      <Navbar items={[]} cta={undefined} />
      <main className="container mx-auto px-4 py-12">
        <ErrorBoundary error={new Error("An error occurred")} reset={() => window.location.reload()} />
        {children}
      </main>
    </>
  );
}
