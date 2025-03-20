import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import { cn } from "@/lib/utils"

interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "github"
  url: string
}

interface AuthorCardProps {
  name: string
  bio: string
  imageUrl: string
  slug: string
  postCount?: number
  socialLinks?: SocialLink[]
  className?: string
  variant?: "default" | "compact"
}

export function AuthorCard({
  name,
  bio,
  imageUrl,
  slug,
  postCount,
  socialLinks,
  className,
  variant = "default",
}: AuthorCardProps) {
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook size={16} />
      case "twitter":
        return <Twitter size={16} />
      case "instagram":
        return <Instagram size={16} />
      case "linkedin":
        return <Linkedin size={16} />
      case "github":
        return <Github size={16} />
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700",
        variant === "compact" ? "flex items-center p-4" : "",
        className,
      )}
    >
      {variant === "default" ? (
        <>
          <div className="aspect-video relative">
            <Image
              src={
                imageUrl ||
                "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
              }
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-6">
            <Link href={`/authors/${slug}`}>
              <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{name}</h3>
            </Link>

            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{bio}</p>

            {postCount !== undefined && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {postCount} {postCount === 1 ? "post" : "posts"}
              </p>
            )}

            {socialLinks && socialLinks.length > 0 && (
              <div className="flex space-x-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                    aria-label={`${name} on ${link.platform}`}
                  >
                    {renderSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
            <Image
              src={
                imageUrl ||
                "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
              }
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <Link href={`/authors/${slug}`}>
              <h3 className="font-medium hover:text-primary transition-colors">{name}</h3>
            </Link>

            {postCount !== undefined && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {postCount} {postCount === 1 ? "post" : "posts"}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

