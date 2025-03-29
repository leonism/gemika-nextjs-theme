import Link from "next/link";
import Image from "next/image";
import { getAllContent } from "@/lib/content";

// Color palette for tags to ensure visual consistency
const TAG_COLORS = [
  { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-300" },
  { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-300" },
  { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-300" },
  { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-600 dark:text-rose-300" },
  { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-300" },
];

export default async function PostsIndexPage() {
  const allPosts = await getAllContent("posts");
  const postsPerPage = 6;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const currentPage = 1; // Default to first page, you can make this dynamic later
  const posts = allPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section with animated gradient background */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Animated gradient background */}
        {/* <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
          <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-0 -right-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-20 left-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob"></div>
        </div> */}

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
                className="w-10 h-10 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
              No articles available yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              I'm currently working on some new content. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => {
                // Rotate through tag colors
                const tagColor = TAG_COLORS[index % TAG_COLORS.length];

                return (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Featured Image with gradient overlay */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.frontmatter.coverImage || "/placeholder.svg"}
                        alt={post.frontmatter.title as string}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                      {/* Tags overlapping the image bottom */}
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                        {(post.frontmatter.tags as string[])?.map((tag, tagIndex) => {
                          const colorIndex = (index + tagIndex) % TAG_COLORS.length;
                          const color = TAG_COLORS[colorIndex];

                          return (
                            <span
                              key={tagIndex}
                              className={`text-xs font-semibold ${color.bg} ${color.text} px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-sm hover:scale-105 transition-transform duration-200`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Content with soft blurry background effect */}
                    <div className="relative p-6">
                      {/* Floating content container */}
                      <div className="relative z-10">
                        {/* Title with hover effect */}
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2">
                          {post.frontmatter.title as string}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-2">
                          {post.frontmatter.excerpt as string}
                        </p>

                        {/* Meta information with icons */}
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          {/* Date */}
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{post.frontmatter.date as string}</span>
                          </div>

                          {/* Author */}
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{post.frontmatter.author as string}</span>
                          </div>
                        </div>
                      </div>

                      {/* Soft blurry background effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/30 dark:from-gray-800/80 dark:to-gray-800/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-emerald-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-16">
                <nav className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <Link
                    href={`/posts?page=${currentPage > 1 ? currentPage - 1 : 1}`}
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${currentPage === 1 ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : undefined}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/posts?page=${page}`}
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${currentPage === page ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                      {page}
                    </Link>
                  ))}

                  {/* Next Button */}
                  <Link
                    href={`/posts?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${currentPage === totalPages ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : undefined}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </nav>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
