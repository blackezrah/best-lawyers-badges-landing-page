import { SectionHeading } from './primitives'
import { VALUE_MODULES } from '@/lib/content'

export function ValueSection() {
  return (
    <section id="benefits" data-motion-scene="value" className="scroll-mt-8 bg-bl-off-white motion-value">
      <div className="motion-value-stage mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Intro column */}
        <div className="motion-value-intro">
          <div className="motion-value-heading">
            <SectionHeading>
              The recognition is already earned. Licensing helps make it visible.
            </SectionHeading>
          </div>
          <p className="motion-value-copy mt-6 max-w-md text-base leading-relaxed text-bl-blue-gray">
            A Best Lawyers recognition carries more value when clients, referral
            sources, recruits, and peers can identify it quickly. Official
            badges and logos give eligible lawyers and firms a polished,
            authorized way to present that distinction across the channels where
            credibility matters.
          </p>
        </div>

        {/* Asymmetric benefit modules */}
        <div className="grid gap-6 sm:grid-cols-2 motion-value-grid">
          {VALUE_MODULES.map((mod) => (
            <article
              key={mod.index}
              className="flex flex-col rounded-lg border border-bl-light-gray/80 bg-bl-white p-8 shadow-[0_24px_58px_-46px_rgba(35,42,50,0.62)] transition-colors hover:bg-bl-off-white motion-value-card"
            >
              <h3 className="font-serif text-xl font-semibold leading-snug text-bl-gold-on-light text-pretty">
                {mod.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-bl-blue-gray">
                {mod.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
