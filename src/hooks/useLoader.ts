import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './usePrefs'

interface LoaderState {
  progress: number
  done: boolean
}

/** Fake percentage preloader; resolves to `done` so the app can reveal the hero. */
export function useLoader(): LoaderState {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(100)
      setDone(true)
      return
    }

    let p = 0
    let timer: number
    const tick = () => {
      p = Math.min(100, p + Math.random() * 18 + 6)
      setProgress(p)
      if (p < 100) {
        timer = window.setTimeout(tick, Math.random() * 180 + 80)
      } else {
        timer = window.setTimeout(() => setDone(true), 400)
      }
    }
    tick()
    return () => clearTimeout(timer)
  }, [])

  return { progress, done }
}
