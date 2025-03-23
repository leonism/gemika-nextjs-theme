'use client';

import { useEffect, useState } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface DynamicClientMDXRendererProps {
  source: string;
}

export default function DynamicClientMDXRenderer({ source }: DynamicClientMDXRendererProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Return null on server-side
  }

  return <MDXRemote source={source} />;
}
