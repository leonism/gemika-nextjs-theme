"use client"

import { MDXRemote } from "next-mdx-remote/rsc"
import components from "@/components/mdx-components"

interface MDXProviderProps {
  source: any
}

export function MDXProvider({ source }: MDXProviderProps) {
  return <MDXRemote {...source} components={components} />
}

