import { useRef, type ReactNode } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../hooks/usePrefs'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

/** Pulls its child toward the pointer within the wrapper bounds. */
export default function Magnetic({ children, className, strength = 0.15 }: MagneticProps) {
  const inner = useRef<HTMLDivElement>(null)
  const enabled = hasFinePointer() && !prefersReducedMotion()

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return
    const el = inner.current!
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => {
    if (inner.current) inner.current.style.transform = ''
  }

  return (
    <div className={className} onMouseMove={onMove} onMouseLeave={reset}>
      <div ref={inner} style={{ display: 'inline-block', transition: 'transform .4s var(--ease)' }}>
        {children}
      </div>
    </div>
  )
}
