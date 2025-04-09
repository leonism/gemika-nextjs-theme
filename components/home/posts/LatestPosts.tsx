import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { PostCard } from './PostCard';

interface LatestPostsProps {
  posts: {
    slug: string;
    frontmatter: {
      title: string;
      coverImage?: string;
      tags?: string[];
      date?: string;
      excerpt?: string;
    };
  }[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <span className="text-sm font-medium text-indigo-600">BLOG</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              Latest Articles
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Insights, tutorials, and thoughts on UX design, mobile development,
            and digital strategy
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
