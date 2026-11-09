import Image from 'next/image'
import Link from 'next/link'
import type { Property } from '@/types'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function PropertyCard({ property }: { property: Property }) {
  const image = property.images[0]

  return (
    <article className="card group overflow-hidden">
      <Link href={`/imoveis/${property.slug}`} className="block">
        <div className="relative h-56 bg-gray-100">
          {image && (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {property.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-blue">
              {property.badge}
            </span>
          )}
        </div>
        <div className="space-y-2 p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {property.address.neighborhood} · {property.address.city}
          </p>
          <h3 className="font-display text-lg font-semibold text-brand-dark group-hover:text-brand-blue">
            {property.title}
          </h3>
          <p className="font-display text-xl font-bold text-brand-dark">
            {currency.format(property.price)}
            {property.purpose === 'aluguel' && <span className="text-sm font-normal text-gray-500">/mês</span>}
          </p>
          <p className="text-sm text-gray-500">
            {property.bedrooms} quartos · {property.area} m² · {property.garages} vagas
          </p>
        </div>
      </Link>
    </article>
  )
}
