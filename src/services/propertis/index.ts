import type { Property, PropertyFilter, PaginatedResult } from '@/types'

// ─── Interface ────────────────────────────────────────────────────────────────
export interface IPropertyService {
  list(filter: PropertyFilter): Promise<PaginatedResult<Property>>
  getBySlug(slug: string): Promise<Property | null>
  getFeatured(limit?: number): Promise<Property[]>
}

// ─── Mock data (replace with Sanity / Supabase / Prisma) ─────────────────────
const MOCK_PROPERTIES: Property[] = [
  {
    id: '1', slug: 'casa-3-quartos-centro',
    title: 'Casa 3 Quartos no Centro',
    description: 'Linda casa com acabamento de alto padrão, 3 quartos sendo 1 suíte, área gourmet e piscina. Localizada no coração da cidade.',
    type: 'casa', purpose: 'venda', price: 650000, area: 180,
    bedrooms: 3, bathrooms: 2, garages: 2,
    address: { street: 'Rua das Flores', number: '123', neighborhood: 'Centro', city: 'São Paulo', state: 'SP', zipCode: '01310-000', lat: -23.55, lng: -46.63 },
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800', alt: 'Fachada da casa', isPrimary: true },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800', alt: 'Sala de estar', isPrimary: false },
    ],
    features: ['Piscina', 'Área gourmet', 'Churrasqueira', 'Jardim'],
    status: 'active', highlight: true, badge: 'DESTAQUE',
    createdAt: '2024-01-15T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2', slug: 'apartamento-2-quartos-vila-nova',
    title: 'Apartamento 2 Quartos — Vila Nova',
    description: 'Apartamento moderno com varanda gourmet, 2 quartos com armários planejados e 1 vaga de garagem. Condomínio com academia e playground.',
    type: 'apartamento', purpose: 'venda', price: 380000, area: 75,
    bedrooms: 2, bathrooms: 1, garages: 1,
    address: { street: 'Av. Principal', number: '500', neighborhood: 'Vila Nova', city: 'São Paulo', state: 'SP', zipCode: '04100-000', lat: -23.57, lng: -46.64 },
    images: [
      { id: 'i3', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', alt: 'Sala do apartamento', isPrimary: true },
    ],
    features: ['Academia', 'Playground', 'Portaria 24h'],
    status: 'active', highlight: true, badge: 'NOVO',
    createdAt: '2024-02-10T00:00:00Z', updatedAt: '2024-02-10T00:00:00Z',
  },
  {
    id: '3', slug: 'apartamento-aluguel-jardins',
    title: 'Apartamento para Alugar — Jardins',
    description: 'Amplo apartamento de 3 dormitórios para alugar nos Jardins. Totalmente reformado, andar alto, vista livre.',
    type: 'apartamento', purpose: 'aluguel', price: 4500, area: 110,
    bedrooms: 3, bathrooms: 2, garages: 1,
    address: { street: 'Rua Pamplona', number: '200', neighborhood: 'Jardins', city: 'São Paulo', state: 'SP', zipCode: '01405-100', lat: -23.56, lng: -46.66 },
    images: [
      { id: 'i4', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', alt: 'Sala de estar', isPrimary: true },
    ],
    features: ['Vista livre', 'Ar-condicionado', 'Portaria 24h', 'Piscina'],
    status: 'active', highlight: false, badge: 'OPORTUNIDADE',
    createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z',
  },
]

// ─── Implementation ───────────────────────────────────────────────────────────
export class PropertyService implements IPropertyService {
  private readonly properties: Property[]

  constructor(properties = MOCK_PROPERTIES) {
    this.properties = properties
  }

  async list(filter: PropertyFilter): Promise<PaginatedResult<Property>> {
    let results = [...this.properties]

    if (filter.type && filter.type !== 'all')
      results = results.filter(p => p.type === filter.type)

    if (filter.purpose && filter.purpose !== 'all')
      results = results.filter(p => p.purpose === filter.purpose)

    if (filter.priceMin !== undefined)
      results = results.filter(p => p.price >= filter.priceMin!)

    if (filter.priceMax !== undefined)
      results = results.filter(p => p.price <= filter.priceMax!)

    if (filter.areaMin !== undefined)
      results = results.filter(p => p.area >= filter.areaMin!)

    if (filter.bedrooms !== undefined && filter.bedrooms > 0)
      results = results.filter(p => p.bedrooms >= filter.bedrooms!)

    if (filter.neighborhood)
      results = results.filter(p =>
        p.address.neighborhood.toLowerCase().includes(filter.neighborhood!.toLowerCase())
      )

    // Sorting
    if (filter.sortBy === 'price_asc')  results.sort((a, b) => a.price - b.price)
    if (filter.sortBy === 'price_desc') results.sort((a, b) => b.price - a.price)
    if (filter.sortBy === 'area_desc')  results.sort((a, b) => b.area - a.area)
    if (!filter.sortBy || filter.sortBy === 'newest')
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const page  = filter.page  ?? 1
    const limit = filter.limit ?? 12
    const total = results.length
    const start = (page - 1) * limit

    return {
      data: results.slice(start, start + limit),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }

  async getBySlug(slug: string): Promise<Property | null> {
    return this.properties.find(p => p.slug === slug) ?? null
  }

  async getFeatured(limit = 6): Promise<Property[]> {
    return this.properties
      .filter(p => p.highlight && p.status === 'active')
      .slice(0, limit)
  }
}

export const propertyService = new PropertyService()
