import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from 'next/navigation';

import { MDXProviderClient } from '@/components/mdx-provider-client';
import ClientOnly from '@/components/utility/client-only';

import { getContent } from '@/lib/content';

export default async function TermsPage() {
  const terms = await getContent('pages', 'terms');

  if (!terms) {
    notFound();
  }

  const serializedContent = await serialize(terms.content || '');

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <h1 className="mb-6 text-4xl font-bold">{terms.frontmatter.title}</h1>
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
