import { getContent } from "@/lib/content";
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from "next/navigation";
import dynamic from 'next/dynamic';

const MDXProvider = dynamic(() => import('@/components/mdx-provider').then(
  (mod) => mod.MDXProvider as React.FC<{ source: any }>
), {
  ssr: false,
  loading: () => <div className="text-center py-8">Loading content...</div>
});

export default async function PrivacyPage() {
  const privacy = await getContent("pages", "privacy");

  if (!privacy) {
    notFound();
  }

  const serializedContent = await serialize(privacy.content || "");

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">{privacy.frontmatter.title}</h1>
          <div className="prose prose-lg dark:prose-invert">
            <MDXProvider source={serializedContent} />
          </div>
        </section>
      </main>
    </div>
  );
}
