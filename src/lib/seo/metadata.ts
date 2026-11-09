import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/config'
import type { Property } from '@/types'

interface PageMetadataOptions {
  title?: string
  description?: string
  path?: string
  keywords?: string[]
  noIndex?: boolean
}

export function generatePageMetadata(options: PageMetadataOptions = {}): Metadata {
  const title = options.title
    ? `${options.title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.name
  const url = new URL(options.path ?? '/', SITE_CONFIG.url)

  return {
    title,
    description: options.description ?? SITE_CONFIG.tagline,
    keywords: options.keywords,
    alternates: { canonical: url.toString() },
    robots: options.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description: options.description ?? SITE_CONFIG.tagline,
      url: url.toString(),
      siteName: SITE_CONFIG.name,
      locale: 'pt_BR',
      type: 'website',
    },
  }
}

export function generatePropertyMetadata(property: Property): Metadata {
  return generatePageMetadata({
    title: property.title,
    description: property.description,
    path: `/imoveis/${property.slug}`,
    keywords: [property.type, property.purpose, property.address.neighborhood],
  })
}
