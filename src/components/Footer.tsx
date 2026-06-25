interface FooterProps {
  clock: string
}

export default function Footer({ clock }: FooterProps) {
  return (
    <footer className="footer">
      <span>© 2026 — your studio, inc.</span>
      <span className="footer__mid">designed &amp; built in the browser</span>
      <span className="footer__time">{clock}</span>
    </footer>
  )
}
