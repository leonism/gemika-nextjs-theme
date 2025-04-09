import { Container } from '@/components/ui/container';

interface PostLayoutProps {
  children: React.ReactNode;
}

export function PostLayout({ children }: PostLayoutProps) {
  return (
    <Container>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </Container>
  );
}
