import { useEffect, useRef } from 'react'
import { hasFinePointer, prefersReducedMotion } from './usePrefs'

/**
 * Drives the custom blend-mode cursor: a lagging ring + an instant dot,
 * with an `is-hover` state over interactive elements. Uses event delegation
 * so it keeps working across client-side route changes.
 */
export function useCursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    const ringEl = ring.current
    const dotEl = dot.current
    if (!ringEl || !dotEl) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let cx = mx
    let cy = my
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dotEl.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
    }

    const loop = () => {
      cx += (mx - cx) * 0.18
      cy += (my - cy) * 0.18
      ringEl.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    // Delegated hover detection survives route changes (no per-node listeners).
    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest('[data-link], [data-work], button, a')

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) ringEl.classList.add('is-hover')
    }
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) ringEl.classList.remove('is-hover')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return { ring, dot }
}
