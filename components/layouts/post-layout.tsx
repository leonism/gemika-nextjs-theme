import type { ReactNode } from "react"
import { Container } from "@/components/ui/container"

interface PostLayoutProps {
  children: ReactNode
  header?: ReactNode
  tableOfContents?: ReactNode
  authorBox?: ReactNode
  relatedPosts?: ReactNode
  commentSection?: ReactNode
  shareButtons?: ReactNode
}

export function PostLayout({
  children,
  header,
  tableOfContents,
  authorBox,
  relatedPosts,
  commentSection,
  shareButtons,
}: PostLayoutProps) {
  return (
    <Container>
      <article className="max-w-3xl mx-auto">
        {header && <header className="mb-8">{header}</header>}

        <div className="relative flex flex-col md:flex-row gap-8">
          {tableOfContents && (
            <div className="md:w-64 md:sticky md:top-24 md:self-start mb-8 md:mb-0 order-2 md:order-1">
              {tableOfContents}
            </div>
          )}

          <div className={`${tableOfContents ? "md:flex-1" : "w-full"} order-1 md:order-2`}>
            <div className="prose prose-lg dark:prose-invert max-w-none">{children}</div>

            {shareButtons && <div className="mt-8 border-t pt-6">{shareButtons}</div>}

            {authorBox && <div className="mt-12 border-t pt-8">{authorBox}</div>}

            {relatedPosts && <div className="mt-12">{relatedPosts}</div>}

            {commentSection && <div className="mt-12 pt-8 border-t">{commentSection}</div>}
          </div>
        </div>
      </article>
    </Container>
  )
}

