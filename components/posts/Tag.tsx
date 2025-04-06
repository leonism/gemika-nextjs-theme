import { TAG_COLORS } from "@/lib/posts";

export function Tag({ tag, colorIndex }: { tag: string; colorIndex: number }) {
  const colors = TAG_COLORS[colorIndex % TAG_COLORS.length];

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
    >
      {tag}
    </span>
  );
}
