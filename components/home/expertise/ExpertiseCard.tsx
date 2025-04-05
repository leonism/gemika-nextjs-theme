import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ExpertiseCardProps {
  topic: {
    image: string
    title: string
    description: string
    count: number
    tags: string[]
    color: string
  }
}

export function ExpertiseCard({ topic }: ExpertiseCardProps) {
  return (
    <Link
      href={`/category/${topic.title.toLowerCase().replace(' ', '-')}`}
      className="group relative overflow-hidden bg-white rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={topic.image}
          alt={topic.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap gap-1 sm:gap-2">
          {topic.tags.map((tag, index) => (
            <span
              key={index}
              className={`${topic.color} text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm bg-opacity-90 border border-white/20`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 sm:p-6 relative">
        <div className="relative z-10">
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {topic.title}
            </span>
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            {topic.description}
          </p>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <span className="flex items-center mr-3 sm:mr-4">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {topic.count} projects
            </span>
            <span className="flex items-center text-indigo-600">
              Explore
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            </span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl sm:rounded-b-2xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </Link>
  )
}
