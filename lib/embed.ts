/*
  Shared message contracts and configuration for the cross-origin
  iframe bridge between the Vercel-hosted embed document (child) and
  the Instapage campaign page (parent).

  IMPORTANT: Never place PII (names, emails, phone numbers, free-text
  form content) into any postMessage payload.
*/

// The parent origin we send messages to. Configure via env for production.
// NEXT_PUBLIC_ so it is available in the browser bundle.
// Example: NEXT_PUBLIC_PARENT_TARGET_ORIGIN="https://pages.instapage.com"
export const PARENT_TARGET_ORIGIN =
  process.env.NEXT_PUBLIC_PARENT_TARGET_ORIGIN ?? '*'
// NOTE: '*' is a development fallback only. Set NEXT_PUBLIC_PARENT_TARGET_ORIGIN
// to the confirmed Instapage origin before production so height/analytics
// messages are only delivered to the approved parent.

// ── Height message contract ──────────────────────────────────────
export const HEIGHT_MESSAGE_TYPE = 'BEST_LAWYERS_IFRAME_HEIGHT' as const

export interface HeightMessage {
  type: typeof HEIGHT_MESSAGE_TYPE
  height: number
}

// ── Analytics event contract ─────────────────────────────────────
export const EMBED_EVENT_TYPE = 'BEST_LAWYERS_EMBED_EVENT' as const

export type EmbedEventName =
  | 'cta_click'
  | 'form_start'
  | 'form_validation_error'
  | 'form_submit'
  | 'form_success'

export interface EmbedEventData {
  location?: string
  option?: string
}

export interface EmbedEventMessage {
  type: typeof EMBED_EVENT_TYPE
  eventName: EmbedEventName
  eventData: EmbedEventData
}

/**
 * Post a privacy-safe conversion event to the Instapage parent.
 * Only structured, non-PII metadata (location + option) is transmitted.
 */
export function trackEmbedEvent(
  eventName: EmbedEventName,
  eventData: EmbedEventData = {},
) {
  if (typeof window === 'undefined') return
  // Only meaningful when actually embedded in a parent frame.
  if (window.parent === window) {
    // Standalone/QA mode — log for local debugging instead of posting.
    console.log('[v0] embed event (standalone):', eventName, eventData)
    return
  }
  const message: EmbedEventMessage = {
    type: EMBED_EVENT_TYPE,
    eventName,
    // Defensive: strip anything that is not the two allowed keys.
    eventData: {
      location: eventData.location,
      option: eventData.option,
    },
  }
  window.parent.postMessage(message, PARENT_TARGET_ORIGIN)
}
