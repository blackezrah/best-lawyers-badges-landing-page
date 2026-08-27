'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type StatConfig =
  | {
      kind: 'single'
      end: number
      prefix?: string
      suffix: string
    }
  | {
      kind: 'pair'
      first: number
      second: number
      prefix: string
      separator: string
      suffix: string
    }
  | {
      kind: 'static'
    }

const configs: Record<string, StatConfig> = {
  '4 decades+': { kind: 'single', end: 4, suffix: ' decades+' },
  '18M+': { kind: 'single', end: 18, suffix: 'M+' },
  '~5% / ~3%': {
    kind: 'pair',
    first: 5,
    second: 3,
    prefix: '~',
    separator: '% / ~',
    suffix: '%',
  },
  '30M+': { kind: 'single', end: 30, suffix: 'M+' },
  '6M+': { kind: 'single', end: 6, suffix: 'M+' },
  'No fees': { kind: 'static' },
}

const easeOutQuart = (value: number) => 1 - Math.pow(1 - value, 4)

function formatFigure(config: StatConfig, progress: number, finalFigure: string) {
  if (config.kind === 'static') return finalFigure

  const eased = easeOutQuart(progress)

  if (config.kind === 'pair') {
    const first = Math.round(config.first * eased)
    const second = Math.round(config.second * eased)
    return `${config.prefix}${first}${config.separator}${second}${config.suffix}`
  }

  return `${config.prefix ?? ''}${Math.round(config.end * eased)}${config.suffix}`
}

export function AnimatedStatFigure({
  figure,
  index,
}: {
  figure: string
  index: number
}) {
  const config = useMemo(() => configs[figure] ?? { kind: 'static' }, [figure])
  const [display, setDisplay] = useState(() =>
    formatFigure(config, config.kind === 'static' ? 1 : 0, figure),
  )
  const hasPlayedRef = useRef(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (config.kind === 'static' || reduceMotion.matches) {
      setDisplay(figure)
      return
    }

    const scene = elementRef.current?.closest('[data-motion-scene="authority"]')
    if (!scene) return

    let frame = 0
    let timer = 0

    const play = () => {
      if (hasPlayedRef.current) return
      hasPlayedRef.current = true

      const duration = 1350 + index * 120
      const start = performance.now()

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration)
        setDisplay(formatFigure(config, progress, figure))
        if (progress < 1) {
          frame = window.requestAnimationFrame(tick)
        }
      }

      timer = window.setTimeout(() => {
        frame = window.requestAnimationFrame(tick)
      }, index * 110)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play()
      },
      {
        root: null,
        threshold: 0.34,
        rootMargin: '0px 0px -12% 0px',
      },
    )

    observer.observe(scene)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [config, figure, index])

  return (
    <dt
      ref={elementRef}
      className="font-serif text-3xl font-semibold tracking-tight text-bl-gold sm:text-4xl motion-stat-figure"
      aria-label={figure}
    >
      <span aria-hidden="true" className="motion-stat-shine">
        {display}
      </span>
    </dt>
  )
}
