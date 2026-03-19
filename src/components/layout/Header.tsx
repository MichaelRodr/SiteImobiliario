'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SITE_CONFIG } from '@/lib/config'
import { whatsAppService } from '@/services/whatsapp'
import { clsx } from 'clsx'

const NAV_LINKS = [
  { label: 'Início',    href: '/' },
  { label: 'Imóveis',   href: '/imoveis' },
  { label: 'Serviços',  href: '/servicos' },
  { label: 'Sobre',     href: '/sobre' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Contato',   href: '/contato' },
]

export function Header() {
  const [isScrolled,    setIsScrolled]    = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Trap focus & close on Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const waLink = whatsAppService.buildLink(decodeURIComponent(SITE_CONFIG.whatsappMessage))

  return (
    <>
      <header
        role="banner"
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'glass border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="section-wrapper">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg p-1"
              aria-label={`${SITE_CONFIG.name} — Página inicial`}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #162a35, #4280a1)' }}
                aria-hidden="true"
              >
                MF
              </div>
              <span className="font-display font-bold text-white text-lg leading-tight hidden sm:block">
                Mendes &amp; Favaro
              </span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-150',
                    pathname === link.href
                      ? 'text-white bg-white/15'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/\D/g, '')}`}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
                aria-label={`Ligar para ${SITE_CONFIG.contact.phone}`}
              >
                {SITE_CONFIG.contact.phone}
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-2 !text-sm"
                aria-label="Falar no WhatsApp"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-blue transition-colors"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(v => !v)}
            >
              <HamburgerIcon open={menuOpen} />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-md lg:hidden"
          id="mobile-menu"
          role="dialog"
          aria-label="Menu de navegação"
          aria-modal="true"
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
            <nav aria-label="Navegação mobile" className="flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={clsx(
                    'px-4 py-3 rounded-xl text-lg font-semibold transition-colors',
                    pathname === link.href
                      ? 'bg-brand-blue text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-8 flex flex-col gap-3">
              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/\D/g, '')}`}
                className="btn-outline !border-white/40 !text-white hover:!bg-white/10 w-full justify-center"
              >
                {SITE_CONFIG.contact.phone}
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <WhatsAppIcon />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="8" x2="21" y2="8" />
          <line x1="3" y1="16" x2="21" y2="16" />
        </>
      )}
    </svg>
  )
}
