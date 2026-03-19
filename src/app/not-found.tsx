import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p
            className="font-display font-bold text-8xl mb-4"
            style={{ color: '#4280a1' }}
            aria-hidden
          >
            404
          </p>
          <h1 className="heading-md text-brand-dark mb-3">Página não encontrada</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            A página que você está procurando não existe ou foi movida.
            Volte ao início para explorar nossos imóveis.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary">Voltar ao início</Link>
            <Link href="/imoveis" className="btn-outline">Ver imóveis</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
