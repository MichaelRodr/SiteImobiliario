import type { Property } from '@/types'
import { SITE_CONFIG } from '@/lib/config'

function buildLink(message: string): string {
  const phone = SITE_CONFIG.contact.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export const whatsAppService = {
  buildLink,
  buildPropertyLink(property: Property): string {
    return buildLink(`Olá! Tenho interesse no imóvel "${property.title}" (${property.slug}).`)
  },
}
