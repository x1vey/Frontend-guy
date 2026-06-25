import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import MarqueeBand from '../components/MarqueeBand'

const STEPS = [
  { num: '01', title: 'Apply with your details', desc: 'Fill in the form with your name, brand and what the site is for. Takes 2 minutes.' },
  {
    num: '02',
    title: 'We get on a call',
    desc: 'A quick call to discuss the details — your goals, content and how you want it to look.',
    more: 'On the call we’ll talk through what your business is about and whether it’s a good fit. You can pick from my designs or show me something you like from the internet. Since this is a free build, we focus on simple, good-looking websites — and we’ll go over your brand guidelines too.',
  },
  { num: '03', title: 'Revisions & tweaks', desc: 'We refine the design together with revisions and tweaks until it feels exactly right.' },
]

const INCLUDED = [
  {
    title: 'Custom one-page design',
    detail:
      'A bespoke, hand-coded landing page built around your brand — not a template. Designed to look sharp and load fast.',
  },
  {
    title: 'Frontend only — it’s a storefront',
    detail:
      'This is a frontend website (a landing page / storefront). It showcases your brand and products — there’s no backend, database, logins, carts or payment processing included from our side if you have a payment processor we will add the link to the checkoutpage/store/booking calendar.',
  },
  {
    title: 'Top 3 priorities only',
    detail:
      'If you run multiple products or businesses, the free site showcases your top 3 from 1 business — the three things you most want customers to see, which will give you maximum results. It’s a focused storefront, not a full catalogue.',
  },
  {
    title: 'One free website per business',
    detail:
      'The offer is limited to 1 free website per business. Additional sites or pages can be discussed separately.',
  },
  {
    title: 'Mobile-first & responsive',
    detail: 'Looks and works great on phones, tablets and desktop — designed mobile-first.',
  },
  {
    title: 'Copy & layout guidance',
    detail: 'I’ll help shape the wording and structure so your message lands clearly.',
  },
  {
    title: 'Hosting & maintenance @ $20/m',
    detail:
      'The build is free. You only pay $20/month for hosting and ongoing maintenance to keep it live and updated. Hosting is something you have to pay for anyway, with any provider. Ongoing maintainece includes minor text tweaks, link updation and any new section build or rebuild shall be discussed seperately.',
  },
]

export default function FreeWebsite() {
  const [submitted, setSubmitted] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const formRef = useReveal<HTMLDivElement>()
  const agencyRef = useReveal<HTMLDivElement>()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Demo only — no backend. Wire this up to your form handler / email service.
    setSubmitted(true)
  }

  return (
    <div className="page page--offer">
      {/* HERO */}
      <section className="offer-hero">
        <div className="offer-hero__meta">
          <span>[ free website offer — 2026 ]</span>
          <span>no cost / no catch</span>
        </div>
        <h1 className="offer-hero__title">
          claim your <span className="accent">free</span>
          <br />
          website build.
        </h1>
        <p className="offer-hero__lead">
          We'll build it for you, <strong>completely free.</strong> You just pay $20/month for <strong>hosting and ongoing maintenance.</strong> Terms and conditions apply.
        </p>
        <div className="offer-hero__cta">
          <a href="#claim" className="btn btn--lime" data-link>
            claim your free site <span>&gt;&gt;&gt;</span>
          </a>
          <span className="offer-hero__slots">
            <span className="offer-hero__slots-dot" /> Limited Time Offer
          </span>
        </div>
      </section>

      <MarqueeBand
        items={['custom design', 'hand-coded', 'mobile-first', '100% free', 'limited time', 'maintainece included']}
      />

      {/* STEPS */}
      <section className="section offer-steps">
        <div className="section__head">
          <span className="section__label">[ how it works ]</span>
          <h2 className="section__title">
            three
            <br />
            steps
          </h2>
          <span className="section__index">start to launch</span>
        </div>
        <div className="steps__grid">
          {STEPS.map((s, i) => (
            <StepCard key={s.num} {...s} i={i} />
          ))}
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section offer-included">
        <span className="section__label">[ what's included ]</span>
        <div className="included__list">
          {INCLUDED.map((item, i) => (
            <IncludedCard key={item.title} {...item} i={i} />
          ))}
        </div>
      </section>

      {/* AGENCY UPSELL */}
      <section className="section offer-agency">
        <div className="agency-card" ref={agencyRef} data-reveal>
          <span className="section__label">[ want more than a landing page? ]</span>
          <h3 className="agency-card__title">
            Grow your business <span className="accent">under one roof.</span>
          </h3>
          <p className="agency-card__lead">
            Need ongoing support, automations, emails &amp; communications, a full business backend
            setup and a CRM? Join my agency and get everything you need to grow effortlessly — all in
            one place.
          </p>
          <ul className="agency-card__list">
            <li>Ongoing support</li>
            <li>Automations</li>
            <li>Emails &amp; communications</li>
            <li>Business backend setup</li>
            <li>CRM</li>
          </ul>
          <a href="https://example.com" className="btn btn--lime" data-link>
            join my agency today <span>&gt;&gt;&gt;</span>
          </a>
        </div>
      </section>

      {/* CLAIM FORM */}
      <section className="section offer-claim" id="claim">
        <div className="section__head">
          <span className="section__label">[ claim your spot ]</span>
          <h2 className="section__title">
            let's
            <br />
            build it
          </h2>
          <span className="section__index">~2 min</span>
        </div>

        <div className="claim__wrap" ref={formRef} data-reveal>
          {submitted ? (
            <div className="claim__success">
              <span className="claim__success-mark">✦</span>
              <h3>You're in.</h3>
              <p>
                Thanks — your request is in the queue. I'll be in touch within 48 hours to kick things off. Keep an
                eye on your inbox.
              </p>
              <Link to="/" className="btn btn--ghost" data-link>
                ← back to home
              </Link>
            </div>
          ) : (
            <form className="claim__form" onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="name">your name</label>
                <input id="name" name="name" type="text" required placeholder="Jane Doe" />
              </div>
              <div className="field">
                <label htmlFor="email">email</label>
                <input id="email" name="email" type="email" required placeholder="jane@brand.com" />
              </div>
              <div className="field">
                <label htmlFor="brand">brand / project</label>
                <input id="brand" name="brand" type="text" placeholder="Acme Coffee Co." />
              </div>
              <div className="field">
                <label htmlFor="about">what's the site for?</label>
                <textarea id="about" name="about" rows={4} placeholder="A landing page for our new product launch…" />
              </div>
              <label className="field field--check">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <span>
                  I agree to the{' '}
                  <Link to="/free-website/policy" data-link className="claim__policy-link">
                    offer terms &amp; privacy policy
                  </Link>
                  .
                </span>
              </label>
              <button type="submit" className="btn btn--lime btn--full" disabled={!agreed} data-link>
                claim my free website <span>&gt;&gt;&gt;</span>
              </button>
              <p className="claim__fineprint">
                By submitting you agree to be contacted about this offer. Read the{' '}
                <Link to="/free-website/policy" data-link>
                  full policy
                </Link>
                .
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

function IncludedCard({ title, detail, i }: (typeof INCLUDED)[number] & { i: number }) {
  const [open, setOpen] = useState(false)
  const ref = useReveal<HTMLDivElement>()
  return (
    <div className="included-card" ref={ref} data-reveal data-open={open} style={{ ['--i' as string]: i }}>
      <button
        type="button"
        className="included-card__head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="included__check">✓</span>
        <span className="included-card__title">{title}</span>
        <span className="included-card__toggle" aria-hidden="true">
          {open ? '–' : '+'}
        </span>
      </button>
      <div className="included-card__body">
        <p>{detail}</p>
      </div>
    </div>
  )
}

function StepCard({
  num,
  title,
  desc,
  more,
  i,
}: { num: string; title: string; desc: string; more?: string; i: number }) {
  const [open, setOpen] = useState(false)
  const ref = useReveal<HTMLDivElement>()
  return (
    <div className="step-card" ref={ref} data-reveal data-open={open} style={{ ['--i' as string]: i }}>
      <span className="step-card__num">{num}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
      {more && (
        <>
          <button
            type="button"
            className="step-card__toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            <span>{open ? 'hide' : "what's the call about?"}</span>
            <span className="step-card__toggle-icon" aria-hidden="true">
              {open ? '–' : '+'}
            </span>
          </button>
          <div className="step-card__more">
            <p>{more}</p>
          </div>
        </>
      )}
    </div>
  )
}
