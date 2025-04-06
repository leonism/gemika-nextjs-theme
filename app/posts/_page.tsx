import Link from "next/link";
import Image from "next/image";
import { getAllContent } from "@/lib/content";
import { Pagination } from "@/components/navigation/pagination";
import { Metadata } from "next";
import { WebPage, WithContext } from "schema-dts";
import JsonLd from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Blog | Insights & Thoughts",
  description: "Explore my latest writings on UX design, development, and creative processes.",
};

// Color palette for tags to ensure visual consistency
const TAG_COLORS = [
  { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-300" },
  { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-300" },
  { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-300" },
  { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-300" },
  { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-300" },
];

const POSTS_PER_PAGE = 6;

export default async function PostsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string }
}) {
  // Get all posts and sort by date (newest first)
  const allPosts = await getAllContent("posts");
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date || '2000-01-01');
    const dateB = new Date(b.frontmatter.date || '2000-01-01');
    return dateB.getTime() - dateA.getTime();
  });

  // Pagination logic - properly await searchParams
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;
  const validatedPage = isNaN(page) || page < 1 ? 1 : page;

  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (validatedPage - 1) * POSTS_PER_PAGE;
  const posts = sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // JSON-LD structured data
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog | Insights & Thoughts",
    description: "Explore my latest writings on UX design, development, and creative processes.",
    url: "https://gemika.vercel.app/posts",
    isPartOf: {
      "@type": "WebSite",
      name: "Gemika Haziq Nugroho",
      url: "https://gemika.vercel.app",
    },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          {/* Subtle animated floating badge */}
          <div className="inline-flex items-center justify-center mb-6 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              LATEST ARTICLES
            </span>
            <span className="ml-2 w-2 h-2 bg-indigo-400 rounded-full animate-pulse">
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">
              Thoughts</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore my latest writings on UX design, development, and creative processes.
          </p>
        </div>
      </section>

      {/* Posts Grid Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        {posts.length === 0 ? (
          // Empty state with animation
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-gray-400 dark:text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              There are no blog posts available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => {
                // Get a color for each tag based on its index
                const getTagColor = (tagIndex: number) => {
                  return TAG_COLORS[tagIndex % TAG_COLORS.length];
                };

                return (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                  >
                    {post.frontmatter.coverImage && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.frontmatter.coverImage as string}
                          alt={post.frontmatter.title as string}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {post.frontmatter.category && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                            {post.frontmatter.category}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex flex-col flex-grow p-6">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <time dateTime={post.frontmatter.date as string}>
                          {post.frontmatter.date}
                        </time>
                        {post.frontmatter.readingTime && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{post.frontmatter.readingTime} read</span>
                          </>
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {post.frontmatter.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
                        {post.frontmatter.excerpt}
                      </p>
                      {post.frontmatter.tags && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {(post.frontmatter.tags as string[]).slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tag}
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                getTagColor(tagIndex).bg
                              } ${getTagColor(tagIndex).text}`}
                            >
                              {tag}
                            </span>
                          ))}
                          {(post.frontmatter.tags as string[]).length > 3 && (
                            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                              +{(post.frontmatter.tags as string[]).length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16">
                <Pagination
                  currentPage={validatedPage}
                  totalPages={totalPages}
                  baseUrl="/posts"
                  className="justify-center"
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
