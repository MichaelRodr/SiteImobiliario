import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { SITE_CONFIG } from '@/lib/config'

export const metadata = generatePageMetadata({
  title: 'Política de Privacidade',
  description: 'Política de privacidade e proteção de dados da Mendes & Favaro, em conformidade com a LGPD.',
  path: '/privacidade',
  noIndex: false,
})

export default function PrivacidadePage() {
  const updated = '01 de janeiro de 2025'

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50">
        <div className="pt-24 pb-10" style={{ background: 'linear-gradient(135deg,#162a35,#4280a1)' }}>
          <div className="section-wrapper">
            <h1 className="heading-lg text-white">Política de Privacidade</h1>
            <p className="text-white/70 mt-2 text-sm">Última atualização: {updated}</p>
          </div>
        </div>

        <article className="section-wrapper max-w-4xl py-14 prose prose-gray max-w-none">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 space-y-8 text-gray-700">

            <section aria-labelledby="s1">
              <h2 id="s1" className="font-display font-semibold text-xl text-brand-dark mb-3">1. Informações que coletamos</h2>
              <p>A <strong>{SITE_CONFIG.name}</strong> coleta apenas os dados necessários para prestar nossos serviços:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                <li>Nome completo e informações de contato (telefone, e-mail, WhatsApp)</li>
                <li>Dados de navegação (cookies técnicos e analíticos)</li>
                <li>Informações fornecidas em formulários e no chatbot</li>
                <li>Dados de preferências de imóveis</li>
              </ul>
            </section>

            <section aria-labelledby="s2">
              <h2 id="s2" className="font-display font-semibold text-xl text-brand-dark mb-3">2. Como usamos seus dados</h2>
              <p className="text-sm">Utilizamos suas informações para:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                <li>Entrar em contato para atendimento imobiliário</li>
                <li>Enviar informações sobre imóveis de seu interesse</li>
                <li>Melhorar nossos serviços e a experiência no site</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section aria-labelledby="s3">
              <h2 id="s3" className="font-display font-semibold text-xl text-brand-dark mb-3">3. Base legal (LGPD — Lei 13.709/2018)</h2>
              <p className="text-sm">O tratamento dos seus dados é realizado com base no seu <strong>consentimento</strong> (Art. 7º, I) e para a execução de contrato ou procedimentos preliminares (Art. 7º, V). Você pode revogar seu consentimento a qualquer momento.</p>
            </section>

            <section aria-labelledby="s4">
              <h2 id="s4" className="font-display font-semibold text-xl text-brand-dark mb-3">4. Compartilhamento de dados</h2>
              <p className="text-sm">Não vendemos seus dados. Podemos compartilhá-los somente com ferramentas de análise (Google Analytics, Facebook Pixel) e com nosso CRM, sempre com cláusulas de proteção de dados.</p>
            </section>

            <section aria-labelledby="s5">
              <h2 id="s5" className="font-display font-semibold text-xl text-brand-dark mb-3">5. Seus direitos</h2>
              <p className="text-sm">Conforme a LGPD, você tem direito a:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar, corrigir ou excluir seus dados</li>
                <li>Revogar o consentimento</li>
                <li>Portabilidade dos dados</li>
              </ul>
              <p className="text-sm mt-3">Para exercer seus direitos, entre em contato pelo e-mail: <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-brand-blue hover:underline">{SITE_CONFIG.contact.email}</a></p>
            </section>

            <section aria-labelledby="s6">
              <h2 id="s6" className="font-display font-semibold text-xl text-brand-dark mb-3">6. Cookies</h2>
              <p className="text-sm">Utilizamos cookies técnicos (essenciais para o funcionamento) e analíticos (Google Analytics, Facebook Pixel). Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a experiência no site.</p>
            </section>

            <section aria-labelledby="s7">
              <h2 id="s7" className="font-display font-semibold text-xl text-brand-dark mb-3">7. Contato do Encarregado (DPO)</h2>
              <p className="text-sm">
                {SITE_CONFIG.name} — {SITE_CONFIG.contact.address}, {SITE_CONFIG.contact.city}/{SITE_CONFIG.contact.state}<br />
                E-mail: <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-brand-blue hover:underline">{SITE_CONFIG.contact.email}</a><br />
                Telefone: {SITE_CONFIG.contact.phone}
              </p>
            </section>

          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
