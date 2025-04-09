'use client';

import { usePathname } from 'next/navigation';

import { Breadcrumbs } from './breadcrumbs';

export function BreadcrumbWrapper({ title }: { title?: string }) {
  const pathname = usePathname();

  const breadcrumbs = [
    { href: '/', label: 'Home' },
    ...pathname
      .split('/')
      .filter(Boolean)
      .map((segment, i, segments) => ({
        href: `/${segments.slice(0, i + 1).join('/')}`,
        label: segment.replace(/-/g, ' '),
        isCurrent: i === segments.length - 1,
      })),
  ];

  return (
    <Breadcrumbs
      items={breadcrumbs}
      className="container mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8"
    />
  );
}
