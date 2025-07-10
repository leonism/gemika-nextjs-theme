import { Metadata } from 'next'
import { WebPage, WithContext } from 'schema-dts'

import JsonLd from '@/components/json-ld'
import { Pagination } from '@/components/navigation/pagination'
import { HeroSection } from '@/components/posts/HeroSection'
import { PostsGrid } from '@/components/posts/PostsGrid'
import { getAllContent } from '@/lib/content'
import { POSTS_PER_PAGE } from '@/lib/posts'

// Tell Next.js that this route should be dynamically rendered
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | Insights & Thoughts on Design and Development',
  description: 'Explore my latest writings on UX design, development, and creative processes. In-depth articles about design systems, frontend development, user experience, and creative technology.',
  keywords: [
    'UX Design Blog',
    'Design Systems',
    'Frontend Development',
    'User Experience',
    'Creative Technology',
    'Web Development',
    'Design Process',
    'React',
    'Next.js',
    'TypeScript'
  ],
  openGraph: {
    title: 'Blog | Insights & Thoughts on Design and Development',
    description: 'Explore my latest writings on UX design, development, and creative processes. In-depth articles about design systems, frontend development, user experience, and creative technology.',
    type: 'website',
    images: [
      {
        url: '/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Gemika Haziq Nugroho Blog - Design and Development Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Insights & Thoughts on Design and Development',
    description: 'Explore my latest writings on UX design, development, and creative processes.',
    images: ['/og-blog.jpg'],
  },
  alternates: {
    canonical: '/posts',
    types: {
      'application/rss+xml': '/posts/feed.xml',
    },
  },
}

export default async function PostsIndexPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const pageParam = resolvedSearchParams?.page ?? '1'
  const page = Number.isNaN(Number(pageParam)) ? 1 : parseInt(pageParam)
  const currentPage = page < 1 ? 1 : page

  // Fetch and sort all posts by date (newest first)
  const allPosts = await getAllContent('posts')
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.frontmatter.date || 0).getTime() - new Date(a.frontmatter.date || 0).getTime()
  })

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  // Structured data for SEO
  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: metadata.title as string,
    description: metadata.description || '',
    url: 'https://gemika.vercel.app/posts',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Gemika Haziq Nugroho',
      url: 'https://gemika.vercel.app',
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroSection />
      <PostsGrid posts={paginatedPosts} currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}
