import type { ReactNode } from 'react';

import { Container } from '@/components/ui/container';

interface BlogLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  pagination?: ReactNode;
  title?: string;
  description?: string;
}

export function BlogLayout({
  children,
  sidebar,
  pagination,
  title,
  description,
}: BlogLayoutProps) {
  return (
    <Container>
      {(title || description) && (
        <div className="mb-12">
          {title && (
            <h1 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-gray-100 dark:to-gray-400">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <main>{children}</main>

          {pagination && <div className="mt-12">{pagination}</div>}
        </div>

        {sidebar && <aside className="space-y-8">{sidebar}</aside>}
      </div>
    </Container>
  );
}
