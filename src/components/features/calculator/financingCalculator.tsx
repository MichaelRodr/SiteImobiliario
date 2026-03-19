'use client'

import { useState, useMemo } from 'react'
import { calculateFinancing, formatCurrency } from '@/lib/financing'
import { SITE_CONFIG } from '@/lib/config'
import { whatsAppService } from '@/services/whatsapp'

interface FinancingCalculatorProps {
  defaultValue?: number
}

export function FinancingCalculator({ defaultValue = 500000 }: FinancingCalculatorProps) {
  const [propertyValue,       setPropertyValue]       = useState(defaultValue)
  const [downPaymentPercent,  setDownPaymentPercent]  = useState(SITE_CONFIG.financing.defaultDownPct)
  const [termMonths,          setTermMonths]          = useState(SITE_CONFIG.financing.defaultTerm)
  const [annualRate,          setAnnualRate]          = useState(SITE_CONFIG.financing.defaultRate)

  const result = useMemo(
    () => calculateFinancing({ propertyValue, downPaymentPercent, termMonths, annualRate }),
    [propertyValue, downPaymentPercent, termMonths, annualRate]
  )

  const waMsg = `Olá! Calculei uma simulação no site: imóvel de ${formatCurrency(propertyValue)}, entrada de ${downPaymentPercent}% (${formatCurrency(result.downPayment)}), ${termMonths} meses. Parcela: ${formatCurrency(result.monthlyPayment)}/mês. Gostaria de mais informações.`

  return (
    <section
      id="calculadora"
      aria-labelledby="calc-heading"
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8"
    >
      <h2 id="calc-heading" className="heading-md text-brand-dark mb-1">
        Calculadora de Financiamento
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Simule o financiamento do seu imóvel em tempo real. Valores aproximados.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

        {/* Inputs */}
        <div className="space-y-5">
          <SliderField
            id="prop-value"
            label="Valor do imóvel"
            value={propertyValue}
            min={100000}
            max={5000000}
            step={10000}
            format={formatCurrency}
            onChange={setPropertyValue}
          />
          <SliderField
            id="down-pct"
            label={`Entrada — ${downPaymentPercent}% (${formatCurrency(result.downPayment)})`}
            value={downPaymentPercent}
            min={0}
            max={90}
            step={1}
            format={v => `${v}%`}
            onChange={setDownPaymentPercent}
          />
          <SliderField
            id="term"
            label={`Prazo — ${termMonths} meses (${Math.round(termMonths/12)} anos)`}
            value={termMonths}
            min={60}
            max={420}
            step={12}
            format={v => `${v} meses`}
            onChange={setTermMonths}
          />
          <div>
            <label htmlFor="rate" className="block text-sm font-semibold text-gray-600 mb-1.5">
              Taxa de juros anual — {annualRate.toFixed(1)}% a.a.
            </label>
            <input
              id="rate"
              type="number"
              value={annualRate}
              onChange={e => setAnnualRate(Math.max(0.1, Number(e.target.value)))}
              className="form-input w-32"
              min={0.1}
              max={30}
              step={0.1}
              aria-label="Taxa de juros anual"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          <div
            className="rounded-xl p-5 text-white"
            style={{ background: 'linear-gradient(135deg, #162a35, #4280a1)' }}
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-white/70 text-xs mb-1">Parcela mensal estimada</p>
            <p className="font-display font-bold text-3xl">
              {formatCurrency(result.monthlyPayment)}
              <span className="text-base font-normal text-white/70">/mês</span>
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-3">
            <ResultCard label="Valor do financiamento" value={formatCurrency(result.loanAmount)} />
            <ResultCard label="Entrada"                value={formatCurrency(result.downPayment)} />
            <ResultCard label="Total pago"             value={formatCurrency(result.totalPaid)} />
            <ResultCard label="Total em juros"         value={formatCurrency(result.totalInterest)} accent />
          </dl>

          <p className="text-xs text-gray-400 leading-relaxed">
            * Simulação pelo sistema Price (parcelas fixas). Sujeito a aprovação de crédito.
            Não inclui seguros obrigatórios (MIP e DFI).
          </p>

          <a
            href={whatsAppService.buildLink(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center mt-auto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Enviar simulação por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

function SliderField({
  id, label, value, min, max, step, format, onChange,
}: {
  id: string; label: string; value: number; min: number; max: number; step: number
  format: (v: number) => string; onChange: (v: number) => void
}) {
  const pct = Math.round(((value - min) / (max - min)) * 100)
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-600 mb-1.5">{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to right, #4280a1 ${pct}%, #e5e7eb ${pct}%)` }}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={format(value)}
      />
    </div>
  )
}

function ResultCard({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-3 ${accent ? 'bg-amber-50' : 'bg-gray-50'}`}>
      <dt className="text-xs text-gray-500 mb-0.5">{label}</dt>
      <dd className={`font-semibold text-sm ${accent ? 'text-amber-700' : 'text-brand-dark'}`}>{value}</dd>
    </div>
  )
}
