import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { prefersReducedMotion } from '../hooks/usePrefs'

/** Lead paragraph whose words fade up from dim to full as it enters view. */
function Lead() {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const chars = el.querySelectorAll<HTMLElement>('.char')
    if (prefersReducedMotion()) {
      chars.forEach((c) => (c.style.opacity = '1'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          chars.forEach((c, i) => setTimeout(() => (c.style.opacity = '1'), i * 22))
          io.disconnect()
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Build the lead with <em> highlight and per-word spans
  const parts: { text: string; em?: boolean }[] = [
    { text: "I'm a frontend designer & developer with " },
    { text: '8 years', em: true },
    { text: ' of turning ambitious ideas into interfaces people remember. I care about the details no one notices — and the ones everyone feels.' },
  ]

  let key = 0
  const renderWords = (text: string) =>
    text.split(/(\s+)/).map((part) => {
      if (part.trim() === '') return <span key={key++}>{part}</span>
      return (
        <span className="char" key={key++} style={{ opacity: 0.18, transition: 'opacity .5s var(--ease)' }}>
          {part}
        </span>
      )
    })

  return (
    <p className="about__lead" ref={ref}>
      {parts.map((p) => (p.em ? <em key={key++}>{renderWords(p.text)}</em> : renderWords(p.text)))}
    </p>
  )
}

function Col({ label, children }: { label: string; children: string }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div className="about__col" ref={ref} data-reveal>
      <span className="about__col-label">{label}</span>
      <p>{children}</p>
    </div>
  )
}

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section__head">
        <span className="section__label">[ about ]</span>
      </div>
      <div className="about__body">
        <Lead />
        <div className="about__cols">
          <Col label="approach">
            Design and code are one craft to me. I prototype in the browser, sweat the typography, and treat
            performance as a feature.
          </Col>
          <Col label="currently">
            Open to freelance & full-time roles. Available for select projects starting Q3 2026.
          </Col>
        </div>
      </div>
    </section>
  )
}
