"use client";

import { MDXRemote } from 'next-mdx-remote';
import { components } from './mdx-components';

interface ClientMDXRendererProps {
  source: any;
}

export default function ClientMDXRenderer({ source }: ClientMDXRendererProps) {
  if (!source) return null;

  return (
    <div className="prose dark:prose-invert max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
