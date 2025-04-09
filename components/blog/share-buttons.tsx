'use client';

import { useEffect, useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import {
  Facebook,
  Link2,
  Linkedin,
  MessageCircleWarning,
  Twitter,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState(url);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="mr-2 h-4 w-4" />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-[#1DA1F2] hover:bg-[#1a94df] text-white',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="mr-2 h-4 w-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#4267B2] hover:bg-[#375695] text-white',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="mr-2 h-4 w-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-[#0077B5] hover:bg-[#006699] text-white',
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircleWarning className="mr-2 h-4 w-4" />,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-[#1DA851] text-white',
    },
    {
      name: 'Mastodon',
      icon: <MessageCircleWarning className="mr-2 h-4 w-4" />,
      url: `https://mastodon.social/share?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-[#6364FF] hover:bg-[#4e50db] text-white',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: 'Link copied!',
        description: 'The link has been copied to your clipboard.',
      });
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy the link to your clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={className}>
      <h4 className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
        Share this post
      </h4>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="sm"
            className={link.color}
            onClick={() => window.open(link.url, '_blank')}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
            {link.name}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          aria-label="Copy link"
        >
          <Link2 className="mr-2 h-4 w-4" />
          Copy Link
        </Button>
      </div>
    </div>
  );
}
