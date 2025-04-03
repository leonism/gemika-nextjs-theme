'use client'

import type { MDXComponents } from 'mdx/types'
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const components: MDXComponents = {
  h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: (props) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
  p: (props) => <p className="my-4" {...props} />,
  a: (props) => <Link {...props} className="text-blue-600 hover:underline" />,
  img: (props) => (
    <Image
      {...props}
      width={800}
      height={400}
      className="rounded-lg my-6"
      alt={props.alt || ''}
    />
  ),
};
