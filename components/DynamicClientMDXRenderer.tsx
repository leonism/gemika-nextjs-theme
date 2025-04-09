"use client";

import dynamic from "next/dynamic";

import { components } from "./mdx-components";

const ClientMDXRenderer = dynamic(() => import("./ClientMDXRenderer"), {
  ssr: false,
  loading: () => <p>Loading content...</p>,
});

interface DynamicClientMDXRendererProps {
  source: any;
}

export default function DynamicClientMDXRenderer({
  source,
}: DynamicClientMDXRendererProps) {
  return <ClientMDXRenderer source={source} />;
}
