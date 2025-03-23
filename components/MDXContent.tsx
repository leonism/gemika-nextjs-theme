import { MDXProvider } from "@/components/mdx-provider";
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export const MDXContent = ({ source }: MDXContentProps) => {
  return <MDXProvider source={source} />;
}
