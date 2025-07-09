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

  return (
    <>
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
              {(post.frontmatter.tags as string[]).map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-colors dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-tag w-4 h-4 mr-1"
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
