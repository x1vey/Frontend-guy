import type { Site } from '../hooks/useSites'
import LivePreview from './LivePreview'

interface SiteCardProps {
  site: Site
  index: number
}

/**
 * A single site preview in the library grid. The preview is a live, lazily-
 * mounted iframe (see LivePreview) so a list of hundreds stays fast — each
 * embed only loads once it scrolls into view. Hover lifts the card; click
 * opens the live site.
 */
export default function SiteCard({ site, index }: SiteCardProps) {
  return (
    <a
      className="site-card"
      href={site.url}
      target="_blank"
      rel="noreferrer noopener"
      data-link
      style={{ ['--i' as string]: index % 12 }}
    >
      <LivePreview url={site.url} domain={site.domain} title={site.title} />

      <div className="site-card__meta">
        <span className="site-card__title">{site.title}</span>
        <span className="site-card__cat">{site.category}</span>
        <span className="site-card__go">visit ↗</span>
      </div>
    </a>
  )
}
