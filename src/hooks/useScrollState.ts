import { useEffect, useState } from 'react'

interface ScrollState {
  navHidden: boolean
  showToTop: boolean
}

/** Tracks scroll direction (to hide nav) and depth (to show back-to-top). */
export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({ navHidden: false, showToTop: false })

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setState({
        navHidden: y > lastY && y > 400,
        showToTop: y > window.innerHeight,
      })
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
