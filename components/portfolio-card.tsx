import Image from "next/image"
import Link from "next/link"

interface PortfolioCardProps {
  title: string
  category: string
  imageUrl: string
  slug: string
}

export default function PortfolioCard({ title, category, imageUrl, slug }: PortfolioCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group">
      <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-square relative">
        <Image
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          }
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{category}</p>
      </div>
    </Link>
  )
}

