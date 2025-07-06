import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllContent } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const runtime = 'edge';
export default async function TagPage({
  params,
}: {
  params: { slug: string };
}) {
  const decodedTag = decodeURIComponent(params.slug.replace(/-/g, " "));
  const [posts, projects] = await Promise.all([
    getAllContent("posts"),
    getAllContent("projects"),
  ]);

  const taggedItems = [
    ...posts.filter((post) =>
      post.frontmatter.tags?.some(
        (tag: string) => tag.toLowerCase() === decodedTag.toLowerCase(),
      ),
    ),
    ...projects.filter((project) =>
      project.frontmatter.tags?.some(
        (tag: string) => tag.toLowerCase() === decodedTag.toLowerCase(),
      ),
    ),
  ];

  if (taggedItems.length === 0) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main>
        <section className="container mx-auto px-4 py-16">
          <h1 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-gray-100 dark:to-gray-400">
            Posts tagged with "{decodedTag}"
          </h1>
          <p className="mb-12 text-lg text-gray-600 dark:text-gray-400">
            Showing {taggedItems.length} post
            {taggedItems.length !== 1 ? "s" : ""} with this tag
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {taggedItems.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.type}/${item.slug}`}
                className="group"
              >
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={
                      (item.frontmatter.coverImage as string) ||
                      "/placeholder.svg"
                    }
                    alt={item.frontmatter.title as string}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(item.frontmatter.date as string)}
                </p>
                <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                  {item.frontmatter.title as string}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {item.frontmatter.excerpt as string}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
