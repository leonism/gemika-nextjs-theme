import Image from "next/image";
import Link from "next/link";
import { Tag } from "./Tag";
import { Post } from "@/lib/posts";
import { TAG_COLORS } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
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
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
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
            {post.frontmatter.tags.slice(0, 3).map((tag, index) => (
              <Tag
                key={tag}
                tag={tag}
                colorIndex={index}
              />
            ))}
            {post.frontmatter.tags.length > 3 && (
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                +{post.frontmatter.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
