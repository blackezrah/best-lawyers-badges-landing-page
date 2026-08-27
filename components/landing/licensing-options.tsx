import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './primitives'
import { CtaButton } from './cta-button'
import { LICENSING_OPTIONS, FORM_ANCHOR } from '@/lib/content'

export function LicensingOptions() {
  return (
    <section data-motion-scene="options" className="bg-bl-white motion-options">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="max-w-3xl motion-options-intro">
          <SectionHeading>
            Select the path that matches how your organization plans to use the
            recognition.
          </SectionHeading>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 motion-options-grid">
          {LICENSING_OPTIONS.map((opt) => (
            <article
              key={opt.id}
              className="group flex flex-col rounded-lg border border-bl-light-gray bg-bl-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-bl-gold-on-light/60 hover:shadow-[0_24px_60px_-34px_rgba(26,31,37,0.5)] motion-options-card"
            >
              <h3 className="font-serif text-xl font-semibold leading-snug text-bl-gold-on-light text-pretty transition-colors duration-300 group-hover:text-bl-gold">
                {opt.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-bl-blue-gray">
                {opt.body}
              </p>
              <div className="mt-6">
                <CtaButton
                  href={FORM_ANCHOR}
                  location={`options_${opt.id}`}
                  preselect={opt.interest}
                  variant="secondary"
                  className="w-full border-bl-gold-on-light bg-bl-gold-on-light text-bl-white group-hover:border-bl-charcoal group-hover:bg-bl-charcoal hover:border-bl-charcoal hover:bg-bl-charcoal"
                >
                  {opt.cta}
                  <ArrowRight
                    className="size-4"
                    aria-hidden="true"
                  />
                </CtaButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
