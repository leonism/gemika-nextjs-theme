import { getContent } from "@/lib/content";
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from "next/navigation";
import ClientOnly from "@/components/utility/client-only";
import { MDXProviderClient } from "@/components/mdx-provider-client";

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
            <ClientOnly>
              <MDXProviderClient source={serializedContent} />
            </ClientOnly>
          </div>
        </section>
      </main>
    </div>
  );
}
