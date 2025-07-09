import type { Metadata } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from 'lucide-react'

import JsonLd from '@/components/json-ld'
import { MDXProviderClient } from '@/components/mdx-provider-client'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import ClientOnly from '@/components/utility/client-only'
import { getAllContent, getContent } from '@/lib/content'

interface PostPageProps {
  params: Promise<{ slug: string }> | { slug: string }
}

export async function generateStaticParams() {
  const posts = await getAllContent('posts')
  return posts
    .filter((post) => post !== null)
    .map((post) => ({
      slug: post.slug,
    }))
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params

  if (!resolvedParams?.slug) {
    throw new Error('No slug provided')
  }

  const post = await getContent('posts', resolvedParams.slug)

  if (!post || !post.frontmatter || !post.content) {
    notFound()
  }

  // Properly serialize the MDX content
  const serializedContent = await serialize(post.content || '')

  // Get all posts for pagination
  const allPosts = await getAllContent('posts')
  const currentIndex = allPosts.findIndex((p) => p?.slug === resolvedParams.slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  // Create breadcrumbs
  const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Blog' },
    {
      href: `/posts/${resolvedParams.slug}`,
      label: post.frontmatter.title as string,
    },
  ]

  return (
    <>
      <Breadcrumbs
        items={breadcrumbs}
        className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <article className="prose mx-auto rounded-xl bg-white p-8 shadow-sm dark:prose-invert lg:prose-lg dark:bg-gray-800">
          <h1 className="mb-5 text-4xl font-bold">{post.frontmatter.title}</h1>

          {/* Post metadata with icons */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <time>{post.frontmatter.date}</time>
            </div>

            {post.frontmatter.author && (
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{post.frontmatter.author}</span>
              </div>
            )}

            {post.frontmatter.readingTime && (
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{post.frontmatter.readingTime} read</span>
              </div>
            )}
          </div>

          {/* Tags - moved above the image */}
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {(post.frontmatter.tags as string[]).map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 transition-colors hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {post.frontmatter.coverImage && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title as string}
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

          {/* Post navigation - similar to project pagination */}
          <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-700">
            {prevPost && (
              <Link
                href={`/posts/${prevPost.slug}`}
                className="group flex items-center text-gray-700 no-underline transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                <div className="mr-4 rounded-full bg-gray-100 p-2 transition-colors group-hover:bg-indigo-100 dark:bg-gray-800 dark:group-hover:bg-indigo-900/30">
                  <ChevronLeft className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">Previous</div>
                  <div className="max-w-[200px] truncate font-medium">
                    {prevPost.frontmatter.title}
                  </div>
                </div>
              </Link>
            )}

            {nextPost && (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="group ml-auto flex items-center text-right text-gray-700 no-underline transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
              >
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">Next</div>
                  <div className="max-w-[200px] truncate font-medium">
                    {nextPost.frontmatter.title}
                  </div>
                </div>
                <div className="ml-4 rounded-full bg-gray-100 p-2 transition-colors group-hover:bg-indigo-100 dark:bg-gray-800 dark:group-hover:bg-indigo-900/30">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </Link>
            )}
          </div>
        </article>
      </div>
    </>
  )
}
