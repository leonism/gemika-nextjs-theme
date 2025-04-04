import { getContent } from "@/lib/content";
import { MDXProvider } from "@/components/mdx-provider";
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from "next/navigation";

export default async function CookiesPage() {
  const cookies = await getContent("pages", "cookies");

  if (!cookies) {
    notFound();
  }

  // Properly serialize the MDX content
  const serializedContent = await serialize(cookies.content || "");

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">{cookies.frontmatter.title}</h1>
          <div className="prose prose-lg dark:prose-invert">
            <MDXProvider source={serializedContent} />
          </div>
        </section>
      </main>
    </div>
  );
}
