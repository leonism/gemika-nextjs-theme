import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getContent } from "@/lib/content";
import { MDXProvider } from "@/components/mdx-provider";
import JsonLd from "@/components/json-ld";
import type { Person, WithContext } from "schema-dts";

export async function generateMetadata() {
  // ...existing code...
}

export default async function AboutPage() {
  const about = await getContent("pages", "about");

  if (!about) {
    return <div>About content not found.</div>;
  }

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">{about.frontmatter.title}</h1>
          <div className="prose prose-lg dark:prose-invert">
            <MDXProvider source={about.content} />
          </div>
        </section>
      </main>
    </div>
  );
}
