import { useEffect, useState } from 'react'

export interface Site {
  url: string
  title: string
  category: string
  domain: string
}

type LoadState = 'loading' | 'ready' | 'error'

/** Tidy a raw URL into a display domain, e.g. "https://www.foo.com/bar" -> "foo.com". */
function toDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
  }
}

/** Title-case a domain's first label as a fallback name, e.g. "linear.app" -> "Linear". */
function titleFromDomain(domain: string): string {
  const base = domain.split('.')[0] || domain
  return base.charAt(0).toUpperCase() + base.slice(1)
}

function parseLine(line: string): Site | null {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) return null

  const [rawUrl, rawTitle, rawCategory] = trimmed.split('|').map((p) => p.trim())
  if (!rawUrl) return null

  // Be forgiving: add https:// if the user pasted a bare domain.
  const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`
  const domain = toDomain(url)

  return {
    url,
    domain,
    title: rawTitle || titleFromDomain(domain),
    category: rawCategory || 'Other',
  }
}

/**
 * Loads and parses /sites.txt at runtime. Editing that file (no rebuild)
 * is all that's needed to change the gallery contents.
 */
export function useSites() {
  const [sites, setSites] = useState<Site[]>([])
  const [state, setState] = useState<LoadState>('loading')

  useEffect(() => {
    let cancelled = false
    fetch(`${import.meta.env.BASE_URL}sites.txt`, { cache: 'no-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.text()
      })
      .then((text) => {
        if (cancelled) return
        const parsed = text.split(/\r?\n/).map(parseLine).filter((s): s is Site => s !== null)
        setSites(parsed)
        setState('ready')
      })
      .catch(() => {
        if (!cancelled) setState('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const categories = Array.from(new Set(sites.map((s) => s.category)))

  return { sites, categories, state }
}
