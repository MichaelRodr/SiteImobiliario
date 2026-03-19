import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PropertyCard } from '@/components/features/properties/PropertyCard'
import { FinancingCalculator } from '@/components/features/calculator/FinancingCalculator'
import { WhatsAppChatbot } from '@/components/features/chatbot/WhatsAppChatbot'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { buildFAQSchema, buildRealEstateAgentSchema, JsonLd } from '@/lib/schema'
import { propertyService } from '@/services/properties'
import { SITE_CONFIG } from '@/lib/config'
import { whatsAppService } from '@/services/whatsapp'

export const metadata = generatePageMetadata({
  title: 'Mendes & Favaro — Imobiliária em São Paulo',
  description: 'Encontre imóveis à venda e para alugar em São Paulo. Atendimento personalizado, corretores especializados. Realize o sonho da casa própria.',
})

const FAQS = [
  { question: 'Quais documentos preciso para comprar um imóvel?', answer: 'Para comprar um imóvel você precisará de RG, CPF, comprovante de renda, comprovante de residência e certidão de estado civil. Podemos orientar em cada etapa do processo.' },
  { question: 'Como funciona o financiamento imobiliário?', answer: 'O financiamento imobiliário permite parcelar o valor do imóvel em até 420 meses (35 anos). A aprovação depende de análise de crédito, renda e histórico financeiro.' },
  { question: 'A Mendes & Favaro cobra taxa de intermediação?', answer: 'A comissão de corretagem é regulamentada pelo CRECI e geralmente varia de 4% a 6% do valor do imóvel. Esclarecemos todos os custos antes de assinar qualquer documento.' },
  { question: 'Posso anunciar meu imóvel com vocês?', answer: 'Sim! Fazemos avaliação gratuita do imóvel, criamos anúncios profissionais com fotos e divulgamos em nosso site, portais e redes sociais.' },
]

export default async function HomePage() {
  const { data: featured } = await propertyService.list({ highlight: true, limit: 6 })
  const waLink = whatsAppService.buildLink(decodeURIComponent(SITE_CONFIG.whatsappMessage))

  return (
    <>
      <Header />
      <main id="main-content">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex items-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=85"
              alt="Linda residência moderna"
              fill
              sizes="100vw"
              priority
              fetchPriority="high"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(22,42,53,0.88) 0%, rgba(66,128,161,0.55) 100%)' }}
              aria-hidden
            />
          </div>

          <div className="section-wrapper relative z-10 py-32 lg:py-40">
            <div className="max-w-2xl">
              <p className="text-brand-light text-sm font-semibold uppercase tracking-widest mb-4 animate-fade-up">
                {SITE_CONFIG.specialty}
              </p>
              <h1 id="hero-heading" className="heading-xl text-white mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                {SITE_CONFIG.tagline}
              </h1>
              <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
                Encontre o imóvel ideal com a assessoria de quem entende do mercado há anos.
                Atendimento personalizado do início ao fim.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <Link href="/imoveis" className="btn-primary">
                  Ver imóveis disponíveis
                </Link>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-outline !border-white/50 !text-white hover:!bg-white/10">
                  Falar com um corretor
                </a>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="section-wrapper">
              <dl className="glass rounded-t-2xl grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                {[
                  { value: '500+', label: 'Imóveis vendidos' },
                  { value: '98%',  label: 'Clientes satisfeitos' },
                  { value: '15+',  label: 'Anos de experiência' },
                  { value: '50+',  label: 'Corretores certificados' },
                ].map(stat => (
                  <div key={stat.label} className="px-6 py-4 text-center">
                    <dt className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</dt>
                    <dd className="text-white font-display font-bold text-2xl mt-0.5">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── Featured Properties ───────────────────────────────────────── */}
        <section
          className="py-20 lg:py-28 bg-gray-50"
          aria-labelledby="featured-heading"
        >
          <div className="section-wrapper">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-brand-blue text-sm font-semibold uppercase tracking-wider mb-2">Oportunidades selecionadas</p>
                <h2 id="featured-heading" className="heading-lg text-brand-dark">Imóveis em Destaque</h2>
              </div>
              <Link href="/imoveis" className="btn-outline self-start sm:self-auto">
                Ver todos →
              </Link>
            </div>

            {featured.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-16">Nenhum imóvel em destaque no momento.</p>
            )}
          </div>
        </section>

        {/* ── Services strip ────────────────────────────────────────────── */}
        <section className="py-16 text-white" style={{ background: 'linear-gradient(135deg, #162a35, #4280a1)' }} aria-labelledby="services-heading">
          <div className="section-wrapper">
            <h2 id="services-heading" className="heading-md text-center mb-10">Como podemos ajudar você</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon:'🏠', title:'Compra e Venda',   desc:'Assessoria completa na compra e venda de imóveis residenciais e comerciais.' },
                { icon:'🔑', title:'Locação',          desc:'Gerenciamento de aluguéis com segurança para proprietários e inquilinos.' },
                { icon:'📋', title:'Avaliação',        desc:'Laudo técnico de avaliação imobiliária para fins comerciais e jurídicos.' },
                { icon:'📈', title:'Investimentos',    desc:'Consultoria especializada para investidores no mercado imobiliário.' },
              ].map(s => (
                <div key={s.title} className="glass-light rounded-2xl p-6 text-center">
                  <span className="text-4xl block mb-3" aria-hidden>{s.icon}</span>
                  <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Calculator ────────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28 bg-white" aria-label="Calculadora de financiamento">
          <div className="section-wrapper max-w-4xl">
            <FinancingCalculator />
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50" aria-labelledby="testimonials-heading">
          <div className="section-wrapper">
            <h2 id="testimonials-heading" className="heading-lg text-brand-dark text-center mb-10">O que nossos clientes dizem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name:'Ana Paula S.',   text:'Equipe incrível! Me ajudaram a encontrar o apartamento perfeito em menos de um mês. Super recomendo!', stars:5 },
                { name:'Roberto Alves', text:'Processo de compra muito tranquilo graças à assessoria da Mendes & Favaro. Profissionais exemplares.',   stars:5 },
                { name:'Carla Menezes', text:'Vendi meu imóvel pelo valor justo e no prazo esperado. Comunicação excelente durante todo o processo.',  stars:5 },
              ].map(t => (
                <blockquote key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex text-amber-400 mb-3" aria-label={`${t.stars} estrelas`}>
                    {'★'.repeat(t.stars)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <footer className="font-semibold text-brand-dark text-sm">{t.name}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white" aria-labelledby="faq-heading">
          <div className="section-wrapper max-w-3xl">
            <h2 id="faq-heading" className="heading-lg text-brand-dark text-center mb-10">Perguntas Frequentes</h2>
            <dl className="space-y-4">
              {FAQS.map(faq => (
                <div key={faq.question} className="bg-gray-50 rounded-xl p-5">
                  <dt className="font-semibold text-brand-dark mb-2">{faq.question}</dt>
                  <dd className="text-gray-600 text-sm leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── CTA final ─────────────────────────────────────────────────── */}
        <section
          className="py-20 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #162a35, #4280a1)' }}
          aria-label="Chamada para ação final"
        >
          <div className="section-wrapper max-w-2xl">
            <h2 className="heading-lg mb-4">Pronto para realizar o seu sonho?</h2>
            <p className="text-white/75 text-lg mb-8">
              Entre em contato agora e nossos especialistas vão te ajudar a encontrar o imóvel ideal.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/imoveis" className="btn-primary">Ver imóveis disponíveis</Link>
              <Link href="/contato" className="btn-outline !border-white/50 !text-white hover:!bg-white/10">Fale conosco</Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppChatbot />

      {/* JSON-LD */}
      <JsonLd schema={buildFAQSchema(FAQS)} />
    </>
  )
}
