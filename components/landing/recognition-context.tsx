import type { CSSProperties } from 'react'

import { CREDIBILITY_POINTS } from '@/lib/content'

export function RecognitionContext() {
  return (
    <section data-motion-scene="recognition" className="border-y border-bl-light-gray bg-bl-white motion-recognition">
      <div className="motion-recognition-stage mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid w-full gap-10 md:grid-cols-3 md:gap-8 motion-recognition-grid">
          {CREDIBILITY_POINTS.map((point, i) => (
            <div
              key={point.title}
              className="relative md:px-6 md:first:pl-0 motion-recognition-point"
              style={{ '--recognition-index': i + 1 } as CSSProperties}
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 hidden h-full w-px bg-bl-light-gray md:block"
                />
              )}
              <h3 className="font-serif text-lg font-semibold text-bl-gold-on-light">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bl-blue-gray">
                {point.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
