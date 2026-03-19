'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { trackFBEvent, trackGA4Event } from '@/lib/analytics'

const Schema = z.object({
  name:          z.string().min(2, 'Nome muito curto'),
  email:         z.string().email('E-mail inválido'),
  phone:         z.string().min(10, 'Telefone inválido'),
  message:       z.string().min(10, 'Mensagem muito curta').max(1000),
  acceptPrivacy: z.literal(true, { errorMap: () => ({ message: 'Aceite a política de privacidade' }) }),
})

type FormData = z.infer<typeof Schema>

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(Schema),
  })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
      trackFBEvent('Contact')
      trackGA4Event('contact_form_submit')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center" role="alert">
        <span className="text-4xl block mb-3" aria-hidden>✅</span>
        <h3 className="font-display font-semibold text-lg text-green-800 mb-2">Mensagem enviada!</h3>
        <p className="text-green-700 text-sm">Entraremos em contato em até 24 horas úteis.</p>
        <button onClick={() => setStatus('idle')} className="btn-primary mt-4 !bg-green-600 hover:!bg-green-700">
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Formulário de contato"
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="name" label="Nome completo *" error={errors.name?.message}>
          <input id="name" type="text" autoComplete="name" {...register('name')}
            className="form-input" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} />
        </Field>
        <Field id="email" label="E-mail *" error={errors.email?.message}>
          <input id="email" type="email" autoComplete="email" {...register('email')}
            className="form-input" aria-invalid={!!errors.email} />
        </Field>
      </div>

      <Field id="phone" label="Telefone / WhatsApp *" error={errors.phone?.message}>
        <input id="phone" type="tel" autoComplete="tel" {...register('phone')}
          placeholder="(11) 99999-9999"
          className="form-input" aria-invalid={!!errors.phone} />
      </Field>

      <Field id="message" label="Mensagem *" error={errors.message?.message}>
        <textarea id="message" rows={5} {...register('message')}
          placeholder="Descreva o que você procura ou precisa..."
          className="form-input resize-none" aria-invalid={!!errors.message} />
      </Field>

      <div className="flex items-start gap-3">
        <input type="checkbox" id="privacy" {...register('acceptPrivacy')} className="mt-1 accent-brand-blue w-4 h-4" />
        <label htmlFor="privacy" className="text-sm text-gray-600 leading-relaxed">
          Li e aceito a{' '}
          <a href="/privacidade" target="_blank" className="text-brand-blue underline hover:no-underline">
            Política de Privacidade
          </a>{' '}
          e concordo que meus dados sejam utilizados para contato. *
        </label>
      </div>
      {errors.acceptPrivacy && (
        <p className="text-red-500 text-xs" role="alert">{errors.acceptPrivacy.message}</p>
      )}

      {status === 'error' && (
        <p className="text-red-600 text-sm bg-red-50 rounded-lg p-3" role="alert">
          Ocorreu um erro ao enviar. Por favor, tente novamente.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? (
          <><span className="animate-spin inline-block">⏳</span> Enviando...</>
        ) : (
          'Enviar mensagem'
        )}
      </button>

      <p className="text-xs text-gray-400">* Campos obrigatórios. Seus dados são protegidos conforme a LGPD.</p>
    </form>
  )
}

function Field({ id, label, error, children }: {
  id: string; label: string; error?: string; children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="text-red-500 text-xs mt-1" role="alert">{error}</p>}
    </div>
  )
}
