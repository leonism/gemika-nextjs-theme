"use client";

import React, { useMemo } from 'react'; // Explicit React import
import dynamic from 'next/dynamic';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import components from './mdx-components';

interface ClientMDXRendererProps {
  source: MDXRemoteSerializeResult;
}

const ClientMDXRenderer: React.FC<ClientMDXRendererProps> = ({ source }) => {
  const memoizedComponents = useMemo(() => components, []);

  return (
    <MDXRemote {...source} components={memoizedComponents} />
  );
};

export default ClientMDXRenderer;
