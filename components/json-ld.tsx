import type {
  Article,
  BreadcrumbList,
  CreativeWork,
  Person,
  WebPage,
  WebSite,
  WithContext,
} from 'schema-dts'

type SchemaType = Article | BreadcrumbList | CreativeWork | Person | WebPage | WebSite

interface JsonLdProps {
  data: WithContext<SchemaType> | Record<string, unknown>
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
