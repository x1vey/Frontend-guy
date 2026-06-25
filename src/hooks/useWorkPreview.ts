import { useCallback, useEffect, useRef, useState } from 'react'
import { hasFinePointer } from './usePrefs'

/**
 * Floating live preview that lags behind the cursor while hovering a work row.
 * Returns the preview ref, current site url, active flag, and row handlers.
 */
export function useWorkPreview() {
  const preview = useRef<HTMLDivElement>(null)
  const [url, setUrl] = useState('')
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!hasFinePointer()) return
    const el = preview.current
    if (!el) return

    let tx = 0
    let ty = 0
    let px = 0
    let py = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const loop = () => {
      px += (tx - px) * 0.12
      py += (ty - py) * 0.12
      el.style.left = `${px}px`
      el.style.top = `${py}px`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    loop()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const onEnter = useCallback((src: string) => {
    if (!hasFinePointer()) return
    setUrl(src)
    setActive(true)
  }, [])
  const onLeave = useCallback(() => setActive(false), [])

  return { preview, url, active, onEnter, onLeave }
}
