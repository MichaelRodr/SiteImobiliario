import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PropertyCard } from '@/components/features/properties/PropertyCard'
import { PropertyFilters } from '@/components/features/properties/PropertyFilters'
import { FinancingCalculator } from '@/components/features/calculator/FinancingCalculator'
import { WhatsAppChatbot } from '@/components/features/chatbot/WhatsAppChatbot'
import { propertyService } from '@/services/properties'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { buildBreadcrumbSchema, JsonLd } from '@/lib/schema'
import type { PropertyFilter, PropertyPurpose, PropertyType } from '@/types'

export const metadata = generatePageMetadata({
  title: 'Imóveis à Venda e para Alugar',
  description: 'Encontre casas, apartamentos, terrenos e imóveis comerciais à venda e para alugar. Use nossos filtros para encontrar o imóvel ideal.',
  path: '/imoveis',
  keywords: ['imóveis à venda', 'imóveis para alugar', 'apartamentos', 'casas'],
})

interface SearchParams {
  type?: string; purpose?: string; priceMin?: string; priceMax?: string
  bedrooms?: string; neighborhood?: string; sortBy?: string; page?: string
}

export default async function ImoveisPage({ searchParams }: { searchParams: SearchParams }) {
  const filter: PropertyFilter = {
    type:         (searchParams.type as PropertyType)     || 'all',
    purpose:      (searchParams.purpose as PropertyPurpose) || 'all',
    priceMin:     searchParams.priceMin  ? Number(searchParams.priceMin)  : undefined,
    priceMax:     searchParams.priceMax  ? Number(searchParams.priceMax)  : undefined,
    bedrooms:     searchParams.bedrooms  ? Number(searchParams.bedrooms)  : undefined,
    neighborhood: searchParams.neighborhood || '',
    sortBy:       (searchParams.sortBy as PropertyFilter['sortBy']) || 'newest',
    page:         searchParams.page ? Number(searchParams.page) : 1,
    limit:        12,
  }

  const { data: properties, total, totalPages, page } = await propertyService.list(filter)

  const breadcrumbs = [
    { name: 'Início', path: '/' },
    { name: 'Imóveis', path: '/imoveis' },
  ]

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50">

        {/* Page header */}
        <div
          className="pt-24 pb-10 text-white"
          style={{ background: 'linear-gradient(135deg, #162a35, #4280a1)' }}
        >
          <div className="section-wrapper">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
                <li aria-hidden>/</li>
                <li className="text-white" aria-current="page">Imóveis</li>
              </ol>
            </nav>
            <h1 className="heading-lg text-white mb-2">
              {filter.purpose === 'venda'   ? 'Imóveis à Venda' :
               filter.purpose === 'aluguel' ? 'Imóveis para Alugar' :
               'Todos os Imóveis'}
            </h1>
            <p className="text-white/70">
              {total} imóve{total !== 1 ? 'is' : 'l'} encontrado{total !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="section-wrapper py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar filters */}
            <aside className="lg:col-span-1" aria-label="Filtros de busca">
              <div className="sticky top-24">
                <Suspense fallback={<div className="h-64 bg-white rounded-2xl animate-pulse" />}>
                  <PropertyFilters initialFilter={filter} />
                </Suspense>
              </div>
            </aside>

            {/* Listings */}
            <div className="lg:col-span-3">
              {properties.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {properties.map(p => (
                      <PropertyCard key={p.id} property={p} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav
                      aria-label="Paginação"
                      className="mt-10 flex justify-center gap-2"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <a
                          key={p}
                          href={`?page=${p}`}
                          aria-current={p === page ? 'page' : undefined}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold border transition-colors ${
                            p === page
                              ? 'bg-brand-blue text-white border-brand-blue'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-brand-blue'
                          }`}
                        >
                          {p}
                        </a>
                      ))}
                    </nav>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <span className="text-5xl block mb-4" aria-hidden>🔍</span>
                  <h2 className="font-display font-semibold text-xl text-brand-dark mb-2">
                    Nenhum imóvel encontrado
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Tente ajustar os filtros ou entre em contato para busca personalizada.
                  </p>
                  <a href="/contato" className="btn-primary">Falar com um corretor</a>
                </div>
              )}
            </div>
          </div>

          {/* Calculator */}
          <div className="mt-16">
            <FinancingCalculator />
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppChatbot />
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
    </>
  )
}
