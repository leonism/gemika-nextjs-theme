import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { serialize } from "next-mdx-remote/serialize";
import DynamicClientMDXRenderer from "@/components/DynamicClientMDXRenderer";

interface PostPageProps {
  params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getContent("posts", params.slug);

  if (!post || !post.frontmatter || !post.content) {
    notFound();
  }

  const serializedContent = await serialize(post.content || "");

  return (
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

      {/* Render MDX content using DynamicClientMDXRenderer */}
      <div className="mdx-content">
        <DynamicClientMDXRenderer source={serializedContent} />
      </div>
    </article>
  );
}
