// app/posts/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getAllContent } from "@/lib/content";
import JsonLd from "@/components/json-ld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import DynamicClientMDXRenderer from "@/components/DynamicClientMDXRenderer";

interface PostPageProps {
  params: Promise<{ slug: string }> | { slug: string };
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

      {/* Render MDX content */}
      <div className="mdx-content">
        <DynamicClientMDXRenderer content={post.content} />
      </div>
    </article>
  );
}


// import { Navbar } from "@/components/navigation/navbar";
// import { Footer } from "@/components/navigation/footer";
// import { navItems } from "@/data/nav-items";

// export default function PostsLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       {/* Main Content */}
//       <main className="flex-1 min-h-screen">
//         <div className="container mx-auto px-4 py-8">
//           {children}
//         </div>
//       </main>
//     </>
//   );
// }
