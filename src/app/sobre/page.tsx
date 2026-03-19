import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppChatbot } from '@/components/features/chatbot/WhatsAppChatbot'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { buildBreadcrumbSchema, JsonLd } from '@/lib/schema'
import { SITE_CONFIG } from '@/lib/config'

export const metadata = generatePageMetadata({
  title: 'Sobre Nós',
  description: 'Conheça a Mendes & Favaro, imobiliária especializada em intermediação imobiliária com anos de experiência no mercado.',
  path: '/sobre',
})

export default function SobrePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50">

        {/* Header */}
        <div className="pt-24 pb-12 text-white" style={{ background: 'linear-gradient(135deg,#162a35,#4280a1)' }}>
          <div className="section-wrapper">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex gap-2 text-sm text-white/60">
                <li><a href="/" className="hover:text-white">Início</a></li>
                <li aria-hidden>/</li>
                <li className="text-white" aria-current="page">Sobre</li>
              </ol>
            </nav>
            <h1 className="heading-lg text-white">Sobre a Mendes &amp; Favaro</h1>
            <p className="text-white/70 mt-2 max-w-xl">{SITE_CONFIG.tagline}</p>
          </div>
        </div>

        {/* Mission */}
        <section className="section-wrapper py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" aria-labelledby="mission-heading">
          <div>
            <p className="text-brand-blue text-sm font-semibold uppercase tracking-wider mb-2">Nossa história</p>
            <h2 id="mission-heading" className="heading-md text-brand-dark mb-4">Construindo sonhos há mais de 15 anos</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A Mendes &amp; Favaro nasceu da paixão pela intermediação imobiliária e do desejo de oferecer um serviço diferenciado, honesto e personalizado. Ao longo dos anos, nos tornamos referência no mercado local pela seriedade, transparência e compromisso com os resultados dos nossos clientes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nossa missão é simples: transformar o sonho da casa própria em realidade, tornando cada etapa do processo imobiliário mais segura, clara e satisfatória para quem compra, vende ou aluga.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value:'500+', label:'Imóveis negociados' },
              { value:'98%',  label:'Satisfação dos clientes' },
              { value:'15+',  label:'Anos de experiência' },
              { value:'50+',  label:'Corretores CRECI' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <p className="font-display font-bold text-3xl text-brand-blue mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-16 text-white" style={{ background: 'linear-gradient(135deg,#162a35,#4280a1)' }} aria-labelledby="values-heading">
          <div className="section-wrapper">
            <h2 id="values-heading" className="heading-md text-center mb-10">Nossos valores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon:'🤝', title:'Transparência', desc:'Clareza total em todas as etapas da negociação, sem surpresas.' },
                { icon:'⭐', title:'Excelência',    desc:'Buscamos sempre superar as expectativas em cada atendimento.' },
                { icon:'🛡️', title:'Segurança',    desc:'Processos seguros e documentação acompanhada por especialistas.' },
              ].map(v => (
                <div key={v.title} className="glass-light rounded-2xl p-6 text-center">
                  <span className="text-4xl block mb-3" aria-hidden>{v.icon}</span>
                  <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-white/70 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-wrapper py-16" aria-labelledby="team-heading">
          <h2 id="team-heading" className="heading-md text-brand-dark text-center mb-10">Nossa equipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name:'Carlos Mendes',   role:'Diretor / CRECI-SP',   initials:'CM' },
              { name:'Ana Favaro',      role:'Diretora / CRECI-SP',  initials:'AF' },
              { name:'Ricardo Lima',    role:'Corretor Senior',      initials:'RL' },
              { name:'Fernanda Costa',  role:'Corretora',            initials:'FC' },
            ].map(member => (
              <div key={member.name} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-xl text-white"
                  style={{ background: 'linear-gradient(135deg,#162a35,#4280a1)' }}
                  aria-hidden
                >
                  {member.initials}
                </div>
                <h3 className="font-semibold text-brand-dark">{member.name}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppChatbot />
      <JsonLd schema={buildBreadcrumbSchema([{ name:'Início', path:'/' }, { name:'Sobre', path:'/sobre' }])} />
    </>
  )
}
