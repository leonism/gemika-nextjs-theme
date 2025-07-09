export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  author?: string;
  readingTime?: string;
  tags?: string[];
  coverImage?: string;
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}
