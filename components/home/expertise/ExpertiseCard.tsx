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
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:hover:-translate-y-2"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={topic.image}
          alt={topic.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm dark:bg-gray-900/90 dark:text-gray-300">
          {topic.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="relative p-6">
        <div className="relative z-10">
          <h2 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {topic.title}
          </h2>
          <p className="mb-4 line-clamp-2 flex-grow text-gray-600 dark:text-gray-300">
            {topic.description}
          </p>
          <div className="mt-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
            <div className="mr-4 flex items-center">
              <svg
                className="mr-1.5 h-4 w-4 text-indigo-500"
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
              <span>{topic.count} projects</span>
            </div>
            <Link
              href={`/category/${topic.title.toLowerCase().replace(' ', '-')}`}
              className="inline-flex items-center font-medium text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Explore
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-500 group-hover:scale-x-100 sm:h-1.5"></div>
    </Link>
  )
}
