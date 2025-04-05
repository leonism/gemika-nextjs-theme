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

export default async function TermsPage() {
  const terms = await getContent("pages", "terms");

  if (!terms) {
    notFound();
  }

  const serializedContent = await serialize(terms.content || "");

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">{terms.frontmatter.title}</h1>
          <div className="prose prose-lg dark:prose-invert">
            <MDXProvider source={serializedContent} />
          </div>
        </section>
      </main>
    </div>
  );
}
