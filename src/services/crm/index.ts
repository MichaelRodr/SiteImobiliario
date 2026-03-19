import type { ChatLead, ContactFormData } from '@/types'

// ─── Interface (Dependency Inversion) ────────────────────────────────────────
export interface ICRMService {
  saveLead(lead: ChatLead | ContactFormData): Promise<void>
}

/**
 * Google Sheets CRM adapter.
 * Swap this for HubSpot / RD Station without touching consumers.
 */
export class GoogleSheetsCRMService implements ICRMService {
  private readonly webhookUrl: string

  constructor(webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK ?? '') {
    this.webhookUrl = webhookUrl
  }

  async saveLead(lead: ChatLead | ContactFormData): Promise<void> {
    if (!this.webhookUrl) {
      console.warn('[CRM] GOOGLE_SHEETS_WEBHOOK not set — lead not saved.')
      return
    }
    await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, savedAt: new Date().toISOString(), source: 'website' }),
    })
  }
}

export const crmService = new GoogleSheetsCRMService()
