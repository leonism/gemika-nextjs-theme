'use client'

import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { components } from './mdx-components'

interface MDXProviderProps {
  source: MDXRemoteSerializeResult
}

export function MDXProvider({ source }: MDXProviderProps) {
  if (!source) {
    throw new Error("MDX source is undefined. Ensure the content is serialized properly.")
  }

  return (
    <div className="mdx-content">
      <MDXRemote {...source} components={components ?? {}} />
    </div>
  )
}
