import { works } from '../data'
import { useWorkPreview } from '../hooks/useWorkPreview'

export default function Work() {
  const { preview, url, active, onEnter, onLeave } = useWorkPreview()

  return (
    <section className="section work" id="work">
      <div className="section__head">
        <span className="section__label">[ selected work ]</span>
        <h2 className="section__title">
          things i've
          <br />
          made
        </h2>
        <span className="section__index">01 — 04</span>
      </div>

      <ul className="work__list">
        {works.map((w) => (
          <li key={w.num}>
            <a
              className="work-row"
              href={w.url}
              target="_blank"
              rel="noreferrer noopener"
              data-link
              data-work
              onMouseEnter={() => onEnter(w.url)}
              onMouseLeave={onLeave}
            >
              <span className="work-row__num">{w.num}</span>
              <span className="work-row__name">{w.name}</span>
              <span className="work-row__type">{w.type}</span>
              <span className="work-row__year">{w.year}</span>
              <span className="work-row__arrow">↗</span>
            </a>
          </li>
        ))}
      </ul>

      <div className={`work__preview${active ? ' is-active' : ''}`} ref={preview} aria-hidden="true">
        {url && <iframe src={url} title="" tabIndex={-1} scrolling="no" referrerPolicy="no-referrer" />}
      </div>
    </section>
  )
}
