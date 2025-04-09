import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PostCardProps {
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  category?: string;
  imageUrl: string;
  slug: string;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

export function PostCard({
  title,
  excerpt,
  date,
  author,
  category,
  imageUrl,
  slug,
  className,
  variant = "default",
}: PostCardProps) {
  return (
    <Link
      href={`/posts/${slug}`}
      className={cn(
        "group block",
        variant === "featured" ? "md:flex md:items-center md:gap-8" : "",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800",
          variant === "default" ? "mb-4 aspect-video" : "",
          variant === "compact"
            ? "float-left mb-2 mr-4 aspect-square w-20"
            : "",
          variant === "featured" ? "mb-4 aspect-video md:mb-0 md:w-1/2" : "",
        )}
      >
        <Image
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          }
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {category && variant !== "compact" && (
          <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
            {category}
          </span>
        )}
      </div>

      <div className={variant === "featured" ? "md:w-1/2" : ""}>
        <div className="mb-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={date}>{formatDate(date)}</time>
          {author && (
            <>
              <span className="mx-2">•</span>
              <span>{author}</span>
            </>
          )}
        </div>

        <h3
          className={cn(
            "font-semibold transition-colors group-hover:text-primary",
            variant === "default" ? "mb-2 text-xl" : "",
            variant === "compact" ? "text-base" : "",
            variant === "featured" ? "mb-3 text-2xl" : "",
          )}
        >
          {title}
        </h3>

        {variant !== "compact" && (
          <p className="line-clamp-2 text-gray-700 dark:text-gray-300">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
