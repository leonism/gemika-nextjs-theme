"use client";

import { MDXProvider } from "@/components/mdx-provider";
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXProvider source={source} />
  );
}
