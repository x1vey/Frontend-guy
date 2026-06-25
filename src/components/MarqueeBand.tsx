import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/usePrefs'

interface MarqueeBandProps {
  items: string[]
  /** px/frame; negative scrolls left. */
  speed?: number
}

/** Standalone auto-scrolling marquee band (rb2b-style ticker). */
export default function MarqueeBand({ items, speed = -0.4 }: MarqueeBandProps) {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return
    let x = 0
    let raf = 0
    const loop = () => {
      x += speed
      el.style.transform = `translateX(${x % (el.scrollWidth / 2)}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(raf)
  }, [speed])

  return (
    <div className="band" aria-hidden="true">
      <div className="band__track" ref={track}>
        {[...Array(2)].flatMap((_, dup) =>
          items.flatMap((item, i) => [
            <span className="band__item" key={`${dup}-${i}-t`}>
              {item}
            </span>,
            <span className="band__star" key={`${dup}-${i}-d`}>
              ✦
            </span>,
          ]),
        )}
      </div>
    </div>
  )
}
