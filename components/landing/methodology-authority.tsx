import { SectionHeading } from './primitives'
import { AUTHORITY_STATS } from '@/lib/content'
import { AnimatedStatFigure } from './animated-stat-figure'

export function MethodologyAuthority() {
  return (
    <section data-motion-scene="authority" className="relative overflow-hidden bg-gradient-to-b from-bl-charcoal to-bl-dark-blue-gray motion-authority">
      {/* Subtle offset radial illumination for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 motion-authority-light"
        style={{
          background:
            'radial-gradient(60% 50% at 75% 20%, rgba(201,163,91,0.14), transparent 70%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-2xl text-center motion-authority-intro">
          <SectionHeading tone="light">
            A distinction designed to carry weight.
          </SectionHeading>
          <p className="mt-4 font-serif text-xl font-semibold leading-snug text-bl-gold text-pretty sm:text-2xl">
            Recognition Grounded in Peer Review
          </p>
        </div>

        <dl className="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-px border-t border-white/10 text-left sm:grid-cols-2 lg:grid-cols-3 motion-authority-stats">
          {AUTHORITY_STATS.map((stat, i) => (
            <div
              key={stat.figure}
              className="border-b border-white/10 py-8 pr-4 motion-authority-stat"
            >
              <AnimatedStatFigure figure={stat.figure} index={i} />
              <dd className="mt-3 text-sm leading-relaxed text-bl-light-gray-1">
                {stat.body}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mx-auto mt-12 max-w-3xl text-center font-serif text-xl leading-snug text-bl-white text-pretty sm:text-2xl motion-authority-close">
          The license does not create the distinction. It gives eligible
          recipients an official way to communicate the distinction they have
          already earned.
        </p>
      </div>
    </section>
  )
}
