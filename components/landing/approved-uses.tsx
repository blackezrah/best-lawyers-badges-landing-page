import { SectionHeading } from './primitives'
import { CtaButton } from './cta-button'
import { APPROVED_USES, FORM_ANCHOR } from '@/lib/content'

export function ApprovedUses() {
  return (
    <section id="approved-uses" data-motion-scene="uses" className="relative z-[1] scroll-mt-8 bg-bl-white motion-uses">
      <div className="mx-auto w-full max-w-6xl px-5 py-32 sm:px-8 sm:py-44 lg:py-52">
        <div className="max-w-2xl motion-uses-intro">
          <SectionHeading>
            One recognition. Multiple high-value touchpoints.
          </SectionHeading>
          <p className="mt-8 font-serif text-xl font-semibold leading-snug text-bl-gold-on-light text-pretty sm:text-2xl">
            Where Licensed Assets Can Appear
          </p>
          <p className="mt-6 text-base leading-relaxed text-bl-blue-gray">
            Licensed Best Lawyers badges and logos may be used across approved
            digital and marketing channels when the applicable guidelines,
            required language, and licensing scope are followed.
          </p>
        </div>

        <ol className="mt-12 grid gap-x-10 gap-y-px border-t border-bl-light-gray md:grid-cols-2 motion-uses-list">
          {APPROVED_USES.map((use) => (
            <li
              key={use.title}
              className="border-b border-bl-light-gray py-6 motion-uses-item"
            >
              <div>
                <h3 className="font-serif text-lg font-semibold text-bl-gold-on-light">
                  {use.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bl-blue-gray">
                  {use.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 motion-uses-cta">
          <CtaButton
            href={FORM_ANCHOR}
            location="approved_uses"
            variant="primary"
          >
            Request the Right Licensing Scope
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
