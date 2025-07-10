import type { Article, BreadcrumbList, Person, WebPage, WebSite, WithContext } from 'schema-dts'

interface JsonLdProps {
  data: WithContext<Article | BreadcrumbList | Person | WebPage | WebSite>
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
