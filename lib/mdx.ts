import fs from "fs";
import path from "path";

import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const postsDirectory = path.join(process.cwd(), "content/posts");

export async function getPostSlugs() {
  // Ensure the directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Posts directory not found: ${postsDirectory}`);
    return [];
  }

  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

  // Check if the file exists
  if (!fs.existsSync(fullPath)) {
    console.warn(`Post file not found: ${fullPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    },
    scope: data,
  });

  return {
    slug: realSlug,
    frontmatter: data,
    content: mdxSource,
  };
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return post;
    }),
  );

  // Filter out null posts and sort by date
  return posts.filter(Boolean).sort((post1, post2) => {
    const date1 = new Date(post1?.frontmatter.date as string).getTime();
    const date2 = new Date(post2?.frontmatter.date as string).getTime();
    return date2 - date1;
  });
}

export async function searchPosts(query: string) {
  const posts = await getAllPosts();
  const normalizedQuery = query.toLowerCase().trim();

  return posts.filter((post) => {
    const title = (post?.frontmatter.title as string).toLowerCase();
    const excerpt = (post?.frontmatter.excerpt as string).toLowerCase();
    const tags =
      (post?.frontmatter.tags as string[])?.map((tag) => tag.toLowerCase()) ||
      [];

    return (
      title.includes(normalizedQuery) ||
      excerpt.includes(normalizedQuery) ||
      tags.some((tag) => tag.includes(normalizedQuery))
    );
  });
}
