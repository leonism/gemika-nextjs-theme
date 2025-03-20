import { getContent } from "@/lib/content";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return [{ slug: 'example' }]; // Replace with actual slugs
}

async function Page({ params }: Props) {
  const content = await getContent("posts", params.slug);

  if (!content) {
    return <div>Not Found</div>;
  }

  return (
    <div>
      <h1>{content.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}

export default Page;
