import { Link } from 'react-router-dom'

interface NavProps {
  revealed: boolean
  hidden: boolean
}

export default function Nav({ revealed, hidden }: NavProps) {
  const cls = ['nav', revealed ? 'is-in' : '', hidden ? 'is-hidden' : ''].filter(Boolean).join(' ')
  return (
    <>
      <div className={`nav-blur${revealed && !hidden ? ' is-in' : ''}`} aria-hidden="true" />
      <header className={cls}>
      <Link to="/" className="nav__brand" data-link>
        <span className="nav__brand-mark">◆</span>
        <span className="nav__brand-name">
          studio<span className="nav__brand-dim">/folio</span>
        </span>
      </Link>
      <nav className="nav__links">
        <span className="nav__label">[ nav ]</span>
        <Link to="/#work" data-link>work</Link>
        <Link to="/examples" data-link>examples</Link>
        <Link to="/showcase" data-link>library</Link>
        <Link to="/#about" data-link>about</Link>
      </nav>
      <Link to="/#contact" className="nav__cta" data-link>
        <span>let's talk</span>
        <span className="nav__cta-dot" />
      </Link>
      </header>
    </>
  )
}
