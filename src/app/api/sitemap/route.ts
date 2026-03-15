import { NextResponse } from 'next/server'
import { SITE_CONFIG } from '@/lib/config'
import { propertyService } from '@/services/properties'

export const revalidate = 3600 // Regenerate hourly

export async function GET() {
  const { data: properties } = await propertyService.list({ limit: 1000 })

  const staticPages = [
    { url: '',          priority: '1.0',  changefreq: 'daily'  },
    { url: '/imoveis',  priority: '0.9',  changefreq: 'hourly' },
    { url: '/servicos', priority: '0.8',  changefreq: 'weekly' },
    { url: '/sobre',    priority: '0.7',  changefreq: 'monthly'},
    { url: '/blog',     priority: '0.8',  changefreq: 'daily'  },
    { url: '/contato',  priority: '0.7',  changefreq: 'monthly'},
  ]

  const propertyPages = properties.map(p => ({
    url: `/imoveis/${p.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: p.updatedAt.split('T')[0],
  }))

  const allPages = [...staticPages, ...propertyPages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${SITE_CONFIG.url}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    ${(p as any).lastmod ? `<lastmod>${(p as any).lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
