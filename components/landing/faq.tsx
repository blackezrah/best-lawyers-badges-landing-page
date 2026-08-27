'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { SectionHeading } from './primitives'
import { FAQ_ITEMS } from '@/lib/content'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" data-motion-scene="faq" className="scroll-mt-8 bg-bl-white motion-faq">
      <div className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="max-w-2xl motion-faq-intro">
          <SectionHeading>
            Licensing, eligibility, and approved use.
          </SectionHeading>
          <p className="mt-8 font-serif text-xl font-semibold leading-snug text-bl-gold-on-light text-pretty sm:text-2xl">
            Common Questions
          </p>
        </div>

        <dl className="mt-12 border-t border-bl-light-gray motion-faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i
            const panelId = `faq-panel-${i}`
            const btnId = `faq-button-${i}`
            return (
              <div key={item.q} className="border-b border-bl-light-gray motion-faq-item">
                <dt>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-serif text-lg font-medium text-bl-charcoal text-pretty">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-bl-gold-on-light"
                    >
                      {isOpen ? (
                        <Minus className="size-5" />
                      ) : (
                        <Plus className="size-5" />
                      )}
                    </span>
                  </button>
                </dt>
                <dd
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!isOpen}
                  className="pb-6 pr-9"
                >
                  <p className="text-sm leading-relaxed text-bl-blue-gray">
                    {item.a}
                  </p>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
