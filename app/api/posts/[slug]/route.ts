import { NextResponse } from 'next/server'
import { getContent } from '@/lib/content'

export const runtime = 'edge'
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const post = await getContent('posts', params.slug)

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json(post)
}
