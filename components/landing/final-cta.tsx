import { CtaButton } from './cta-button'
import { PRIMARY_CTA, FORM_ANCHOR } from '@/lib/content'

export function FinalCTA() {
  return (
    <section data-motion-scene="final" className="bg-bl-off-white motion-final">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="relative overflow-hidden rounded-xl border border-bl-gold/30 bg-gradient-to-b from-bl-white to-bl-off-white px-6 py-20 text-center sm:px-12 motion-final-card">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 motion-final-light"
            style={{
              background:
                'radial-gradient(50% 60% at 50% 0%, rgba(201,163,91,0.12), transparent 70%)',
            }}
          />
          <div className="relative mx-auto max-w-2xl motion-final-content">
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-balance text-bl-charcoal sm:text-4xl">
              Use the mark with the authority it deserves.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-bl-blue-gray">
              Request the appropriate licensing option for your recognition,
              intended channels, and organization.
            </p>

            <div className="mt-8 flex flex-col items-center gap-8">
              <CtaButton
                href={FORM_ANCHOR}
                location="final_cta"
                variant="primary"
              >
                {PRIMARY_CTA}
              </CtaButton>
              <p className="font-serif text-xl font-semibold leading-snug text-bl-gold-on-light text-pretty sm:text-2xl">
                Make the Recognition Visible
              </p>
            </div>

            <div className="mt-8">
              <CtaButton
                href="#guidelines"
                location="final_cta_secondary"
                variant="ghost"
              >
                Review Usage Guidelines
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
