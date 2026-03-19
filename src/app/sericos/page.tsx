import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppChatbot } from '@/components/features/chatbot/WhatsAppChatbot'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { buildBreadcrumbSchema, buildFAQSchema, JsonLd } from '@/lib/schema'
import { SITE_CONFIG } from '@/lib/config'
import { whatsAppService } from '@/services/whatsapp'
import Link from 'next/link'

export const metadata = generatePageMetadata({
  title: 'Serviços — Intermediação Imobiliária',
  description: 'Compra, venda, locação, avaliação e consultoria imobiliária. Conheça todos os serviços da Mendes & Favaro.',
  path: '/servicos',
  keywords: ['compra imóvel', 'venda imóvel', 'locação', 'avaliação imobiliária', 'consultoria'],
})

const SERVICES = [
  {
    icon: '🏠',
    title: 'Compra e Venda',
    description: 'Assessoria completa para compradores e vendedores. Avaliamos, negociamos e cuidamos de toda a burocracia para que você realize o melhor negócio com segurança.',
    features: ['Avaliação gratuita do imóvel', 'Captação de compradores qualificados', 'Acompanhamento jurídico', 'Gestão de toda a documentação'],
  },
  {
    icon: '🔑',
    title: 'Locação Residencial e Comercial',
    description: 'Gerenciamento completo de locações, do anúncio à entrega das chaves. Protegemos tanto proprietários quanto inquilinos em cada etapa do contrato.',
    features: ['Análise de crédito do inquilino', 'Contrato personalizado', 'Vistoria de entrada e saída', 'Gestão de cobranças'],
  },
  {
    icon: '📋',
    title: 'Avaliação Imobiliária',
    description: 'Laudo técnico de avaliação mercadológica para fins de compra, venda, locação, inventário ou financiamento bancário.',
    features: ['Laudo com validade jurídica', 'Avaliação por corretores CRECI', 'Análise comparativa de mercado', 'Entrega em até 48h'],
  },
  {
    icon: '📈',
    title: 'Consultoria de Investimentos',
    description: 'Orientação especializada para quem deseja investir no mercado imobiliário. Identificamos as melhores oportunidades de acordo com seu perfil e capital.',
    features: ['Análise de rentabilidade', 'Mapeamento de oportunidades', 'Due diligence completa', 'Acompanhamento pós-investimento'],
  },
  {
    icon: '📢',
    title: 'Anúncio e Marketing',
    description: 'Divulgamos seu imóvel com fotos profissionais, tour virtual e anúncios nos principais portais imobiliários e redes sociais.',
    features: ['Fotos e vídeos profissionais', 'Publicação em portais (ZAP, VivaReal)', 'Divulgação nas redes sociais', 'Relatório de visitas mensais'],
  },
  {
    icon: '🤝',
    title: 'Assessoria Jurídica',
    description: 'Parceria com escritórios jurídicos especializados para análise de contratos, regularização de imóveis e suporte em disputas.',
    features: ['Análise de contratos', 'Regularização de documentos', 'Suporte em distrato', 'Orientação tributária (ITBI, IR)'],
  },
]

const SERVICE_FAQS = [
  { question: 'Quanto tempo leva para vender um imóvel?', answer: 'O tempo médio de venda depende do tipo de imóvel, localização e condições de mercado. Em média, trabalhamos com prazos de 60 a 90 dias para imóveis bem precificados.' },
  { question: 'A avaliação imobiliária é gratuita?', answer: 'Sim, para imóveis que serão intermediados pela Mendes & Favaro, a avaliação é gratuita. Para laudos com finalidade jurídica ou bancária, há uma taxa específica.' },
  { question: 'Vocês trabalham com imóveis em outros municípios?', answer: 'Atendemos principalmente na Grande São Paulo, mas também podemos atender outras cidades mediante análise. Entre em contato para verificar a disponibilidade.' },
]

export default function ServicosPage() {
  const waLink = whatsAppService.buildLink('Olá! Gostaria de saber mais sobre os serviços da Mendes & Favaro.')

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50">

        {/* Page header */}
        <div className="pt-24 pb-12 text-white" style={{ background: 'linear-gradient(135deg,#162a35,#4280a1)' }}>
          <div className="section-wrapper">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex gap-2 text-sm text-white/60">
                <li><a href="/" className="hover:text-white">Início</a></li>
                <li aria-hidden>/</li>
                <li className="text-white" aria-current="page">Serviços</li>
              </ol>
            </nav>
            <h1 className="heading-lg text-white mb-3">Nossos Serviços</h1>
            <p className="text-white/70 max-w-xl">
              Soluções completas em intermediação imobiliária para quem compra, vende, aluga ou investe.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <section className="section-wrapper py-16" aria-labelledby="services-grid-heading">
          <h2 id="services-grid-heading" className="sr-only">Lista de serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(service => (
              <article
                key={service.title}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-4xl block mb-4" aria-hidden>{service.icon}</span>
                <h2 className="font-display font-semibold text-xl text-brand-dark mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-1.5" aria-label={`Inclusos em ${service.title}`}>
                  {service.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-brand-blue font-bold mt-0.5 flex-shrink-0" aria-hidden>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* CTA strip */}
        <section
          className="py-16 text-white text-center"
          style={{ background: 'linear-gradient(135deg,#162a35,#4280a1)' }}
          aria-label="Entre em contato"
        >
          <div className="section-wrapper max-w-2xl">
            <h2 className="heading-md mb-4">Precisa de algum destes serviços?</h2>
            <p className="text-white/75 mb-8">
              Fale com nossos especialistas e receba uma consultoria gratuita e sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Solicitar consultoria gratuita
              </a>
              <Link href="/contato" className="btn-outline !border-white/50 !text-white hover:!bg-white/10">
                Enviar mensagem
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-wrapper py-16 max-w-3xl" aria-labelledby="faq-services-heading">
          <h2 id="faq-services-heading" className="heading-md text-brand-dark text-center mb-10">
            Dúvidas frequentes sobre nossos serviços
          </h2>
          <dl className="space-y-4">
            {SERVICE_FAQS.map(faq => (
              <div key={faq.question} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <dt className="font-semibold text-brand-dark mb-2">{faq.question}</dt>
                <dd className="text-gray-600 text-sm leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

      </main>
      <Footer />
      <WhatsAppChatbot />
      <JsonLd schema={buildBreadcrumbSchema([{ name: 'Início', path: '/' }, { name: 'Serviços', path: '/servicos' }])} />
      <JsonLd schema={buildFAQSchema(SERVICE_FAQS)} />
    </>
  )
}
