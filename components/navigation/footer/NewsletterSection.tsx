import { NewsletterForm } from '@/components/forms/newsletter-form'

export function NewsletterSection() {
  return (
    <div className="border-b border-gray-200 py-12 dark:border-gray-800">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h3 className="mb-4 bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent">
          Subscribe to our Newsletter
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Stay updated with the latest design trends, development tips, and industry news.
        </p>
        <NewsletterForm />
      </div>
    </div>
  )
}
