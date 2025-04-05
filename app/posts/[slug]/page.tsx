import Image from "next/image";
import Link from "next/link";
import { getAllContent, getContent } from "@/lib/content";
import JsonLd from "@/components/json-ld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { MDXProviderClient } from "@/components/mdx-provider-client";
import ClientOnly from "@/components/utility/client-only";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";

interface PostPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllContent("posts");
  return posts
    .filter((post) => post !== null)
    .map((post) => ({
      slug: post.slug,
    }));
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;

  if (!resolvedParams?.slug) {
    throw new Error("No slug provided");
  }

  const post = await getContent("posts", resolvedParams.slug);

  if (!post || !post.frontmatter || !post.content) {
    notFound();
  }

  // Properly serialize the MDX content
  const serializedContent = await serialize(post.content || "");

  // Get all posts for pagination
  const allPosts = await getAllContent("posts");
  const currentIndex = allPosts.findIndex(p => p?.slug === resolvedParams.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Create breadcrumbs
  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Blog' },
    { href: `/posts/${resolvedParams.slug}`, label: post.frontmatter.title as string }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl" />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="prose dark:prose-invert lg:prose-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
          <h1 className="text-4xl font-bold mb-5">{post.frontmatter.title}</h1>

          {/* Post metadata with icons */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <time>{post.frontmatter.date}</time>
            </div>

            {post.frontmatter.author && (
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{post.frontmatter.author}</span>
              </div>
            )}

            {post.frontmatter.readingTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{post.frontmatter.readingTime} read</span>
              </div>
            )}
          </div>

          {/* Tags - moved above the image */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {(post.frontmatter.tags as string[]).map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/40 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {post.frontmatter.coverImage && (
            <div className="relative aspect-[16/9] mb-8 rounded-xl overflow-hidden">
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title as string}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Render MDX content */}
          <div className="mdx-content">
            <ClientOnly>
              <MDXProviderClient source={serializedContent} />
            </ClientOnly>
          </div>

          {/* Post navigation - similar to project pagination */}
          <div className="flex items-center justify-between mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
            {prevPost && (
              <Link
                href={`/posts/${prevPost.slug}`}
                className="flex items-center group text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors no-underline"
              >
                <div className="mr-4 bg-gray-100 dark:bg-gray-800 rounded-full p-2 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">Previous</div>
                  <div className="font-medium truncate max-w-[200px]">{prevPost.frontmatter.title}</div>
                </div>
              </Link>
            )}

            {nextPost && (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="flex items-center group text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-auto text-right no-underline"
              >
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">Next</div>
                  <div className="font-medium truncate max-w-[200px]">{nextPost.frontmatter.title}</div>
                </div>
                <div className="ml-4 bg-gray-100 dark:bg-gray-800 rounded-full p-2 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
