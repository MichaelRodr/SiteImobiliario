import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { crmService } from '@/services/crm'

const LeadSchema = z.object({
  name:         z.string().min(2),
  whatsapp:     z.string().min(10),
  intent:       z.enum(['buy','rent','announce','broker']),
  propertyType: z.string().optional(),
  priceRange:   z.string().optional(),
  neighborhood: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = LeadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Dados inválidos.' }, { status: 400 })
    }

    // 1. Save to CRM
    await crmService.saveLead(parsed.data as any)

    // 2. Send WhatsApp notification to the team via WhatsApp Business API
    // Replace with your actual WA Business API provider (Twilio / Z-API / Evolution API)
    const waBusinessUrl  = process.env.WA_BUSINESS_API_URL
    const waBusinessKey  = process.env.WA_BUSINESS_API_KEY
    const notifyNumber   = process.env.WA_NOTIFY_NUMBER

    if (waBusinessUrl && waBusinessKey && notifyNumber) {
      const intentMap = { buy:'comprar', rent:'alugar', announce:'anunciar', broker:'corretor' }
      const notifMsg = `🏠 *Novo lead — Mendes & Favaro*\n\nNome: ${parsed.data.name}\nWhatsApp: ${parsed.data.whatsapp}\nIntenção: ${intentMap[parsed.data.intent]}\nTipo: ${parsed.data.propertyType ?? '—'}\nFaixa: ${parsed.data.priceRange ?? '—'}\nBairro: ${parsed.data.neighborhood ?? '—'}`

      await fetch(waBusinessUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${waBusinessKey}` },
        body: JSON.stringify({ to: notifyNumber, message: notifMsg }),
      }).catch(e => console.error('[WA notify]', e))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[chatbot lead API]', err)
    return NextResponse.json({ success: false, error: 'Erro interno.' }, { status: 500 })
  }
}
