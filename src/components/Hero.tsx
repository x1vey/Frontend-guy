import { useEffect, useRef } from 'react'
import { marqueeItems } from '../data'
import { prefersReducedMotion } from '../hooks/usePrefs'

interface HeroProps {
  revealed: boolean
  clock: string
}

const WORDS: { text: string; accent?: boolean }[][] = [
  [{ text: 'frontend' }, { text: 'designer' }],
  [{ text: '&' }, { text: 'developer', accent: true }],
]

export default function Hero({ revealed, clock }: HeroProps) {
  const track = useRef<HTMLDivElement>(null)

  // Scroll-coupled marquee drift
  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return
    let base = 0
    let offset = 0
    let raf = 0
    const loop = () => {
      base -= 0.4
      const total = base + offset
      el.style.transform = `translateX(${total % (el.scrollWidth / 2)}px)`
      raf = requestAnimationFrame(loop)
    }
    const onScroll = () => {
      offset = -window.scrollY * 0.15
    }
    loop()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  let wordIndex = 0

  return (
    <section className="hero">
      <div className="hero__meta">
        <span>[ portfolio — 2026 ]</span>
        <span className="hero__loc">{clock}</span>
      </div>

      <h1 className="hero__title">
        {WORDS.map((line, li) => (
          <span className="line" key={li}>
            {line.map((w, wi) => {
              const i = wordIndex++
              return (
                <span key={wi}>
                  <span
                    className={`word${w.accent ? ' accent' : ''}`}
                    style={{
                      transform: revealed ? 'translateY(0)' : 'translateY(110%)',
                      transition: 'transform 1s var(--ease)',
                      transitionDelay: `${i * 0.06}s`,
                    }}
                  >
                    {w.text}
                  </span>{' '}
                </span>
              )
            })}
          </span>
        ))}
        <span className="line hero__sub-line">
          {['crafting', 'interfaces', 'with', 'soul.'].map((w, wi) => {
            const i = wordIndex++
            return (
              <span key={wi}>
                <span
                  className="word"
                  style={{
                    transform: revealed ? 'translateY(0)' : 'translateY(110%)',
                    transition: 'transform 1s var(--ease)',
                    transitionDelay: `${i * 0.06}s`,
                  }}
                >
                  {w}
                </span>{' '}
              </span>
            )
          })}
        </span>
      </h1>

      <div className="hero__foot">
        <p className="hero__desc">
          I design and build digital experiences where motion, type and structure meet. Selected works, case
          studies &amp; experiments below.
        </p>
        <a href="#work" className="hero__scroll" data-link>
          <span>scroll to explore</span>
          <span className="hero__scroll-arrow">↓</span>
        </a>
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="marquee__track" ref={track}>
          {[...Array(2)].flatMap((_, dup) =>
            marqueeItems.flatMap((item, i) => [
              <span key={`${dup}-${i}-t`}>{item}</span>,
              <span key={`${dup}-${i}-d`}>◆</span>,
            ]),
          )}
        </div>
      </div>
    </section>
  )
}
