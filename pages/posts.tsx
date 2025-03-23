import { getAllContent } from "@/lib/content";
import { GetStaticProps } from 'next';
import { WithContext, CollectionPage } from 'schema-dts';
import Link from "next/link";
import Image from "next/image";
import { PostLayout } from "@/components/layouts/post-layout";
import JsonLd from "@/components/json-ld";

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    excerpt?: string;
    date?: string;
    author?: string;
    category?: string;
    coverImage?: string;
    [key: string]: any;
  };
  content: string;
}

interface PostsPageProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
  try {
    const posts = await getAllContent("posts");
    return {
      props: { posts: posts || [] },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: { posts: [] },
      revalidate: 60,
    };
  }
};

export default function PostsPage({ posts }: PostsPageProps) {
  // Create JSON-LD structured data
  const jsonLd: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog Posts | Gemika",
    description: "Articles and insights on design, development, and digital experiences.",
    url: "https://gemika.netlify.app/posts",
    isPartOf: {
      "@type": "WebSite",
      name: "Gemika",
      url: "https://gemika.netlify.app"
    }
  };

  return (
    <PostLayout>
      <JsonLd data={jsonLd} />
      <div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
          Blog Posts
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
          Articles and insights on design, development, and digital experiences.
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No posts found</h2>
            <p className="text-gray-600 dark:text-gray-400">Check back soon for new articles!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="group">
                <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-video relative mb-4">
                  <Image
                    src={post.frontmatter.coverImage || "/placeholder.svg"}
                    alt={post.frontmatter.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                  {post.frontmatter.title}
                </h3>
                {post.frontmatter.date && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                )}
                <p className="text-gray-700 dark:text-gray-300">
                  {post.frontmatter.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PostLayout>
  );
}
