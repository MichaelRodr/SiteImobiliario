import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { crmService } from '@/services/crm'

const ContactSchema = z.object({
  name:          z.string().min(2),
  email:         z.string().email(),
  phone:         z.string().min(10),
  message:       z.string().min(10).max(1000),
  acceptPrivacy: z.literal(true),
})

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Dados inválidos.' }, { status: 400 })
    }

    // Save lead to CRM (Google Sheets / HubSpot)
    await crmService.saveLead(parsed.data as any)

    // Send email notification (plug in Resend / Nodemailer here)
    // await emailService.sendContactNotification(parsed.data)

    return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso.' })
  } catch (err) {
    console.error('[contact API]', err)
    return NextResponse.json({ success: false, error: 'Erro interno.' }, { status: 500 })
  }
}
