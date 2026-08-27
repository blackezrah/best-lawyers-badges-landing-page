'use client'

import { useEffect } from 'react'
import {
  HEIGHT_MESSAGE_TYPE,
  PARENT_TARGET_ORIGIN,
  type HeightMessage,
} from '@/lib/embed'

/**
 * IframeHeightReporter
 * ────────────────────
 * Measures the full document height and reports it to the Instapage
 * parent via postMessage so the parent can size the iframe with no
 * nested scrolling. Recalculates on:
 *   - window.load
 *   - window resize
 *   - document.fonts.ready (Optima/Gentleman finish loading)
 *   - any layout change (ResizeObserver + MutationObserver:
 *     accordions, form validation, success states, revealed content)
 *
 * Measurements are debounced. No PII is ever transmitted.
 */
export function IframeHeightReporter() {
  useEffect(() => {
    // Only run when embedded (parent !== self). In standalone QA the
    // reporter is a harmless no-op beyond a single log.
    const isEmbedded = window.parent !== window

    let lastHeight = 0
    let frame = 0
    let debounce: ReturnType<typeof setTimeout> | undefined

    const measure = () => {
      const doc = document.documentElement
      const body = document.body
      // Full rendered height, resilient to margin collapsing.
      const height = Math.max(
        doc.scrollHeight,
        doc.offsetHeight,
        body?.scrollHeight ?? 0,
        body?.offsetHeight ?? 0,
      )
      if (!Number.isFinite(height) || height <= 0) return
      // Avoid chatty messages for sub-pixel jitter.
      if (Math.abs(height - lastHeight) < 2) return
      lastHeight = height

      if (!isEmbedded) {
        return
      }
      const message: HeightMessage = {
        type: HEIGHT_MESSAGE_TYPE,
        height: Math.ceil(height),
      }
      window.parent.postMessage(message, PARENT_TARGET_ORIGIN)
    }

    const scheduleMeasure = () => {
      cancelAnimationFrame(frame)
      if (debounce) clearTimeout(debounce)
      // rAF settles layout, timeout debounces bursts.
      frame = requestAnimationFrame(() => {
        debounce = setTimeout(measure, 80)
      })
    }

    // Initial + post-load measurements
    scheduleMeasure()
    window.addEventListener('load', scheduleMeasure)
    window.addEventListener('resize', scheduleMeasure)

    // Recalculate once webfonts settle to avoid layout-shift mismatch.
    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleMeasure).catch(() => {})
    }

    // Observe size changes of the whole document body.
    const resizeObserver = new ResizeObserver(scheduleMeasure)
    resizeObserver.observe(document.body)

    // Observe DOM changes: accordions opening, errors/success appearing.
    const mutationObserver = new MutationObserver(scheduleMeasure)
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'hidden', 'aria-expanded', 'data-state'],
    })

    // Allow imperative recalculation from anywhere in the app.
    const onManual = () => scheduleMeasure()
    window.addEventListener('bl:remeasure', onManual)

    return () => {
      cancelAnimationFrame(frame)
      if (debounce) clearTimeout(debounce)
      window.removeEventListener('load', scheduleMeasure)
      window.removeEventListener('resize', scheduleMeasure)
      window.removeEventListener('bl:remeasure', onManual)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}

/** Fire an imperative remeasure (e.g. after an animated reveal completes). */
export function requestRemeasure() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('bl:remeasure'))
  }
}
