import { TAG_COLORS } from '@/lib/posts'

export function Tag({ tag, colorIndex }: { tag: string; colorIndex: number }) {
  const colors = TAG_COLORS[colorIndex % TAG_COLORS.length]

  return (
    <span
      className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-opacity-80 ${colors.bg} ${colors.text}`}
    >
      {tag}
    </span>
  )
}
