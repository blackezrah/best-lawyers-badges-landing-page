'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { trackEmbedEvent } from '@/lib/embed'

type Variant = 'primary' | 'secondary' | 'ghost'

interface CtaButtonProps {
  children: ReactNode
  href: string
  variant?: Variant
  /** Analytics location label (non-PII), e.g. "hero", "final_cta". */
  location: string
  /** Optional licensing option to preselect in the inquiry form. */
  preselect?: string
  className?: string
  ariaLabel?: string
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bl-gold-on-light disabled:opacity-60'

const variants: Record<Variant, string> = {
  // Premium gold CTA with charcoal text per contrast guidance.
  primary:
    'bg-bl-gold text-bl-charcoal px-6 py-3 shadow-sm hover:bg-bl-gold-on-light hover:text-bl-white hover:shadow-md',
  secondary:
    'border border-bl-charcoal/25 bg-transparent text-bl-charcoal px-6 py-3 hover:border-bl-charcoal hover:bg-bl-charcoal hover:text-bl-white',
  ghost:
    'text-bl-charcoal underline-offset-4 hover:text-bl-gold-on-light hover:underline px-1 py-1',
}

/**
 * In-page CTA. Smooth-scrolls to a target anchor WITHIN the embedded
 * document (never navigates the parent), fires a privacy-safe
 * cta_click analytics event, and optionally preselects a licensing
 * option in the inquiry form.
 */
export function CtaButton({
  children,
  href,
  variant = 'primary',
  location,
  preselect,
  className,
  ariaLabel,
}: CtaButtonProps) {
  const isAnchor = href.startsWith('#')

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEmbedEvent('cta_click', {
      location,
      option: preselect,
    })

    if (isAnchor) {
      e.preventDefault()
      const id = href.slice(1)
      const target = document.getElementById(id)
      if (preselect) {
        window.dispatchEvent(
          new CustomEvent('bl:preselect-interest', { detail: preselect }),
        )
      }
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Move focus for keyboard users without a visual jump.
      target?.setAttribute('tabindex', '-1')
      ;(target as HTMLElement | null)?.focus?.({ preventScroll: true })
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </a>
  )
}
