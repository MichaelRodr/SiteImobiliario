'use client'

import { SITE_CONFIG } from '@/lib/config'
import { whatsAppService } from '@/services/whatsapp'

export function WhatsAppChatbot() {
  const href = whatsAppService.buildLink(decodeURIComponent(SITE_CONFIG.whatsappMessage))

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg transition-transform hover:scale-105"
      aria-label="Fale com um corretor pelo WhatsApp"
    >
      <span aria-hidden="true">✆</span>
    </a>
  )
}
