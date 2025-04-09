import { NextResponse } from 'next/server';

import { getAllContent } from '@/lib/content';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const posts = await getAllContent('posts');
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}
