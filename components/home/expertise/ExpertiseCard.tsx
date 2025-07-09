import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface ExpertiseCardProps {
  topic: {
    title: string
    image: string
    tags: string[]
    color: string
    description: string
    count: number
  }
}

export function ExpertiseCard({ topic }: ExpertiseCardProps) {
  return (
    <Link
      href={`/category/${topic.title.toLowerCase().replace(' ', '-')}`}
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl sm:hover:-translate-y-2"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={topic.image}
          alt={topic.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 sm:bottom-4 sm:left-4 sm:right-4 sm:gap-2">
          {topic.tags.map((tag, index) => (
            <span
              key={index}
              className={`${topic.color} rounded-full border border-white/20 bg-opacity-90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="relative p-4 sm:p-6">
        <div className="relative z-10">
          <h3 className="mb-2 text-lg font-bold sm:mb-3 sm:text-xl">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {topic.title}
            </span>
          </h3>
          <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">{topic.description}</p>
          <div className="flex items-center text-xs text-gray-500 sm:text-sm">
            <span className="mr-3 flex items-center sm:mr-4">
              <svg
                className="mr-1 h-3 w-3 sm:h-4 sm:w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {topic.count} projects
            </span>
            <span className="flex items-center text-indigo-600">
              Explore
              <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            </span>
          </div>
        </div>
        <div className="absolute inset-0 rounded-b-xl bg-gradient-to-b from-white/80 to-white/30 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100 sm:rounded-b-2xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-500 group-hover:scale-x-100 sm:h-1.5"></div>
    </Link>
  )
}
