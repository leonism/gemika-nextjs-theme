import Image from "next/image";
import Link from "next/link";
import { Tag } from "./Tag";
import { Post } from "@/lib/posts";
import { TAG_COLORS } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
    >
      {post.frontmatter.coverImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.frontmatter.coverImage}
            alt={post.frontmatter.title}
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {post.frontmatter.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
          {post.frontmatter.excerpt}
        </p>

        {/* Date and Reading Time with Icons */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
          <div className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
          </div>

          {post.frontmatter.readingTime && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.frontmatter.readingTime} read</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
