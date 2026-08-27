'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BrandMark } from './primitives'
import { CtaButton } from './cta-button'
import { NAV_LINKS, PRIMARY_CTA, FORM_ANCHOR } from '@/lib/content'
import { trackEmbedEvent } from '@/lib/embed'
import { cn } from '@/lib/utils'

/**
 * SiteHeader — stays in normal document flow (no fixed/sticky in embed
 * mode) so it never anchors to the iframe viewport. A subtle bottom
 * border provides surface distinction from the start.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Focus management + Escape handling for the mobile menu.
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus()
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false)
          toggleRef.current?.focus()
        }
      }
      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault()
    setOpen(false)
    const target = document.getElementById(href.slice(1))
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="relative z-30 w-full border-b border-bl-light-gray bg-bl-white/95 backdrop-blur-sm motion-site-header">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a
          href="#top"
          onClick={(e) => handleNav(e, '#top')}
          className="shrink-0"
        >
          <BrandMark showDescriptor={false} />
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-sm font-medium text-bl-blue-gray transition-colors hover:text-bl-charcoal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CtaButton href={FORM_ANCHOR} location="header" variant="primary">
            {PRIMARY_CTA}
          </CtaButton>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-bl-charcoal lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu — normal flow, expands document height (reporter picks it up) */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className={cn(
          'border-t border-bl-light-gray bg-bl-white lg:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 py-3 sm:px-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="border-b border-bl-light-gray/70 py-3 text-sm font-medium text-bl-blue-gray transition-colors last:border-0 hover:text-bl-charcoal"
            >
              {link.label}
            </a>
          ))}
          <div className="py-4">
            <a
              href={FORM_ANCHOR}
              onClick={(e) => {
                trackEmbedEvent('cta_click', { location: 'header_mobile' })
                handleNav(e, FORM_ANCHOR)
              }}
              className="inline-flex w-full items-center justify-center rounded-md bg-bl-gold px-6 py-3 text-sm font-medium text-bl-charcoal transition-colors hover:bg-bl-gold-on-light hover:text-bl-white"
            >
              {PRIMARY_CTA}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
