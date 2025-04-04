import { getContent } from "@/lib/content";
import dynamic from 'next/dynamic';
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from "next/navigation";

// Dynamically import the MDXProvider to ensure it's only used on the client side
const MDXProvider = dynamic(() => import('@/components/mdx-provider').then(mod => mod.MDXProvider), {
  ssr: false,
});

export default async function AboutPage() {
  const about = await getContent("pages", "about");

  if (!about) {
    notFound();
  }

  const serializedContent = await serialize(about.content || "");

  return (
    <div className="min-h-screen">
      <main>
        <section className="container mx-auto px-4 py-16 max-w-4xl">
          {about.frontmatter.profileImage && (
            <div className="mb-8">
              <img
                src={about.frontmatter.profileImage}
                alt="Profile"
                className="rounded-full w-32 h-32 object-cover mx-auto"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold mb-6 text-center">
            {about.frontmatter.title}
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXProvider source={serializedContent} />
          </div>
        </section>
      </main>
    </div>
  );
}
