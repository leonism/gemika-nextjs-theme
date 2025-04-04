"use client";

import { MDXRemote } from 'next-mdx-remote';
import { components } from './mdx-components';

export function MDXProvider({ source }: { source: any }) {
  return <MDXRemote {...source} components={components} />;
}
