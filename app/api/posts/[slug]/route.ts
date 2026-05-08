import { NextResponse } from 'next/server'

import { getContent } from '@/lib/content'

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getContent('posts', slug)

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json(post)
}
