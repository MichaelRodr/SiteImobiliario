import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppChatbot } from '@/components/features/chatbot/WhatsAppChatbot'
import { FinancingCalculator } from '@/components/features/calculator/FinancingCalculator'
import { propertyService } from '@/services/properties'
import { whatsAppService } from '@/services/whatsapp'
import { generatePropertyMetadata } from '@/lib/seo/metadata'
import { buildPropertySchema, buildBreadcrumbSchema, JsonLd } from '@/lib/schema'
import { formatCurrency } from '@/lib/financing'
import { trackPropertyView } from '@/lib/analytics'

interface Props {
  params: { slug: string }
}

// Generate static params for known properties (ISR)
export async function generateStaticParams() {
  const { data } = await propertyService.list({ limit: 100 })
  return data.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const property = await propertyService.getBySlug(params.slug)
  if (!property) return {}
  return generatePropertyMetadata(property)
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await propertyService.getBySlug(params.slug)
  if (!property) notFound()

  const waLink = whatsAppService.buildPropertyLink(property)

  const breadcrumbs = [
    { name: 'Início',   path: '/' },
    { name: 'Imóveis',  path: '/imoveis' },
    { name: property.title, path: `/imoveis/${property.slug}` },
  ]

  const purposeLabel = property.purpose === 'aluguel' ? 'Aluguel/mês' : 'Venda'

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50">

        {/* Header bar */}
        <div className="pt-24 pb-8" style={{ background: 'linear-gradient(135deg,#162a35,#4280a1)' }}>
          <div className="section-wrapper">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap gap-2 text-sm text-white/60">
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.path} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden>/</span>}
                    {i < breadcrumbs.length - 1 ? (
                      <a href={crumb.path} className="hover:text-white">{crumb.name}</a>
                    ) : (
                      <span className="text-white" aria-current="page">{crumb.name}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <h1 className="heading-lg text-white">{property.title}</h1>
            <p className="text-white/70 mt-1">
              {property.address.neighborhood} · {property.address.city}, {property.address.state}
            </p>
          </div>
        </div>

        <div className="section-wrapper py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Image gallery */}
              <section aria-label="Fotos do imóvel">
                {property.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 relative h-72 sm:h-96 rounded-2xl overflow-hidden">
                      <Image
                        src={property.images[0].url}
                        alt={property.images[0].alt}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    </div>
                    {property.images.slice(1, 3).map(img => (
                      <div key={img.id} className="relative h-40 rounded-xl overflow-hidden">
                        <Image
                          src={img.url}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Details */}
              <section aria-labelledby="details-heading" className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 id="details-heading" className="font-display font-semibold text-xl text-brand-dark mb-4">
                  Detalhes do imóvel
                </h2>
                <ul
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                  aria-label="Características principais"
                >
                  <StatItem icon="🛏" label="Quartos"    value={String(property.bedrooms)} />
                  <StatItem icon="🚿" label="Banheiros"  value={String(property.bathrooms)} />
                  <StatItem icon="🚗" label="Vagas"      value={String(property.garages)} />
                  <StatItem icon="📐" label="Área total" value={`${property.area} m²`} />
                </ul>
              </section>

              {/* Description */}
              <section aria-labelledby="desc-heading" className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 id="desc-heading" className="font-display font-semibold text-xl text-brand-dark mb-3">Descrição</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </section>

              {/* Features */}
              {property.features.length > 0 && (
                <section aria-labelledby="features-heading" className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h2 id="features-heading" className="font-display font-semibold text-xl text-brand-dark mb-4">
                    Diferenciais e comodidades
                  </h2>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-brand-light text-brand-blue flex items-center justify-center text-xs font-bold flex-shrink-0" aria-hidden>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Address */}
              <section aria-labelledby="address-heading" className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 id="address-heading" className="font-display font-semibold text-xl text-brand-dark mb-3">Localização</h2>
                <address className="not-italic text-gray-600 text-sm mb-4">
                  {property.address.street}, {property.address.number}<br />
                  {property.address.neighborhood} — {property.address.city}/{property.address.state}
                </address>
                <div className="rounded-xl overflow-hidden h-52 border border-gray-100">
                  <iframe
                    title={`Mapa — ${property.title}`}
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657!2d${property.address.lng ?? -46.63}!3d${property.address.lat ?? -23.55}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(property.address.street)}!5e0!3m2!1spt!2sbr!4v1234567890`}
                    width="100%" height="100%" style={{ border: 0 }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </section>

              {/* Financing calculator */}
              <FinancingCalculator defaultValue={property.price} />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1" aria-label="Contato e preço">
              <div className="sticky top-24 space-y-4">
                {/* Price card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  {property.badge && (
                    <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-brand-light text-brand-blue mb-3">
                      {property.badge}
                    </span>
                  )}
                  <p className="text-xs text-gray-400 mb-1">{purposeLabel}</p>
                  <p className="font-display font-bold text-3xl text-brand-dark">
                    {formatCurrency(property.price)}
                    {property.purpose === 'aluguel' && <span className="text-base text-gray-400 font-normal">/mês</span>}
                  </p>

                  <div className="mt-5 space-y-3">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center !bg-[#25D366] hover:!bg-[#1ebe57]"
                      aria-label={`Solicitar visita ao imóvel ${property.title}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Solicitar visita
                    </a>
                    <a href="/contato" className="btn-outline w-full justify-center">
                      Enviar mensagem
                    </a>
                  </div>
                </div>

                {/* Share card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <p className="text-sm font-semibold text-brand-dark mb-3">Compartilhar este imóvel</p>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/imoveis/${property.slug}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      aria-label="Compartilhar no Facebook"
                      className="flex-1 py-2 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      Facebook
                    </a>
                    <a
                      href={waLink}
                      target="_blank" rel="noopener noreferrer"
                      aria-label="Compartilhar no WhatsApp"
                      className="flex-1 py-2 rounded-lg bg-[#25D366] hover:bg-[#1ebe57] text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppChatbot />
      <JsonLd schema={buildPropertySchema(property)} />
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
    </>
  )
}

function StatItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <li className="flex flex-col items-center bg-gray-50 rounded-xl p-3 gap-1">
      <span className="text-2xl" aria-hidden>{icon}</span>
      <span className="font-semibold text-brand-dark text-base">{value}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </li>
  )
}
