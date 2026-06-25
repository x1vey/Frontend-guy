import { skills, stack } from '../data'
import { useReveal } from '../hooks/useReveal'

export default function Skills() {
  const stackRef = useReveal<HTMLDivElement>()
  return (
    <section className="section skills">
      <div className="section__head">
        <span className="section__label">[ capabilities ]</span>
        <h2 className="section__title">
          what i
          <br />
          bring
        </h2>
        <span className="section__index">the toolkit</span>
      </div>

      <div className="skills__grid">
        {skills.map((s, i) => (
          <SkillCard key={s.num} {...s} i={i} />
        ))}
      </div>

      <div className="skills__stack" ref={stackRef} data-reveal>
        <span className="skills__stack-label">stack —</span>
        {stack.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </section>
  )
}

function SkillCard({ num, title, desc, i }: (typeof skills)[number] & { i: number }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div className="skill" ref={ref} data-reveal style={{ ['--i' as string]: i % 4 }}>
      <span className="skill__num">{num}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}
