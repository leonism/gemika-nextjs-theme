'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { MDXComponents } from 'mdx/types';

import { cn } from '@/lib/utils';

export const components: MDXComponents = {
  h1: (props) => <h1 className="mb-4 mt-8 text-3xl font-bold" {...props} />,
  h2: (props) => <h2 className="mb-3 mt-6 text-2xl font-bold" {...props} />,
  h3: (props) => <h3 className="mb-2 mt-4 text-xl font-bold" {...props} />,
  p: (props) => <p className="my-4" {...props} />,
  a: (props) => <Link {...props} className="text-blue-600 hover:underline" />,
  img: (props) => (
    <Image
      {...props}
      width={800}
      height={400}
      className="my-6 rounded-lg"
      alt={props.alt || ''}
    />
  ),
};
