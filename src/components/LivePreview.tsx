import { useEffect, useRef, useState } from 'react'

interface LivePreviewProps {
  /** Full URL to embed, e.g. "https://example.com/". */
  url: string
  /** Display domain shown in the fake browser bar. */
  domain: string
  /** Optional accessible title for the frame. */
  title?: string
}

/**
 * A live, browser-framed preview of a real site.
 *
 * The site is embedded in an <iframe> rendered at a desktop-ish viewport and
 * scaled down to thumbnail size (see .lp__shot iframe in styles.css). The
 * iframe is only mounted once the card scrolls into view, so a page full of
 * them stays light — we never load 35 sites at once.
 *
 * pointer-events on the iframe are disabled in CSS so the surrounding card
 * stays clickable as a single link and you can't get "trapped" scrolling
 * inside a preview.
 */
export default function LivePreview({ url, domain, title }: LivePreviewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="lp">
      <div className="lp__bar">
        <span className="lp__dot" />
        <span className="lp__dot" />
        <span className="lp__dot" />
        <span className="lp__addr">{domain}</span>
      </div>
      <div className="lp__shot" ref={ref}>
        {inView && (
          <iframe
            src={url}
            title={title || domain}
            loading="lazy"
            tabIndex={-1}
            scrolling="no"
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            style={{ opacity: loaded ? 1 : 0 }}
          />
        )}
        {!loaded && (
          <div className="lp__ph">
            <span className="lp__ph-mono">{domain}</span>
          </div>
        )}
      </div>
    </div>
  )
}
