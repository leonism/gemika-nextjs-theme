'use client'

import { useState } from 'react'
import {
  MessageCircle,
  Share2,
  Send,
  Mail,
  Check,
  Copy,
} from 'lucide-react'
import { Facebook, Linkedin, Twitter } from '@/components/icons/BrandIcons'

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${slug}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const socialShares = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: <Twitter size={20} />,
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      icon: <Linkedin size={20} />,
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: <Facebook size={20} />,
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
      icon: <MessageCircle size={20} />,
    },
    {
      name: 'Reddit',
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      icon: <Share2 size={20} />,
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: <Send size={20} />,
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      icon: <Mail size={20} />,
    },
  ]

  return (
    <div className="my-8 flex flex-col items-center justify-center space-y-4 rounded-lg border bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:space-x-4 sm:space-y-0">
      <span className="font-semibold text-slate-700 dark:text-slate-300">Share this article:</span>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {socialShares.map((share) => (
          <a
            key={share.name}
            href={share.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-200 hover:text-indigo-500 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
            aria-label={`Share on ${share.name}`}
          >
            {share.icon}
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-200 hover:text-indigo-500 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-indigo-400"
          aria-label="Copy link to clipboard"
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
        </button>
      </div>
    </div>
  )
}
