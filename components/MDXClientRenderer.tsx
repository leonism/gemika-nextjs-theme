'use client';

import dynamic from 'next/dynamic';
import { components } from './mdx-components';

const DynamicMDXRemote = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

interface MDXClientRendererProps {
  source: any;
}

export default function MDXClientRenderer({ source }: MDXClientRendererProps) {
  return <DynamicMDXRemote {...source} components={components} />;
}
