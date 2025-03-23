import { getAllContent } from "../lib/content";
import { GetStaticProps } from 'next';
import { PostLayout } from "@/components/layouts/post-layout";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import DynamicClientMDXRenderer from "@/components/DynamicClientMDXRenderer";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from "next/link";

type Post = {
  slug: string;
  frontmatter: {
    title: string;
    [key: string]: any;
  };
  content: string;
};

type PostsPageProps = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
  try {
    const posts = await getAllContent("posts");
    return {
      props: {
        posts: posts || [],
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching posts:', error instanceof Error ? error.message : 'Unknown error');
    return {
      props: {
        posts: [],
      },
      revalidate: 60,
    };
  }
};

export default function PostsPage({ posts }: PostsPageProps) {
  if (!posts || posts.length === 0) {
    return (
      <PostLayout>
        <h1>No posts found</h1>
        <p>Check back soon for new content!</p>
      </PostLayout>
    );
  }

  return (
    <PostLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="group">
              <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-video relative mb-4">
                <Image
                  src={(post.frontmatter.coverImage as string) || "/placeholder.svg"}
                  alt={post.frontmatter.title as string}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                {post.frontmatter.title as string}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {post.frontmatter.category as string}
              </p>
              <p className="text-gray-700 dark:text-gray-300">{post.frontmatter.excerpt as string}</p>
            </Link>
          ))}
        </div>
      </div>
    </PostLayout>
  );
}
