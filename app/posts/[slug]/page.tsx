import Image from "next/image"
import { notFound } from "next/navigation"
import { getContent } from "@/lib/content"
import { MDXRemote } from "next-mdx-remote/rsc"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getContent("posts", params.slug)

  if (!post) {
    return notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <article className="prose dark:prose-invert lg:prose-lg mx-auto">
        <h1 className="text-4xl font-bold mb-5">{post.frontmatter.title}</h1>
        <div className="text-gray-600 dark:text-gray-400 mb-8">
          <time>{post.frontmatter.date}</time>
          {post.frontmatter.author && (
            <span> · {post.frontmatter.author}</span>
          )}
        </div>

        {post.frontmatter.coverImage && (
          <div className="relative aspect-[16/9] mb-8">
            <Image
              src={post.frontmatter.coverImage}
              alt={post.frontmatter.title as string}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <div className="mdx-content">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  )
}
