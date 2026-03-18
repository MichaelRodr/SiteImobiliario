
import { NextResponse } from 'next/server'
import { SITE_CONFIG } from '@/lib/config'

export function GET() {
  const content = `User-agent: *
Allow: /

# Disallow API routes from indexing
Disallow: /api/

Sitemap: ${SITE_CONFIG.url}/api/sitemap
`
  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
