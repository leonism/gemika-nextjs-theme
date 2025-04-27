// lib/content.ts
"use server";

import { promises as fs, access, readdir, readFile } from "fs";
import { join } from "path";
import path from "path";

import matter from "gray-matter";

// Server-side only
interface ContentError extends Error {
  code?: string;
}

export async function getContent(
  type: "posts" | "projects" | "pages",
  slug: string,
) {
  // Input validation
  if (!type || !["posts", "projects", "pages"].includes(type)) {
    throw new Error(`Invalid content type: ${type}`);
    return null;
  }

  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.error("Error in getContent: slug is empty or invalid", {
      type,
      slug,
      timestamp: new Date().toISOString(),
    });
    return null;
  }

  const filePath = join("content", type, `${slug}.mdx`);

  try {
    const fileContent = await readFile(filePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);

    if (!frontmatter || !content) {
      console.warn(`Invalid MDX file structure: ${filePath}`);
      return null;
    }

    return { frontmatter, content };
  } catch (error) {
    const err = error as ContentError;
    if (err.code === "ENOENT") {
      console.warn(`Content file not found: ${filePath}`);
    } else {
      console.error("Error in getContent:", err.message || "Unknown error");
    }
    return null;
  }
}

// Update the getAllContent function to ensure tags are included
export async function getAllContent(
  type: "posts" | "projects" | "pages",
): Promise<any[]> {
  const directoryPath = path.join(process.cwd(), "content", type);

  try {
    await access(directoryPath);
  } catch {
    return []; // Directory doesn't exist
  }

  try {
    const filenames = await readdir(directoryPath);
    const mdxFiles = filenames.filter(
      (filename: string) =>
        filename.endsWith(".mdx") &&
        filename.replace(/\.mdx$/, "").trim() !== "",
    );

    if (mdxFiles.length === 0) {
      console.warn(`No .mdx files found in ${directoryPath}`);
      return [];
    }

    interface ContentItem {
      slug: string;
      frontmatter: Record<string, any>;
      content: string;
    }

    interface Frontmatter {
      [key: string]: any;
    }

    interface ParsedContent {
      data: Frontmatter;
      content: string;
    }

    const allContent: (ContentItem | null)[] = await Promise.all(
      mdxFiles.map(async (filename: string): Promise<ContentItem | null> => {
        try {
          const slug: string = filename.replace(/\.mdx$/, "");
          const filePath: string = path.join(directoryPath, filename);
          const fileContent: string = await readFile(filePath, "utf-8");
          const { data: frontmatter, content }: ParsedContent =
            matter(fileContent);

          return frontmatter && content ? { slug, frontmatter, content } : null;
        } catch (error) {
          console.error(`Error processing ${filename}:`, error);
          return null;
        }
      }),
    );

    return allContent.filter(Boolean); // Remove null values
  } catch (error) {
    console.error("Error in getAllContent:", error);
    return [];
  }
}
