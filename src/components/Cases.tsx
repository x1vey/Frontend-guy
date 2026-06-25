import { caseStudies } from '../data'
import { useReveal } from '../hooks/useReveal'
import Tilt from './Tilt'

export default function Cases() {
  return (
    <section className="section cases" id="cases">
      <div className="section__head">
        <span className="section__label">[ case studies ]</span>
        <h2 className="section__title">
          deep
          <br />
          dives
        </h2>
        <span className="section__index">in detail</span>
      </div>

      <div className="cases__grid">
        {caseStudies.map((c) => (
          <CaseCard key={c.title} {...c} />
        ))}
      </div>
    </section>
  )
}

function CaseCard(c: (typeof caseStudies)[number]) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} data-reveal>
      <Tilt className="case-card">
        <div className="case-card__top">
          <span className="case-card__tag">{c.tag}</span>
          <span className="case-card__year">{c.year}</span>
        </div>
        <div className={`case-card__visual case-card__visual--${c.variant}`} />
        <h3 className="case-card__title">{c.title}</h3>
        <p className="case-card__desc">{c.desc}</p>
        <div className="case-card__metrics">
          {c.metrics.map((m) => (
            <div key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
        <a href="#contact" className="case-card__link" data-link>
          read case study <span>→</span>
        </a>
      </Tilt>
    </div>
  )
}
