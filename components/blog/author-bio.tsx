import Image from "next/image";
import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "github";
  url: string;
}

interface AuthorBioProps {
  name: string;
  bio: string;
  imageUrl: string;
  slug: string;
  socialLinks?: SocialLink[];
  className?: string;
}

export function AuthorBio({
  name,
  bio,
  imageUrl,
  slug,
  socialLinks,
  className,
}: AuthorBioProps) {
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook size={18} />;
      case "twitter":
        return <Twitter size={18} />;
      case "instagram":
        return <Instagram size={18} />;
      case "linkedin":
        return <Linkedin size={18} />;
      case "github":
        return <Github size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Link href={`/authors/${slug}`} className="flex-shrink-0">
        <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-full">
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
      </Link>

      <div>
        <Link
          href={`/authors/${slug}`}
          className="transition-colors hover:text-primary"
        >
          <h4 className="text-lg font-medium">{name}</h4>
        </Link>

        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{bio}</p>

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
    </div>
  );
}
