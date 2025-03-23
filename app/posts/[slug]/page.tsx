import Image from "next/image";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
// import { MDXContentWrapper } from "@/components/MDXContentWrapper";
import { PostLayout } from "@/components/layouts/post-layout";

interface PostPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;

  if (!resolvedParams?.slug) {
    throw new Error('No slug provided');
  }

  const post = await getContent("posts", resolvedParams.slug);

  if (!post || !post.frontmatter || !post.content) {
    notFound();
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

        <div className="mdx-content">
          <MDXContentWrapper content={post.content} />
        </div>
      </article>
    </PostLayout>
  );
}
