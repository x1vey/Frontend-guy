import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    h: '01 — The offer',
    p: [
      'The "Free Website" offer provides one (1) custom-designed, hand-built single-page website at no monetary cost to a limited number of selected applicants per quarter.',
      'Submitting the claim form is a request, not a guarantee. Spots are limited and awarded at the sole discretion of the studio. We will confirm acceptance by email, typically within 48 hours.',
    ],
  },
  {
    h: '02 — What\'s included (and what isn\'t)',
    p: [
      'Included: a custom one-page design, a responsive hand-coded build, and guidance on copy, layout and hosting setup. The resulting design files and code are yours to keep with no lock-in.',
      'Not included: ongoing maintenance, paid third-party services (domain registration, premium hosting, stock assets, paid fonts), multi-page builds, or backend/application development. These can be arranged separately as paid work.',
    ],
  },
  {
    h: '03 — Eligibility',
    p: [
      'Applicants must be 18 or older and provide accurate contact details. We reserve the right to decline any request, and to limit one free website per person, brand or organisation.',
    ],
  },
  {
    h: '04 — Information we collect',
    p: [
      'When you submit the claim form we collect the information you provide: your name, email address, brand/project name, and a description of your project. We do not collect payment information for this offer.',
      'This site does not set advertising or tracking cookies. Any analytics, if enabled, are privacy-respecting and aggregate only.',
    ],
  },
  {
    h: '05 — How we use it',
    p: [
      'We use your information solely to evaluate your request, contact you about the offer, and—if selected—deliver your website. We do not sell, rent, or share your personal data with third parties for marketing.',
      'We may retain your submission for up to 12 months to administer the offer, after which it is deleted on request or as part of routine cleanup.',
    ],
  },
  {
    h: '06 — Your rights',
    p: [
      'You may request access to, correction of, or deletion of your personal data at any time by emailing hello@yourstudio.com. We will respond within 30 days.',
    ],
  },
  {
    h: '07 — Changes',
    p: [
      'We may update these terms from time to time. The version shown here, with its effective date below, is the current one. Material changes affecting an in-progress project will be communicated directly.',
    ],
  },
]

export default function Policy() {
  return (
    <div className="page page--policy">
      <section className="policy">
        <div className="policy__head">
          <span className="section__label">[ offer terms &amp; privacy policy ]</span>
          <h1 className="policy__title">the fine print</h1>
          <p className="policy__effective">Effective 22 June 2026 · v1.0</p>
          <p className="policy__intro">
            Plain-language terms for the free website offer and how your information is handled. Questions? Email{' '}
            <a href="mailto:hello@yourstudio.com" data-link>
              hello@yourstudio.com
            </a>
            .
          </p>
        </div>

        <div className="policy__body">
          {SECTIONS.map((s) => (
            <article className="policy__section" key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </article>
          ))}
        </div>

        <div className="policy__foot">
          <Link to="/free-website" className="btn btn--ghost" data-link>
            ← back to the offer
          </Link>
        </div>
      </section>
    </div>
  )
}
