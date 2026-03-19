import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppChatbot } from '@/components/features/chatbot/WhatsAppChatbot'
import { ContactForm } from '@/components/features/ContactForm'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { buildBreadcrumbSchema, buildLocalBusinessSchema, JsonLd } from '@/lib/schema'
import { SITE_CONFIG } from '@/lib/config'
import { whatsAppService } from '@/services/whatsapp'

export const metadata = generatePageMetadata({
  title: 'Contato',
  description: 'Entre em contato com a Mendes & Favaro. Atendimento personalizado por telefone, WhatsApp ou formulário online.',
  path: '/contato',
})

export default function ContatoPage() {
  const waLink = whatsAppService.buildLink(decodeURIComponent(SITE_CONFIG.whatsappMessage))

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50">

        {/* Header banner */}
        <div className="pt-24 pb-12 text-white" style={{ background: 'linear-gradient(135deg, #162a35, #4280a1)' }}>
          <div className="section-wrapper">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex gap-2 text-sm text-white/60">
                <li><a href="/" className="hover:text-white">Início</a></li>
                <li aria-hidden>/</li>
                <li className="text-white" aria-current="page">Contato</li>
              </ol>
            </nav>
            <h1 className="heading-lg text-white">Fale com nossa equipe</h1>
            <p className="text-white/70 mt-2 max-w-xl">
              Estamos prontos para te ajudar a encontrar o imóvel dos seus sonhos ou a melhor solução para o seu imóvel.
            </p>
          </div>
        </div>

        <div className="section-wrapper py-14 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div>
            <h2 className="heading-md text-brand-dark mb-6">Informações de contato</h2>
            <ul className="space-y-5">
              <ContactInfoItem icon="📍" label="Endereço">
                {SITE_CONFIG.contact.address}<br />
                {SITE_CONFIG.contact.city} — {SITE_CONFIG.contact.state}, {SITE_CONFIG.contact.zipCode}
              </ContactInfoItem>
              <ContactInfoItem icon="📞" label="Telefone">
                <a href={`tel:${SITE_CONFIG.contact.phone.replace(/\D/g,'')}`} className="hover:text-brand-blue transition-colors">
                  {SITE_CONFIG.contact.phone}
                </a>
              </ContactInfoItem>
              <ContactInfoItem icon="✉️" label="E-mail">
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-brand-blue transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </ContactInfoItem>
              <ContactInfoItem icon="🕐" label="Horário de atendimento">
                {SITE_CONFIG.contact.openingHours}
              </ContactInfoItem>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-xl font-semibold transition-colors shadow-lg"
              aria-label="Falar com a equipe pelo WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chamar no WhatsApp
            </a>

            {/* Google Maps embed */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-64">
              <iframe
                title="Localização Mendes & Favaro no mapa"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0754054985!2d${SITE_CONFIG.contact.lng}!3d${SITE_CONFIG.contact.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${SITE_CONFIG.name}!5e0!3m2!1spt-BR!2sbr!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.contact.address + ', ' + SITE_CONFIG.contact.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-brand-blue hover:underline"
            >
              Ver no Google Maps →
            </a>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="heading-md text-brand-dark mb-6">Envie uma mensagem</h2>
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppChatbot />
      <JsonLd schema={buildBreadcrumbSchema([{ name: 'Início', path: '/' }, { name: 'Contato', path: '/contato' }])} />
      <JsonLd schema={buildLocalBusinessSchema()} />
    </>
  )
}

function ContactInfoItem({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0 text-lg" aria-hidden>{icon}</span>
      <div>
        <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider mb-0.5">{label}</p>
        <div className="text-brand-dark text-sm leading-relaxed">{children}</div>
      </div>
    </li>
  )
}
