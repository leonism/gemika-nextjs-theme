import { PaginationLink } from '@/components/navigation/pagination-link'

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
              {(post.frontmatter.tags as string[]).map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-blue-100 text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
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
                    className="h-4 w-4 mr-1 lucide lucide-tag"
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

          {/* Post navigation - similar to project pagination */}
          <div className="mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 pt-8 dark:border-gray-700 gap-4">
            {prevPost && (
              <PaginationLink
                item={prevPost}
                direction="prev"
                href={`/posts/${prevPost.slug}`}
              />
            )}

            {nextPost && (
              <PaginationLink
                item={nextPost}
                direction="next"
                href={`/posts/${nextPost.slug}`}
                className="mt-4 sm:mt-0 sm:ml-auto"
              />
            )}
          </div>
        </article>
      </div>
    </>
  )
}
