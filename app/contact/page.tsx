import { getContent } from "@/lib/content";
import { MDXProvider } from "@/components/mdx-provider";
import { serialize } from 'next-mdx-remote/serialize'; // Import serialize function

export default async function ContactPage() {
  const contact = await getContent("pages", "contact");

  if (!contact) {
    return <div>Contact content not found.</div>;
  }

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">{contact.frontmatter.title}</h1>
          <div className="prose prose-lg dark:prose-invert">
            <MDXProvider source={await serialize(contact.content)} />
          </div>
        </section>
      </main>
    </div>
  );
}
