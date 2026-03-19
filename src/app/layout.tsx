import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import { GTMScript, GTMNoScript, FBPixelScript } from '@/lib/analytics'
import { buildRealEstateAgentSchema, JsonLd } from '@/lib/schema'
import { generatePageMetadata } from '@/lib/seo/metadata'
import '@/styles/globals.css'

const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const fontBody = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = generatePageMetadata({})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <head>
        <GTMScript />
        <FBPixelScript />
        <JsonLd schema={buildRealEstateAgentSchema()} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#162a35" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="font-body bg-gray-50 text-brand-dark">
        <GTMNoScript />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-lg"
        >
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  )
}
