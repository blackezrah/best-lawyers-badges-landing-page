'use client'

import { useEffect } from 'react'

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value))

const sequence = (progress: number, start: number, end: number) =>
  clamp((progress - start) / (end - start))

export function MotionController() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scenes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-motion-scene]'),
    )

    if (reduceMotion.matches || scenes.length === 0) {
      scenes.forEach((scene) => {
        scene.style.setProperty('--scene-progress', '1')
        scene.dataset.motionReady = 'true'
      })
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const viewport = window.innerHeight || 1
      const width = window.innerWidth || 1440
      const travel = width < 640 ? 0.58 : width < 1024 ? 0.78 : 1
      const depthTravel = width < 640 ? 0.5 : width < 1024 ? 0.68 : 1

      scenes.forEach((scene) => {
        if (reduceMotion.matches) {
          scene.style.setProperty('--scene-progress', '1')
          scene.style.setProperty('--scene-presence', '1')
          scene.style.setProperty('--scene-enter', '0')
          scene.style.setProperty('--scene-exit', '0')
          scene.style.setProperty('--scene-depth', '0')
          scene.style.setProperty('--scene-opacity', '1')
          scene.style.setProperty('--motion-up-sm', '0px')
          scene.style.setProperty('--motion-up-md', '0px')
          scene.style.setProperty('--motion-up-lg', '0px')
          scene.style.setProperty('--motion-down-sm', '0px')
          scene.style.setProperty('--motion-down-md', '0px')
          scene.style.setProperty('--motion-down-lg', '0px')
          scene.style.setProperty('--motion-x-sm', '0px')
          scene.style.setProperty('--motion-x-md', '0px')
          scene.style.setProperty('--motion-x-sm-neg', '0px')
          scene.style.setProperty('--motion-x-md-neg', '0px')
          scene.style.setProperty('--motion-x-sm-half', '0px')
          scene.style.setProperty('--motion-x-sm-half-neg', '0px')
          scene.style.setProperty('--motion-depth-sm', '0px')
          scene.style.setProperty('--motion-depth-md', '0px')
          scene.style.setProperty('--motion-exit-up', '0px')
          scene.style.setProperty('--motion-exit-down', '0px')
          scene.style.setProperty('--recognition-card-1', '0px')
          scene.style.setProperty('--recognition-card-2', '0px')
          scene.style.setProperty('--recognition-card-3', '0px')
          scene.style.setProperty('--recognition-card-opacity-1', '1')
          scene.style.setProperty('--recognition-card-opacity-2', '1')
          scene.style.setProperty('--recognition-card-opacity-3', '1')
          scene.style.setProperty('--value-heading-x', '0px')
          scene.style.setProperty('--value-copy-x', '0px')
          scene.style.setProperty('--value-heading-opacity', '1')
          scene.style.setProperty('--value-copy-opacity', '1')
          scene.style.setProperty('--value-card-1-x', '0px')
          scene.style.setProperty('--value-card-1-y', '0px')
          scene.style.setProperty('--value-card-2-x', '0px')
          scene.style.setProperty('--value-card-2-y', '0px')
          scene.style.setProperty('--value-card-3-x', '0px')
          scene.style.setProperty('--value-card-3-y', '0px')
          scene.style.setProperty('--value-card-4-x', '0px')
          scene.style.setProperty('--value-card-4-y', '0px')
          scene.style.setProperty('--value-card-opacity-1', '1')
          scene.style.setProperty('--value-card-opacity-2', '1')
          scene.style.setProperty('--value-card-opacity-3', '1')
          scene.style.setProperty('--value-card-opacity-4', '1')
          scene.style.setProperty('--process-card-1-y', '0px')
          scene.style.setProperty('--process-card-2-y', '0px')
          scene.style.setProperty('--process-card-3-y', '0px')
          scene.style.setProperty('--process-card-4-y', '0px')
          scene.style.setProperty('--process-card-opacity-1', '1')
          scene.style.setProperty('--process-card-opacity-2', '1')
          scene.style.setProperty('--process-card-opacity-3', '1')
          scene.style.setProperty('--process-card-opacity-4', '1')
          scene.dataset.motionReady = 'true'
          scene.dataset.inview = 'true'
          return
        }

        const rect = scene.getBoundingClientRect()
        const span = viewport + rect.height
        const progress = clamp((viewport - rect.top) / span)
        const visibility = clamp(
          1 - Math.abs(rect.top + rect.height / 2 - viewport / 2) /
            (viewport * 0.85 + rect.height / 2),
        )
        const enter = 1 - clamp(progress * 1.55)
        const exit = clamp((progress - 0.68) / 0.32)
        const depth = progress - 0.5

        scene.style.setProperty('--scene-progress', progress.toFixed(4))
        scene.style.setProperty('--scene-presence', visibility.toFixed(4))
        scene.style.setProperty('--scene-enter', enter.toFixed(4))
        scene.style.setProperty('--scene-exit', exit.toFixed(4))
        scene.style.setProperty('--scene-depth', depth.toFixed(4))
        scene.style.setProperty(
          '--scene-opacity',
          Math.max(clamp(1 - enter * 1.25), visibility * 0.9).toFixed(4),
        )
        scene.style.setProperty('--motion-up-sm', `${(enter * 34 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-up-md', `${(enter * 62 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-up-lg', `${(enter * 96 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-down-sm', `${(enter * -34 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-down-md', `${(enter * -62 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-down-lg', `${(enter * -96 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-x-sm', `${(enter * 44 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-x-md', `${(enter * 84 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-x-sm-neg', `${(enter * -44 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-x-md-neg', `${(enter * -84 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-x-sm-half', `${(enter * 22 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-x-sm-half-neg', `${(enter * -22 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-depth-sm', `${(depth * 70 * depthTravel).toFixed(2)}px`)
        scene.style.setProperty('--motion-depth-md', `${(depth * 128 * depthTravel).toFixed(2)}px`)
        scene.style.setProperty('--motion-exit-up', `${(exit * -58 * travel).toFixed(2)}px`)
        scene.style.setProperty('--motion-exit-down', `${(exit * 58 * travel).toFixed(2)}px`)

        if (scene.dataset.motionScene === 'recognition') {
          const lift = width < 640 ? viewport * 0.38 : width < 1024 ? viewport * 0.46 : viewport * 0.56
          const card1 = sequence(progress, 0.06, 0.24)
          const card2 = sequence(progress, 0.19, 0.46)
          const card3 = sequence(progress, 0.32, 0.66)

          scene.style.setProperty('--recognition-card-1', `${((1 - card1) * lift).toFixed(2)}px`)
          scene.style.setProperty('--recognition-card-2', `${((1 - card2) * lift).toFixed(2)}px`)
          scene.style.setProperty('--recognition-card-3', `${((1 - card3) * lift).toFixed(2)}px`)
          scene.style.setProperty('--recognition-card-opacity-1', clamp(card1 * 1.4).toFixed(4))
          scene.style.setProperty('--recognition-card-opacity-2', clamp(card2 * 1.35).toFixed(4))
          scene.style.setProperty('--recognition-card-opacity-3', clamp(card3 * 1.3).toFixed(4))
        }

        if (scene.dataset.motionScene === 'value') {
          const inlineTravel = width < 640 ? width * 0.42 : width < 1024 ? width * 0.34 : width * 0.28
          const verticalTravel = width < 640 ? viewport * 0.28 : width < 1024 ? viewport * 0.34 : viewport * 0.42
          const heading = sequence(progress, 0.06, 0.22)
          const copy = sequence(progress, 0.22, 0.42)
          const card1 = sequence(progress, 0.16, 0.36)
          const card2 = sequence(progress, 0.27, 0.51)
          const card3 = sequence(progress, 0.39, 0.62)
          const card4 = sequence(progress, 0.44, 0.64)
          const exit = sequence(progress, 0.8, 0.97)

          scene.style.setProperty('--value-heading-x', `${((1 - heading) * -inlineTravel).toFixed(2)}px`)
          scene.style.setProperty('--value-copy-x', `${((1 - copy) * -inlineTravel).toFixed(2)}px`)
          scene.style.setProperty('--value-heading-opacity', clamp(heading * 1.4).toFixed(4))
          scene.style.setProperty('--value-copy-opacity', clamp(copy * 1.35).toFixed(4))
          scene.style.setProperty('--value-card-1-x', '0px')
          scene.style.setProperty('--value-card-1-y', `${((1 - card1) * -verticalTravel + exit * -82 * travel).toFixed(2)}px`)
          scene.style.setProperty('--value-card-2-x', `${((1 - card2) * -inlineTravel).toFixed(2)}px`)
          scene.style.setProperty('--value-card-2-y', `${(exit * -118 * travel).toFixed(2)}px`)
          scene.style.setProperty('--value-card-3-x', '0px')
          scene.style.setProperty('--value-card-3-y', `${((1 - card3) * verticalTravel + exit * -146 * travel).toFixed(2)}px`)
          scene.style.setProperty('--value-card-4-x', `${((1 - card4) * inlineTravel).toFixed(2)}px`)
          scene.style.setProperty('--value-card-4-y', `${(exit * -98 * travel).toFixed(2)}px`)
          scene.style.setProperty('--value-card-opacity-1', clamp(card1 * 1.3).toFixed(4))
          scene.style.setProperty('--value-card-opacity-2', sequence(progress, 0.48, 0.54).toFixed(4))
          scene.style.setProperty('--value-card-opacity-3', clamp(card3 * 1.3).toFixed(4))
          scene.style.setProperty('--value-card-opacity-4', clamp(card4 * 1.3).toFixed(4))
        }

        if (scene.dataset.motionScene === 'process') {
          const verticalTravel = width < 640 ? viewport * 0.32 : width < 1024 ? viewport * 0.38 : viewport * 0.44
          const card1 = sequence(progress, 0.14, 0.34)
          const card2 = sequence(progress, 0.22, 0.43)
          const card3 = sequence(progress, 0.3, 0.52)
          const card4 = sequence(progress, 0.38, 0.62)
          const exit = sequence(progress, 0.78, 0.96)

          scene.style.setProperty('--process-card-1-y', `${((1 - card1) * -verticalTravel + exit * -90 * travel).toFixed(2)}px`)
          scene.style.setProperty('--process-card-2-y', `${((1 - card2) * verticalTravel + exit * -116 * travel).toFixed(2)}px`)
          scene.style.setProperty('--process-card-3-y', `${((1 - card3) * -verticalTravel + exit * -142 * travel).toFixed(2)}px`)
          scene.style.setProperty('--process-card-4-y', `${((1 - card4) * verticalTravel + exit * -104 * travel).toFixed(2)}px`)
          scene.style.setProperty('--process-card-opacity-1', sequence(progress, 0.29, 0.36).toFixed(4))
          scene.style.setProperty('--process-card-opacity-2', clamp(card2 * 1.35).toFixed(4))
          scene.style.setProperty('--process-card-opacity-3', sequence(progress, 0.47, 0.54).toFixed(4))
          scene.style.setProperty('--process-card-opacity-4', clamp(card4 * 1.35).toFixed(4))
        }

        scene.dataset.motionReady = 'true'
        scene.dataset.inview =
          rect.bottom > viewport * 0.08 && rect.top < viewport * 0.92
            ? 'true'
            : 'false'
      })
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    window.addEventListener('orientationchange', requestUpdate)

    reduceMotion.addEventListener('change', requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      window.removeEventListener('orientationchange', requestUpdate)
      reduceMotion.removeEventListener('change', requestUpdate)
    }
  }, [])

  return null
}
