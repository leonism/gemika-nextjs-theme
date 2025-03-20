import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NotFoundLayout } from "@/components/layouts/not-found-layout"
import { SearchForm } from "@/components/forms/search-form"
import Image from "next/image"

export default function NotFound() {
  return (
    <NotFoundLayout
      title="404"
      message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
      image={
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src="https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            alt="404 Not Found"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      }
      searchBar={<SearchForm placeholder="Try searching for something else..." />}
    >
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline">
          <Link href="/posts">Browse Blog Posts</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/projects">View Projects</Link>
        </Button>
      </div>
    </NotFoundLayout>
  );
}
