"use client";

import dynamic from "next/dynamic";

const MDXClientRenderer = dynamic(
  () => import("@/components/MDXClientRenderer"),
  { ssr: false },
);

interface MDXContentProps {
  source: any;
}

export function MDXContent({ source }: MDXContentProps) {
  return <MDXClientRenderer source={source} />;
}
