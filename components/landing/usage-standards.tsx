import { Check, X } from 'lucide-react'
import { SectionHeading } from './primitives'
import { USAGE_REQUIRED, USAGE_NOT_PERMITTED } from '@/lib/content'

export function UsageStandards() {
  return (
    <section
      id="guidelines"
      data-motion-scene="standards"
      className="scroll-mt-8 border-y border-bl-light-gray bg-bl-off-white motion-standards"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="max-w-2xl motion-standards-intro">
          <SectionHeading>
            Use the official mark exactly as intended.
          </SectionHeading>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Required */}
          <div className="rounded-lg border border-bl-light-gray bg-bl-white p-8 motion-standards-panel motion-standards-required">
            <h3 className="font-serif text-lg font-semibold text-bl-gold-on-light">
              Required
            </h3>
            <ul className="mt-5 space-y-4">
              {USAGE_REQUIRED.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-bl-gold-on-light"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-bl-blue-gray">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not permitted */}
          <div className="rounded-lg border border-bl-light-gray bg-bl-white p-8 motion-standards-panel motion-standards-denied">
            <h3 className="font-serif text-lg font-semibold text-bl-error">
              Not permitted
            </h3>
            <ul className="mt-5 space-y-4">
              {USAGE_NOT_PERMITTED.map((item) => (
                <li key={item} className="flex gap-3">
                  <X
                    className="mt-0.5 size-5 shrink-0 text-bl-error"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-bl-blue-gray">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}
