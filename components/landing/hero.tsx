import Image from 'next/image'
import { CtaButton } from './cta-button'
import {
  PRIMARY_CTA,
  SECONDARY_CTA,
  FORM_ANCHOR,
  USES_ANCHOR,
} from '@/lib/content'

export function Hero() {
  return (
    <section
      id="top"
      data-motion-scene="hero"
      className="relative overflow-hidden bg-gradient-to-b from-bl-white to-bl-off-white motion-hero"
    >
      <div aria-hidden="true" className="motion-hero-light" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        {/* Copy column */}
        <div className="bl-reveal motion-hero-copy">
          <h1 className="font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-bl-charcoal sm:text-5xl lg:text-6xl">
            Turn earned recognition into visible authority.
          </h1>
          <p className="mt-8 font-serif text-xl font-semibold leading-snug text-bl-gold-on-light text-pretty sm:text-2xl motion-hero-support">
            Official Best Lawyers Recognition Assets
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bl-blue-gray sm:text-lg motion-hero-body">
            License official Best Lawyers badges and logos for approved use
            across your website, email, social media, and marketing materials.
            Give clients and peers a clear, credible way to see the recognition
            you have earned.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center motion-hero-actions">
            <CtaButton href={FORM_ANCHOR} location="hero" variant="primary">
              {PRIMARY_CTA}
            </CtaButton>
            <CtaButton href={USES_ANCHOR} location="hero" variant="secondary">
              {SECONDARY_CTA}
            </CtaButton>
          </div>

          <p className="mt-5 text-sm text-bl-medium-gray-1">
            Available to eligible lawyers and firms recognized in Best Lawyers
            rankings.
          </p>
        </div>

        {/* Visual column */}
        <div className="bl-reveal relative motion-hero-art" style={{ animationDelay: '120ms' }}>
          <figure className="relative">
            <div className="relative overflow-hidden rounded-lg border border-bl-light-gray bg-bl-white shadow-[0_24px_60px_-32px_rgba(26,31,37,0.35)]">
              <Image
                src="/images/hero-touchpoints.png"
                alt="An editorial arrangement of recognition touchpoints: a law firm website profile mockup, a printed business card, and a folded letterhead with an embossed neutral placeholder seal."
                width={960}
                height={960}
                priority
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
            {/* Fine gold hairline accent frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 -z-10 rounded-xl border border-bl-gold/25"
            />
            <figcaption className="mt-4 text-center text-sm font-medium tracking-wide text-bl-medium-gray-1">
              Officially licensed. Professionally presented. Built for approved
              use.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
