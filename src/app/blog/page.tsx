import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppChatbot } from '@/components/features/chatbot/WhatsAppChatbot'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { buildBreadcrumbSchema, JsonLd } from '@/lib/schema'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = generatePageMetadata({
  title: 'Blog — Dicas e Notícias do Mercado Imobiliário',
  description: 'Artigos, dicas e novidades sobre o mercado imobiliário, financiamento, decoração e muito mais.',
  path: '/blog',
  keywords: ['blog imobiliário', 'dicas imóveis', 'mercado imobiliário', 'financiamento imobiliário'],
})

// In production, replace with CMS (Sanity / Contentful / Strapi)
const MOCK_POSTS = [
  { slug: 'como-financiar-primeiro-imovel', title: 'Como financiar seu primeiro imóvel em 2025', excerpt: 'Guia completo com todas as etapas, documentos necessários e dicas para conseguir as melhores condições de financiamento.', category: 'Financiamento', readingTime: 8, publishedAt: '2025-01-10', coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=75' },
  { slug: 'dicas-decoracao-apartamento-pequeno', title: '12 dicas de decoração para apartamentos pequenos', excerpt: 'Maximize o espaço do seu apartamento com técnicas de design de interiores usadas por profissionais.', category: 'Decoração', readingTime: 6, publishedAt: '2025-01-05', coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=75' },
  { slug: 'mercado-imobiliario-2025-previsoes', title: 'Mercado imobiliário em 2025: o que esperar', excerpt: 'Análise dos principais indicadores e tendências para quem quer comprar, vender ou investir em imóveis este ano.', category: 'Mercado', readingTime: 10, publishedAt: '2024-12-28', coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=75' },
  { slug: 'documentos-para-comprar-imovel', title: 'Quais documentos são necessários para comprar um imóvel?', excerpt: 'Lista completa de todos os documentos que comprador e vendedor precisam apresentar na transação imobiliária.', category: 'Burocracia', readingTime: 7, publishedAt: '2024-12-15', coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=75' },
  { slug: 'vantagens-comprar-vs-alugar', title: 'Comprar ou alugar? Veja qual é melhor para você', excerpt: 'Análise financeira e de estilo de vida para ajudar você a tomar a melhor decisão.', category: 'Finanças', readingTime: 9, publishedAt: '2024-12-01', coverImage: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=75' },
  { slug: 'como-avaliar-imovel-antes-comprar', title: 'Como avaliar um imóvel antes de comprar: checklist completo', excerpt: 'Saiba o que verificar na estrutura, documentação e localização antes de fechar negócio.', category: 'Dicas', readingTime: 8, publishedAt: '2024-11-20', coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=75' },
]

export default function BlogPage() {
  const [featured, ...rest] = MOCK_POSTS

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50">

        {/* Header */}
        <div className="pt-24 pb-12" style={{ background: 'linear-gradient(135deg,#162a35,#4280a1)' }}>
          <div className="section-wrapper">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex gap-2 text-sm text-white/60">
                <li><a href="/" className="hover:text-white">Início</a></li>
                <li aria-hidden>/</li>
                <li className="text-white" aria-current="page">Blog</li>
              </ol>
            </nav>
            <h1 className="heading-lg text-white mb-2">Blog Mendes &amp; Favaro</h1>
            <p className="text-white/70">Dicas, notícias e análises do mercado imobiliário</p>
          </div>
        </div>

        <div className="section-wrapper py-12">
          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`} className="block group mb-12">
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 lg:h-auto">
                <Image src={featured.coverImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block bg-brand-light text-brand-blue text-xs font-bold px-3 py-1 rounded-full mb-4">{featured.category}</span>
                <h2 className="font-display font-bold text-2xl text-brand-dark mb-3 group-hover:text-brand-blue transition-colors">{featured.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                <p className="text-xs text-gray-400">{new Date(featured.publishedAt).toLocaleDateString('pt-BR')} · {featured.readingTime} min de leitura</p>
              </div>
            </article>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="card h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="inline-block bg-brand-light text-brand-blue text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 self-start">{post.category}</span>
                    <h2 className="font-display font-semibold text-brand-dark text-base leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">{post.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                    <p className="text-xs text-gray-400 mt-3">{new Date(post.publishedAt).toLocaleDateString('pt-BR')} · {post.readingTime} min</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppChatbot />
      <JsonLd schema={buildBreadcrumbSchema([{ name:'Início', path:'/' }, { name:'Blog', path:'/blog' }])} />
    </>
  )
}
