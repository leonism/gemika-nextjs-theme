'use client';

import { MDXRemote } from 'next-mdx-remote';

import { components } from './mdx-components';

interface MDXClientRendererProps {
  source: any;
}

export default function MDXClientRenderer({ source }: MDXClientRendererProps) {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
