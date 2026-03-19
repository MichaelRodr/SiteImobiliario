// ─── Domain Types ──────────────────────────────────────────────────────────

export interface Property {
  id: string
  slug: string
  title: string
  description: string
  type: PropertyType
  purpose: PropertyPurpose
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  garages: number
  address: Address
  images: PropertyImage[]
  features: string[]
  status: 'active' | 'sold' | 'rented'
  highlight: boolean
  badge?: 'DESTAQUE' | 'NOVO' | 'OPORTUNIDADE'
  createdAt: string
  updatedAt: string
}

export type PropertyType = 'casa' | 'apartamento' | 'terreno' | 'comercial' | 'rural'
export type PropertyPurpose = 'venda' | 'aluguel'

export interface Address {
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  lat?: number
  lng?: number
}

export interface PropertyImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

// ─── Filter Types ───────────────────────────────────────────────────────────

export interface PropertyFilter {
  type?: PropertyType | 'all'
  purpose?: PropertyPurpose | 'all'
  priceMin?: number
  priceMax?: number
  areaMin?: number
  areaMax?: number
  bedrooms?: number
  bathrooms?: number
  garages?: number
  neighborhood?: string
  features?: string[]
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'area_desc'
  page?: number
  limit?: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
}

// ─── Form / Lead Types ──────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  propertyId?: string
  acceptPrivacy: boolean
}

export interface ChatLead {
  name: string
  whatsapp: string
  intent: ChatIntent
  propertyType?: PropertyType
  priceRange?: string
  neighborhood?: string
  propertyId?: string
}

export type ChatIntent = 'buy' | 'rent' | 'announce' | 'broker'

// ─── Blog Types ─────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  author: Author
  category: string
  tags: string[]
  publishedAt: string
  readingTime: number
}

export interface Author {
  name: string
  avatar: string
  role: string
}

// ─── API Response ───────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// ─── Financing Calculator ────────────────────────────────────────────────────

export interface FinancingParams {
  propertyValue: number
  downPaymentPercent: number
  termMonths: number
  annualRate: number
}

export interface FinancingResult {
  monthlyPayment: number
  totalPaid: number
  totalInterest: number
  loanAmount: number
  downPayment: number
}
