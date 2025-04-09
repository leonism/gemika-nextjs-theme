"use client";

import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import { components } from "./mdx-components";

interface MDXProviderClientProps {
  source: MDXRemoteSerializeResult;
}

export function MDXProviderClient({ source }: MDXProviderClientProps) {
  return <MDXRemote {...source} components={components} />;
}
