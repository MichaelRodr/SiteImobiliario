const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const SITE_CONFIG = {
  name: 'Mendes & Favaro',
  url: siteUrl,
  tagline: 'O imóvel ideal para viver seus melhores momentos.',
  specialty: 'Imóveis em São Paulo',
  whatsappMessage: encodeURIComponent('Olá! Gostaria de falar com um corretor.'),
  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE ?? '+55 (11) 3333-4444',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '5511933334444',
    email: process.env.NEXT_PUBLIC_EMAIL ?? 'contato@mendesfavaro.com.br',
    address: 'Avenida Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    openingHours: 'Segunda a sexta, das 9h às 18h',
    lat: -23.5631,
    lng: -46.6544,
  },
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK ?? '',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE ?? '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN ?? '',
  },
}
