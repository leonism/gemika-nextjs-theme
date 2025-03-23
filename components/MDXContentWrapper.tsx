'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { serialize } from 'next-mdx-remote/serialize';
import { components } from './mdx-components';

const DynamicMDXRemote = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

interface MDXContentWrapperProps {
  content: string;
}

export default function MDXContentWrapper({ content }: MDXContentWrapperProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);

  useEffect(() => {
    const serializeMDX = async () => {
      try {
        const serializedContent = await serialize(content);
        setMdxSource(serializedContent);
      } catch (error) {
        console.error('Error serializing MDX:', error);
      }
    };

    serializeMDX();
  }, [content]);

  if (!mdxSource) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mdx-content">
      <DynamicMDXRemote {...mdxSource} components={components} />
    </div>
  );
}
