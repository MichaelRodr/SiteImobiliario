'use client'

import type { PropertyFilter } from '@/types'

export function PropertyFilters({ initialFilter }: { initialFilter: PropertyFilter }) {
  return (
    <form action="/imoveis" className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-brand-dark">Filtrar imóveis</h2>
      <label className="block text-sm font-medium text-gray-600">
        Finalidade
        <select name="purpose" defaultValue={initialFilter.purpose ?? 'all'} className="form-input mt-1">
          <option value="all">Venda e aluguel</option>
          <option value="venda">Venda</option>
          <option value="aluguel">Aluguel</option>
        </select>
      </label>
      <label className="block text-sm font-medium text-gray-600">
        Tipo
        <select name="type" defaultValue={initialFilter.type ?? 'all'} className="form-input mt-1">
          <option value="all">Todos</option>
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
          <option value="terreno">Terreno</option>
          <option value="comercial">Comercial</option>
          <option value="rural">Rural</option>
        </select>
      </label>
      <label className="block text-sm font-medium text-gray-600">
        Bairro
        <input name="neighborhood" defaultValue={initialFilter.neighborhood} className="form-input mt-1" />
      </label>
      <label className="block text-sm font-medium text-gray-600">
        Preço mínimo
        <input name="priceMin" type="number" min="0" defaultValue={initialFilter.priceMin} className="form-input mt-1" />
      </label>
      <label className="block text-sm font-medium text-gray-600">
        Preço máximo
        <input name="priceMax" type="number" min="0" defaultValue={initialFilter.priceMax} className="form-input mt-1" />
      </label>
      <label className="block text-sm font-medium text-gray-600">
        Quartos (mínimo)
        <select name="bedrooms" defaultValue={initialFilter.bedrooms ?? 0} className="form-input mt-1">
          <option value="0">Qualquer</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </label>
      <button type="submit" className="btn-primary w-full justify-center">Buscar imóveis</button>
    </form>
  )
}
