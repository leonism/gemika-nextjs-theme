'use client';

import { useState, useEffect } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import MDXClientRenderer from './MDXClientRenderer';

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
      <MDXClientRenderer source={mdxSource} />
    </div>
  );
}
