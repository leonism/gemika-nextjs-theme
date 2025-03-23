import { getAllContent } from "../lib/content";
import { GetStaticProps } from 'next';
import { PostLayout } from "@/components/layouts/post-layout";
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
  if (posts.length === 0) {
    return (
      <PostLayout>
        <h1>No posts found</h1>
        <p>Check back soon for new content!</p>
      </PostLayout>
    );
  }

  return (
    <PostLayout>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </PostLayout>
  );
}
