import Image from "next/image";
import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "github";
  url: string;
}

interface AuthorCardProps {
  name: string;
  bio: string;
  imageUrl: string;
  slug: string;
  postCount?: number;
  socialLinks?: SocialLink[];
  className?: string;
  variant?: "default" | "compact";
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
        return <Facebook size={16} />;
      case "twitter":
        return <Twitter size={16} />;
      case "instagram":
        return <Instagram size={16} />;
      case "linkedin":
        return <Linkedin size={16} />;
      case "github":
        return <Github size={16} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800",
        variant === "compact" ? "flex items-center p-4" : "",
        className,
      )}
    >
      {variant === "default" ? (
        <>
          <div className="relative aspect-video">
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
              <h3 className="mb-2 text-xl font-bold transition-colors hover:text-primary">
                {name}
              </h3>
            </Link>

            <p className="mb-4 line-clamp-3 text-gray-700 dark:text-gray-300">
              {bio}
            </p>

            {postCount !== undefined && (
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
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
                    className="text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
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
          <div className="relative mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
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
              <h3 className="font-medium transition-colors hover:text-primary">
                {name}
              </h3>
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
  );
}
