"use client";

import dynamic from 'next/dynamic';

const ClientMDXRenderer = dynamic(
  () => import('@/components/ClientMDXRenderer'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

interface DynamicClientMDXRendererProps {
  source: any; // Replace 'any' with the correct type for your serialized MDX content
}

const DynamicClientMDXRenderer: React.FC<DynamicClientMDXRendererProps> = ({ source }) => {
  return <ClientMDXRenderer source={source} />;
};

export default DynamicClientMDXRenderer;
