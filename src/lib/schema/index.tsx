import type { Property } from '@/types'

type Breadcrumb = { name: string; path: string }
type FAQ = { question: string; answer: string }

export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  )
}

export function buildBreadcrumbSchema(items: Breadcrumb[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').toString(),
    })),
  }
}

export function buildFAQSchema(faqs: FAQ[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function buildRealEstateAgentSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Mendes & Favaro',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  }
}

export function buildLocalBusinessSchema(): Record<string, unknown> {
  return buildRealEstateAgentSchema()
}

export function buildPropertySchema(property: Property): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: new URL(`/imoveis/${property.slug}`, process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').toString(),
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'BRL',
      availability: property.status === 'active' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    },
  }
}
