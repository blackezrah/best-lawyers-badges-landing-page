import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/*
  BrandMark
  ─────────
  Refined text wordmark used in the header and footer.

  DEVELOPER NOTE: If an official Best Lawyers brand asset (SVG/PNG) is
  supplied, replace the wordmark below with that exact asset. Do NOT
  recreate or fabricate the trademarked badge/logo. This wordmark is a
  neutral typographic stand-in, not counterfeit mark artwork.
*/
export function BrandMark({
  tone = 'dark',
  className,
  showDescriptor = true,
}: {
  tone?: 'dark' | 'light'
  className?: string
  showDescriptor?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex flex-col leading-none',
        tone === 'light' ? 'text-bl-white' : 'text-bl-charcoal',
        className,
      )}
      aria-label="Best Lawyers"
    >
      <span className="font-serif text-lg font-semibold tracking-tight">
        Best Lawyers
      </span>
      {showDescriptor && (
        <span
          className={cn(
            'mt-1 text-[0.6rem] font-medium uppercase tracking-[0.28em]',
            tone === 'light' ? 'text-bl-gold' : 'text-bl-gold-on-light',
          )}
        >
          Recognition Assets
        </span>
      )}
    </span>
  )
}

export function Eyebrow({
  children,
  tone = 'dark',
  className,
}: {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <p
      className={cn(
        'text-xs font-semibold uppercase tracking-[0.22em]',
        tone === 'light' ? 'text-bl-gold' : 'text-bl-gold-on-light',
        className,
      )}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  children,
  tone = 'dark',
  className,
}: {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <h2
      className={cn(
        'font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl',
        tone === 'light' ? 'text-bl-white' : 'text-bl-charcoal',
        className,
      )}
    >
      {children}
    </h2>
  )
}
