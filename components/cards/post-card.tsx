import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface PostCardProps {
  title: string
  excerpt: string
  date: string
  author?: string
  category?: string
  imageUrl: string
  slug: string
  className?: string
  variant?: "default" | "compact" | "featured"
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
      className={cn("group block", variant === "featured" ? "md:flex md:items-center md:gap-8" : "", className)}
    >
      <div
        className={cn(
          "overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 relative",
          variant === "default" ? "aspect-video mb-4" : "",
          variant === "compact" ? "aspect-square w-20 float-left mr-4 mb-2" : "",
          variant === "featured" ? "aspect-video md:w-1/2 mb-4 md:mb-0" : "",
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
          <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{category}</span>
        )}
      </div>

      <div className={variant === "featured" ? "md:w-1/2" : ""}>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
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
            "font-semibold group-hover:text-primary transition-colors",
            variant === "default" ? "text-xl mb-2" : "",
            variant === "compact" ? "text-base" : "",
            variant === "featured" ? "text-2xl mb-3" : "",
          )}
        >
          {title}
        </h3>

        {variant !== "compact" && <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{excerpt}</p>}
      </div>
    </Link>
  )
}

