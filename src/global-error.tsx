'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to error tracking (Sentry, etc.)
    console.error('[Global Error]', error)
  }, [error])

  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4" aria-hidden>⚠️</p>
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">Algo deu errado</h1>
          <p className="text-gray-500 mb-8">
            Ocorreu um erro inesperado. Nossa equipe já foi notificada.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
            >
              Tentar novamente
            </button>
            <a
              href="/"
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Voltar ao início
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
