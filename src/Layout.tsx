import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { useLoader } from './hooks/useLoader'
import { useCursor } from './hooks/useCursor'
import { useScrollState } from './hooks/useScrollState'
import { useClock } from './hooks/useClock'
import { ShellContext } from './shell-context'

/**
 * Persistent app shell. Mounts once and stays mounted across route changes,
 * so the loader runs a single time and the cursor RAF loop is never torn down.
 */
export default function Layout() {
  const { progress, done } = useLoader()
  const { ring, dot } = useCursor()
  const { navHidden, showToTop } = useScrollState()
  const clock = useClock()
  const { pathname, hash } = useLocation()

  // Lock scroll until the loader finishes
  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
  }, [done])

  // On navigation: jump to top, or smooth-scroll to a hash target if present.
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return (
    <>
      <div className="cursor" ref={ring} />
      <div className="cursor-dot" ref={dot} />

      <Loader progress={progress} done={done} />

      <div className="grain" aria-hidden="true" />

      <Nav revealed={done} hidden={navHidden} />

      <main id="top">
        <ShellContext.Provider value={{ revealed: done, clock }}>
          <Outlet />
        </ShellContext.Provider>
      </main>

      <Footer clock={clock} />

      <button
        className={`to-top${showToTop ? ' is-in' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  )
}
