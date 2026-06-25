import { useSites } from '../hooks/useSites'
import LivePreview from '../components/LivePreview'

/**
 * Examples — a responsive grid of live site embeds.
 * Every site listed in /sites.txt is shown as a browser-framed, live iframe
 * preview that links out to the real thing. Editing sites.txt is all that's
 * needed to change what appears here.
 */
export default function Examples() {
  const { sites, state } = useSites()

  return (
    <div className="page page--examples">
      <section className="ex-intro">
        <div className="ex-intro__meta">
          <span>[ examples — live builds ]</span>
          <span>{state === 'ready' ? `${String(sites.length).padStart(2, '0')} projects` : '—'}</span>
        </div>
        <h1 className="ex-intro__title">
          a closer
          <br />
          <span className="accent">look.</span>
        </h1>
        <p className="ex-intro__lead">
          Every build, live and embedded. Each frame below is the real site — hover to bring it
          to life, click to open it full-screen in a new tab.
        </p>
      </section>

      {state === 'loading' && <p className="show-status">loading the examples…</p>}
      {state === 'error' && (
        <p className="show-status show-status--error">
          couldn't load <code>sites.txt</code> — make sure it exists in <code>/public</code>.
        </p>
      )}

      {state === 'ready' && (
        <section className="ex-grid" aria-label="Live project examples">
          {sites.map((site, i) => (
            <a
              key={site.url + i}
              className="ex-card"
              href={site.url}
              target="_blank"
              rel="noreferrer noopener"
              data-link
              style={{ ['--i' as string]: i % 12 }}
            >
              <LivePreview url={site.url} domain={site.domain} title={site.title} />
              <div className="ex-card__meta">
                <span className="ex-card__title">{site.title}</span>
                <span className="ex-card__cat">{site.category}</span>
                <span className="ex-card__go">visit ↗</span>
              </div>
            </a>
          ))}
        </section>
      )}

      <p className="ex-hint">
        <span>live embeds</span>
        <span className="ex-hint__line" />
        <span>{state === 'ready' ? `${sites.length} of ${sites.length} shown` : '—'}</span>
      </p>
    </div>
  )
}
