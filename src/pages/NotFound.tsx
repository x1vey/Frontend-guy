import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section notfound">
      <span className="section__label">[ 404 ]</span>
      <h1 className="notfound__title">
        lost in
        <br />
        the <span className="accent">void</span>.
      </h1>
      <p className="notfound__desc">That page doesn't exist — or it drifted off the grid.</p>
      <Link to="/" className="btn btn--lime" data-link>
        back to home <span>&gt;&gt;&gt;</span>
      </Link>
    </section>
  )
}
