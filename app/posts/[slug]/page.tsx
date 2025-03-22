import Image from "next/image";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PostLayout } from "@/components/layouts/post-layout";

interface PostPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
  let resolvedParams: { slug: string } | undefined;

  try {
    // Resolve params
    resolvedParams = await Promise.resolve(params);
    console.log("Resolved params:", resolvedParams); // Debug: Log params

    // Validate slug
    if (!resolvedParams?.slug) {
      console.error("No slug provided in params");
      notFound();
    }

    // Fetch content with logging
    console.log("Fetching content for slug:", resolvedParams.slug);
    const post = await getContent("posts", resolvedParams.slug);
    console.log("Post data received:", post); // Debug: Log post data

    // Validate post existence and structure
    if (!post || typeof post !== "object" || !post.frontmatter || !post.content) {
      console.error("Invalid post data for slug:", resolvedParams.slug, "Data:", post);
      notFound();
    }

    // Validate required fields
    if (!post.frontmatter.title) {
      console.error("Post missing required field 'title':", post.frontmatter);
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

          <div className="mdx-content">
            {/* Wrap MDXRemote in try-catch to isolate rendering issues */}
            {(() => {
              try {
                return post.content ? (
                  <MDXRemote source={post.content} />
                ) : (
                  <p>Invalid content format.</p>
                );
              } catch (error) {
                console.error("Error rendering MDX content:", error);
                return <p>Error rendering content.</p>;
              }
            })()}
          </div>
        </article>
      </PostLayout>
    );
  } catch (error) {
    console.error("Error in PostPage:", error);
    notFound();
  }
}
