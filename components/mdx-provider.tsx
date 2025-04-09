'use client';

import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { components } from './mdx-components';

interface MDXProviderProps {
  source: MDXRemoteSerializeResult;
}

export function MDXProvider({ source }: MDXProviderProps) {
  if (!source) return null;
  return <MDXRemote {...source} components={components} />;
}
