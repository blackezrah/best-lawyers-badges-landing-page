import { Check, X } from 'lucide-react'
import { SectionHeading } from './primitives'
import { APPROVED_LANGUAGE, NOT_APPROVED_LANGUAGE } from '@/lib/content'

export function ApprovedLanguage() {
  return (
    <section data-motion-scene="language" className="bg-bl-white motion-language">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="max-w-3xl motion-language-intro">
          <SectionHeading>
            Recognition language should identify the award, edition, country,
            and relevant practice area.
          </SectionHeading>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 motion-language-grid">
          {/* Approved */}
          <div className="motion-language-approved">
            <div className="flex items-center gap-2">
              <Check className="size-5 text-bl-gold-on-light" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-bl-gold-on-light">
                Approved examples
              </h3>
            </div>
            <ul className="mt-5 space-y-4">
              {APPROVED_LANGUAGE.map((ex) => (
                <li
                  key={ex}
                  className="rounded-md border border-bl-light-gray border-l-2 border-l-bl-gold-on-light bg-bl-off-white p-5 font-serif text-base leading-relaxed text-bl-charcoal text-pretty"
                >
                  {ex}
                </li>
              ))}
            </ul>
          </div>

          {/* Not approved */}
          <div className="motion-language-denied">
            <div className="flex items-center gap-2">
              <X className="size-5 text-bl-error" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-bl-error">
                Do not use
              </h3>
            </div>
            <ul className="mt-5 space-y-4">
              {NOT_APPROVED_LANGUAGE.map((ex) => (
                <li
                  key={ex}
                  className="rounded-md border border-bl-light-gray border-l-2 border-l-bl-error bg-bl-white p-5 text-base leading-relaxed text-bl-medium-gray-1 line-through decoration-bl-error/50"
                >
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
