import { SectionHeading } from './primitives'
import { LICENSING_STEPS } from '@/lib/content'

export function LicensingProcess() {
  return (
    <section id="how-it-works" data-motion-scene="process" className="scroll-mt-8 bg-bl-off-white motion-process">
      <div className="motion-process-stage mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl motion-process-intro">
          <SectionHeading>
            From recognition to publication in four steps.
          </SectionHeading>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4 motion-process-grid">
          {LICENSING_STEPS.map((step) => (
            <article
              key={step.index}
              className="flex flex-col rounded-lg border border-bl-light-gray/80 bg-bl-white p-8 shadow-[0_24px_58px_-46px_rgba(35,42,50,0.62)] motion-process-card"
            >
              <span
                aria-hidden="true"
                className="block h-px w-10 bg-bl-gold-on-light"
              />
              <h3 className="mt-5 font-serif text-lg font-semibold leading-snug text-bl-gold-on-light text-pretty">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-bl-blue-gray">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
