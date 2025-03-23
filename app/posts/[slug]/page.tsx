import Image from "next/image";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { PostLayout } from "@/components/layouts/post-layout";
import DynamicClientMDXRenderer from "@/components/DynamicClientMDXRenderer";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getContent("posts", slug);

  if (!post) {
    notFound();
  }

  let serializedContent: MDXRemoteSerializeResult;
  try {
    serializedContent = await serialize(post.content || "", {
      mdxOptions: {},
    });
  } catch (error) {
    console.error("Failed to serialize MDX content:", error);
    notFound();
    return; // Important: Return to prevent further execution
  }

  if (!post.frontmatter) {
    throw new Error("Post is missing required fields");
  }

  return (
    <PostLayout>
      <article className="prose dark:prose-invert lg:prose-lg mx-auto">
        <h1 className="text-4xl font-bold mb-5">{post.frontmatter.title}</h1>
        <div className="text-gray-600 dark:text-gray-400 mb-8">
          <time>{post.frontmatter.date}</time>
          {post.frontmatter.author && <span> · {post.frontmatter.author}</span>}
        </div>

        {post.frontmatter.coverImage && (
          <div className="relative aspect-[16/9] mb-8">
            <Image
              src={post.frontmatter.coverImage}
              alt={post.frontmatter.title as string}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <DynamicClientMDXRenderer source={serializedContent} />
        </div>
      </article>
    </PostLayout>
  );
}
