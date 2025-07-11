import { notFound } from 'next/navigation'
import { serialize } from 'next-mdx-remote/serialize'
import { WithContext, Article } from 'schema-dts'
import { Calendar, User, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

import ClientOnly from '@/components/utility/client-only'
import { MDXProviderClient } from '@/components/mdx-provider-client'
import JsonLd from '@/components/utility/json-ld'
import { Post } from '@/types/post'
import { getContent, getAllContent } from '@/lib/content'
import { PaginationLink } from '@/components/navigation/pagination-link'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generates metadata for the post page
 */
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const post = await getContent('posts', slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gemika.vercel.app'
  const postUrl = `${siteUrl}/posts/${slug}`
  const imageUrl = post.frontmatter.coverImage || '/og-post.jpg'
  const keywords = [
    ...((post.frontmatter.tags as string[]) || []),
    'UX Design',
    'Frontend Development',
    'Design Systems',
    'User Experience',
    'Web Development',
  ]

  return {
    title: `${post.frontmatter.title} | Blog`,
    description:
      post.frontmatter.description ||
      post.frontmatter.excerpt ||
      `Read ${post.frontmatter.title} - insights on design and development.`,
    keywords,
    authors: [{ name: post.frontmatter.author || 'Gemika Haziq Nugroho' }],
    creator: post.frontmatter.author || 'Gemika Haziq Nugroho',
    publisher: 'Gemika Haziq Nugroho',
    openGraph: {
      title: post.frontmatter.title,
      description:
        post.frontmatter.description ||
        post.frontmatter.excerpt ||
        `Read ${post.frontmatter.title} - insights on design and development.`,
      type: 'article',
      url: postUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updatedDate || post.frontmatter.date,
      authors: [post.frontmatter.author || 'Gemika Haziq Nugroho'],
      tags: post.frontmatter.tags as string[],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description:
        post.frontmatter.description ||
        post.frontmatter.excerpt ||
        `Read ${post.frontmatter.title} - insights on design and development.`,
      images: [imageUrl],
      creator: '@gemika',
    },
    alternates: {
      canonical: postUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params

  if (!resolvedParams?.slug) {
    throw new Error('No slug provided')
  }

  const post: Post | null = await getContent('posts', resolvedParams.slug)

  if (!post || !post.frontmatter || !post.content) {
    notFound()
  }

  // Properly serialize the MDX content
  const serializedContent = await serialize(post.content || '')

  // Get all posts for pagination
  const allPosts: Post[] = await getAllContent('posts')
  const currentIndex = allPosts.findIndex((p) => p?.slug === resolvedParams.slug)
  const prevPost: Post | null = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost: Post | null =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.coverImage || '',
    datePublished: post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author || 'Gemika Haziq Nugroho',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gemika Haziq Nugroho',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gemika.vercel.app/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://gemika.vercel.app/posts/${post.slug}`,
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <article className="prose mx-auto rounded-xl bg-white p-8 shadow-sm dark:prose-invert lg:prose-lg dark:bg-gray-800">
          <h1 className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-5xl font-bold leading-tight text-transparent dark:from-indigo-500 dark:to-emerald-500 md:text-5xl lg:text-6xl">
            {post.frontmatter.title}
          </h1>

          {/* Post metadata with icons */}
          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-700 dark:text-gray-300">
            <div className="flex items-center text-sm font-medium">
              <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
              <time>{post.frontmatter.date}</time>
            </div>

            {post.frontmatter.author && (
              <div className="flex items-center text-sm font-medium">
                <User className="mr-2 h-4 w-4 text-indigo-500" />
                <span>{post.frontmatter.author}</span>
              </div>
            )}

            {post.frontmatter.readingTime && (
              <div className="flex items-center text-sm font-medium">
                <Clock className="mr-2 h-4 w-4 text-indigo-500" />
                <span>{post.frontmatter.readingTime} read</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-3">
              {post.frontmatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-tag mr-1 h-4 w-4"
                  >
                    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2 0 0 0 3.42 0l6.58-6.58a2.426 2 0 0 0 0-3.42z"></path>
                    <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </svg>
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {post.frontmatter.coverImage && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Render MDX content */}
          <div className="mdx-content">
            <ClientOnly>
              <MDXProviderClient source={serializedContent} />
            </ClientOnly>
          </div>
        </article>

        {/* Post navigation - enhanced with better spacing and responsive design */}
        <nav
          className="mt-16 border-t border-gray-200/60 pt-8 dark:border-gray-700/60"
          aria-label="Post navigation"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            {prevPost && (
              <div className="flex-1">
                <PaginationLink item={prevPost} direction="prev" href={`/posts/${prevPost.slug}`} />
              </div>
            )}

            {nextPost && (
              <div className="flex-1">
                <PaginationLink item={nextPost} direction="next" href={`/posts/${nextPost.slug}`} />
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}
