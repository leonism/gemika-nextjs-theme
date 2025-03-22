// lib/server-utils.ts
import path from "path";
import matter from "gray-matter";
import { promisify } from "util";
import fs from "fs";

// Promisify fs methods
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const access = promisify(fs.access);

export async function getContent(type: "posts" | "projects" | "pages", slug: string) {
  if (typeof window !== "undefined") {
    throw new Error("getContent can only be used on the server.");
  }

  // Input validation
  if (!type || !["posts", "projects", "pages"].includes(type)) {
    console.error("Invalid content type:", type);
    return null;
  }

  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.error("Error in getContent: slug is empty or invalid", {
      type,
      slug,
      timestamp: new Date().toISOString(),
      stack: new Error().stack,
    });
    return null;
  }

  const filePath = path.join(process.cwd(), "content", type, `${slug}.mdx`);

  try {
    const fileContent = await readFile(filePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);

    if (!frontmatter || !content) {
      console.warn(`Invalid MDX file structure: ${filePath}`);
      return null;
    }

    return { frontmatter, content };
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.warn(`Content file not found: ${filePath}`);
    } else {
      console.error("Error in getContent:", error);
    }
    return null;
  }
}

export async function getAllContent(type: "posts" | "projects" | "pages"): Promise<any[]> {
  if (typeof window !== "undefined") {
    throw new Error("getAllContent can only be used on the server.");
  }

  const directoryPath = path.join(process.cwd(), "content", type);

  try {
    await access(directoryPath);
  } catch {
    return []; // Directory doesn't exist
  }

  try {
    const filenames = await readdir(directoryPath);
    const mdxFiles = filenames.filter((filename: string) =>
      filename.endsWith(".mdx") && filename.replace(/\.mdx$/, "").trim() !== ""
    );

    if (mdxFiles.length === 0) {
      console.warn(`No .mdx files found in ${directoryPath}`);
      return [];
    }

    const allContent = await Promise.all(
      mdxFiles.map(async (filename) => {
        try {
          const slug = filename.replace(/\.mdx$/, "");
          const filePath = path.join(directoryPath, filename);
          const fileContent = await readFile(filePath, "utf-8");
          const { data: frontmatter, content } = matter(fileContent);

          return frontmatter && content
            ? { slug, frontmatter, content }
            : null;
        } catch (error) {
          console.error(`Error processing ${filename}:`, error);
          return null;
        }
      })
    );

    return allContent.filter(Boolean); // Remove null values
  } catch (error) {
    console.error("Error in getAllContent:", error);
    return [];
  }
}
