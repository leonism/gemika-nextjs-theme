"use client";

import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { components } from './mdx-components';

interface MDXProviderProps {
  source: MDXRemoteSerializeResult;
}

export function MDXProvider({ source }: MDXProviderProps) {
  return <MDXRemote {...source} components={components} />;
}
