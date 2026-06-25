import { useRef, type ReactNode } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../hooks/usePrefs'

interface TiltProps {
  children: ReactNode
  className?: string
}

/** Wraps children with a subtle perspective tilt that follows the pointer. */
export default function Tilt({ children, className }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const enabled = hasFinePointer() && !prefersReducedMotion()

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return
    const el = ref.current!
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -6
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 6
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </div>
  )
}
