'use client'

import { useState } from 'react'

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
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.5 1.5 4s1-2.5 2.5-2.5c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5zm11.5 6c-1 0-2 .5-2.5 1.5V10h-5v11.5h5V16c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5V21.5h5V15c0-3.5-2.5-5-5-5z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5.52 4.5 10.02 10 10.02S22 17.58 22 12.06c0-5.53-4.5-10.02-10-10.02zm0 18.02c-4.42 0-8-3.58-8-8.02 0-4.43 3.58-8.02 8-8.02s8 3.59 8 8.02c0 4.44-3.58 8.02-8 8.02z" />
          <path d="M13.5 12.06h-1.5v6h-3v-6h-1.5v-3h1.5v-2.25c0-1.5 1-2.75 2.75-2.75h2.25v3h-1.5c-.25 0-.5.25-.5.5V9.06h2.25l-.75 3z" />
        </svg>
      ),
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.04 2c-5.52 0-10 4.48-10 10s4.48 10 10 10c1.47 0 2.87-.32 4.13-.88l.22-.13.13.06c.52.25 1.1.4 1.72.45l.23.02h.02c.03 0 .06 0 .09-.02l.23-.04.2-.05.18-.07.16-.08.14-.09.12-.1.1-.1.08-.1.07-.1.05-.1.04-.08.02-.05.01-.02v-.01c0-.02 0-.03-.01-.05l-.02-.05-.03-.07-.04-.08-.05-.1-.07-.12-.08-.13-.09-.14-.1-.15-.12-.16-.13-.16-.14-.16-.15-.16-.16-.15c-.03-.03-.06-.06-.09-.08l-.16-.15c-.03-.03-.06-.05-.08-.07l-.15-.13c-.03-.02-.05-.04-.08-.06l-.13-.1c-.03-.02-.06-.04-.09-.06l-.12-.09c-.03-.02-.06-.04-.09-.05l-.1-.07c-.03-.02-.06-.04-.09-.05l-.09-.06c-.03-.02-.06-.03-.08-.04l-.08-.05c-.03-.02-.06-.03-.08-.04l-.07-.04c-.03-.01-.05-.02-.08-.03l-.06-.03c-.03-.01-.05-.02-.08-.03l-.05-.02c-.03-.01-.06-.02-.08-.02l-.04-.01h-.02c-.03 0-.06 0-.08.01l-.03.01c-1.2.45-2.5.7-3.87.7-5.52 0-10-4.48-10-10zm6.83 14.33c-.22-.11-.43-.18-.66-.27-.23-.09-.47-.14-.7-.14-.11 0-.22.01-.33.04-.11.03-.22.07-.32.12-.1.05-.2.11-.28.18-.09.07-.17.15-.24.24-.07.09-.13.19-.18.29-.05.1-.09.2-.12.31-.03.11-.05.22-.05.33 0 .11.01.22.04.33.03.11.07.22.12.32.05.1.11.2.18.28.07.09.15.17.24.24.09.07.19.13.29.18.1.05.2.09.31.12.11.03.22.05.33.05.23 0 .47-.05.7-.14.23-.09.44-.2.66-.33.22-.13.43-.28.63-.45.2-.17.38-.36.55-.55.17-.2.33-.4.48-.63.15-.23.27-.47.36-.7.09-.23.14-.47.14-.7 0-.23-.05-.47-.14-.7-.09-.23-.21-.44-.36-.66-.15-.22-.32-.43-.52-.63s-.4-.37-.63-.52zm-1.6-3.33c.11 0 .22-.01.33-.04.11-.03.22-.07.32-.12.1-.05.2-.11.28-.18.09-.07.17-.15.24-.24.07-.09.13-.19.18-.29.05-.1.09-.2.12-.31.03-.11.05-.22.05-.33 0-.11-.01-.22-.04-.33-.03-.11-.07-.22-.12-.32-.05-.1-.11-.2-.18-.28-.07-.09-.15-.17-.24-.24-.09-.07-.19-.13-.29-.18-.1-.05-.2-.09-.31-.12-.11-.03-.22-.05-.33-.05-.23 0-.47.05-.7.14-.23.09-.44.2-.66.33-.22.13-.43.28-.63.45-.2.17-.38.36-.55.55-.17.2-.33.4-.48.63-.15.23-.27.47-.36.7-.09.23-.14.47-.14.7 0 .23.05.47.14.7.09.23.21.44.36.66.15.22.32.43.52.63.2.17.43.34.66.5.23.16.47.28.7.36.23.09.47.14.7.14s.47-.05.7-.14c.23-.09.44-.2.66-.33.22-.13.43-.28.63-.45.2-.17.38-.36.55-.55.17-.2.33-.4.48-.63.15-.23.27-.47.36-.7.09-.23.14-.47.14-.7z" />
        </svg>
      ),
    },
    {
      name: 'Reddit',
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v2h-2zm0 4h2v6h-2z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9l-3 8 1.5 1 2.5-6 2.5 6 1.5-1-3-8v-4h-2v4z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
        </svg>
      ),
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
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
