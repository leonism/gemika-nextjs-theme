import { getContent } from "@/lib/content";
import { MDXProvider } from "@/components/mdx-provider";

export default async function PrivacyPage() {
  const privacy = await getContent("pages", "privacy");

  if (!privacy) {
    return <div>Privacy Policy content not found.</div>;
  }

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">{privacy.frontmatter.title}</h1>
          <div className="prose prose-lg dark:prose-invert">
            <MDXProvider source={privacy.content} />
          </div>
        </section>
      </main>
    </div>
  );
}
