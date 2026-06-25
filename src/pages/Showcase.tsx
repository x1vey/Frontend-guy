import { useMemo, useState } from 'react'
import { useSites } from '../hooks/useSites'
import SiteCard from '../components/SiteCard'

const BATCH = 24

export default function Showcase() {
  const { sites, categories, state } = useSites()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('all')
  const [limit, setLimit] = useState(BATCH)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sites.filter((s) => {
      const matchesCat = active === 'all' || s.category === active
      const matchesQ =
        !q || s.title.toLowerCase().includes(q) || s.domain.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
      return matchesCat && matchesQ
    })
  }, [sites, query, active])

  const visible = filtered.slice(0, limit)

  const resetLimit = () => setLimit(BATCH)

  return (
    <div className="page page--showcase">
      <section className="show-intro">
        <div className="show-intro__meta">
          <span>[ the index — every build ]</span>
          <span>{state === 'ready' ? `${sites.length} sites` : '—'}</span>
        </div>
        <h1 className="show-intro__title">
          the whole
          <br />
          <span className="accent">library.</span>
        </h1>
        <p className="show-intro__lead">
          Every site I've shipped, with a live preview. Search it, filter it, hover any card for a closer look —
          click to visit the real thing.
        </p>
      </section>

      {/* Controls */}
      <div className="show-controls">
        <div className="show-search">
          <span className="show-search__icon">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              resetLimit()
            }}
            placeholder="search by name, domain or category…"
            aria-label="Search sites"
          />
          {query && (
            <button className="show-search__clear" onClick={() => setQuery('')} aria-label="Clear search" data-link>
              ✕
            </button>
          )}
        </div>

        <div className="show-filters" role="tablist" aria-label="Filter by category">
          <FilterChip label="all" count={sites.length} active={active === 'all'} onClick={() => { setActive('all'); resetLimit() }} />
          {categories.map((c) => (
            <FilterChip
              key={c}
              label={c}
              count={sites.filter((s) => s.category === c).length}
              active={active === c}
              onClick={() => { setActive(c); resetLimit() }}
            />
          ))}
        </div>
      </div>

      {/* States */}
      {state === 'loading' && <p className="show-status">loading the library…</p>}
      {state === 'error' && (
        <p className="show-status show-status--error">
          couldn't load <code>sites.txt</code> — make sure it exists in <code>/public</code>.
        </p>
      )}

      {state === 'ready' && filtered.length === 0 && (
        <p className="show-status">no sites match “{query || active}”.</p>
      )}

      {/* Grid */}
      {state === 'ready' && visible.length > 0 && (
        <>
          <div className="show-grid">
            {visible.map((site, i) => (
              <SiteCard key={site.url + i} site={site} index={i} />
            ))}
          </div>

          {filtered.length > limit && (
            <div className="show-more">
              <span className="show-more__count">
                showing {visible.length} of {filtered.length}
              </span>
              <button className="btn btn--ghost" onClick={() => setLimit((n) => n + BATCH)} data-link>
                load more <span>↓</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button className={`chip${active ? ' is-active' : ''}`} onClick={onClick} role="tab" aria-selected={active} data-link>
      {label}
      <span className="chip__count">{count}</span>
    </button>
  )
}
