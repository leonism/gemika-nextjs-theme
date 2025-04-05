import { getContent } from "@/lib/content";
import { MDXProvider } from "@/components/mdx-provider";

export default async function TermsPage() {
  const terms = await getContent("pages", "terms");

  if (!terms) {
    return <div>Terms of Service content not found.</div>;
  }

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">{terms.frontmatter.title}</h1>
          <div className="prose prose-lg dark:prose-invert">
            <MDXProvider source={terms.content} />
          </div>
        </section>
      </main>
    </div>
  );
}
