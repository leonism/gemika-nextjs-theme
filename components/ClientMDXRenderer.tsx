"use client";

import { MDXRemote } from "next-mdx-remote";

import { components } from "./mdx-components";

interface ClientMDXRendererProps {
  source: any;
}

export default function ClientMDXRenderer({ source }: ClientMDXRendererProps) {
  if (!source) return null;

  return (
    <div className="prose max-w-none dark:prose-invert">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
