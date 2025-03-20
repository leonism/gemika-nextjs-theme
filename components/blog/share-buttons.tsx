"use client"

import { useEffect, useState } from "react"
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ShareButtonsProps {
  title: string
  url: string
  className?: string
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState(url)
  const { toast } = useToast()

  useEffect(() => {
    // Update URL if we're in the browser
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(currentUrl)

  const shareLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4 mr-2" />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "bg-[#1DA1F2] hover:bg-[#1a94df] text-white",
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4 mr-2" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,\
      color: "bg-[#4267  />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#4267B2] hover:bg-[#375695] text-white",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4 mr-2" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0077B5] hover:bg-[#006699] text-white",
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to your clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className={className}>
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Share this post</h4>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="sm"
            className={link.color}
            onClick={() => window.open(link.url, "_blank")}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
            {link.name}
          </Button>
        ))}

        <Button variant="outline" size="sm" onClick={copyToClipboard} aria-label="Copy link">
          <Link2 className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
      </div>
    </div>
  )
}

