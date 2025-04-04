'use client';

import { MDXRemote } from 'next-mdx-remote';
import { components } from './mdx-components';

interface MDXClientRendererProps {
  source: any;
}

export default function MDXClientRenderer({ source }: MDXClientRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
