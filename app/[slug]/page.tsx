import { getContent } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }> | { slug: string }
}

export async function generateStaticParams() {
  return [{ slug: 'example' }]; // Replace with actual slugs
}

async function Page({ params }: Props) {
  const resolvedParams = await Promise.resolve(params)
  const content = await getContent("posts", resolvedParams.slug);

  if (!content) {
    return (
      <div>
        <h1>Content Not Found</h1>
        <p>The requested post does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{content.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}

export default Page;
