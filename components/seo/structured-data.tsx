interface StructuredDataProps {
  data: any
}

export function StructuredData({ data }: StructuredDataProps) {
  return <script type="application/ld+json" SetInnerHTML={{ __html: JSON.stringify(data) }} />
}
