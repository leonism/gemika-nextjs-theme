import Link from 'next/link'

export function FooterCopyright() {
  return (
    <div className="mt-12 border-t border-gray-200 px-4 pt-8 text-center text-gray-600 dark:border-gray-800 dark:text-gray-400 sm:px-6 lg:px-8">
      <p>© {new Date().getFullYear()} gemika. All rights reserved.</p>
      <div className="mt-2 text-sm">
        <Link href="/privacy" className="mr-4 hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>
      </div>
    </div>
  )
}
