'use client'

import Script from 'next/script'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    fbq?: (...args: unknown[]) => void
  }
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID
const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL

export function GTMScript() {
  if (!gtmId || gtmId.includes('X')) return null
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  )
}

export function GTMNoScript() {
  if (!gtmId || gtmId.includes('X')) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}

export function FBPixelScript() {
  if (!pixelId || pixelId.includes('X')) return null
  return (
    <Script id="facebook-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
    </Script>
  )
}

export function trackFBEvent(event: string) {
  if (typeof window !== 'undefined') window.fbq?.('track', event)
}

export function trackGA4Event(event: string, parameters: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event, ...parameters })
  }
}

export function trackPropertyView(propertyId: string) {
  trackGA4Event('view_property', { property_id: propertyId })
}
