import { getAllContent } from "../lib/content";
import { GetStaticProps } from 'next';
import { PostLayout } from "@/components/layouts/post-layout"; // Or your preferred layout
import Image from "next/image";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import DynamicClientMDXRenderer from "@/components/DynamicClientMDXRenderer";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

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

// Change to use getStaticProps for server-side data fetching
export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
  try {
    const posts = await getAllContent("posts");
    return {
      props: {
        posts: posts || [], // Ensure posts is never undefined
      },
      // Revalidate every hour
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching posts:', error instanceof Error ? error.message : 'Unknown error');
    // Return empty posts array on error
    return {
      props: {
        posts: [],
      },
      revalidate: 60 // Try again sooner if there was an error
    };
  }
};

export default function PostsPage({ posts }: PostsPageProps) {
  if (posts.length === 0) {
    return (
      <PostLayout> {/* Use a layout component */}
        <h1>No posts found</h1>
        <p>Check back soon for new content!</p>
      </PostLayout>
    );
  }

  return (
    <PostLayout> {/* Use a layout component */}
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/posts/${post.slug}`}>{post.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </PostLayout>
  );
}
