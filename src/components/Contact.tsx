import Magnetic from './Magnetic'

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <span className="section__label">[ contact ]</span>
      <h2 className="contact__title">
        <Magnetic>
          <a href="mailto:hello@yourstudio.com" className="contact__mail" data-link>
            let's build
            <br />
            something
            <span className="contact__cursor">_</span>
          </a>
        </Magnetic>
      </h2>
      <div className="contact__links">
        <a href="mailto:hello@yourstudio.com" data-link>
          hello@yourstudio.com
        </a>
        <span className="contact__sep">/</span>
        <a href="#" data-link>twitter / x</a>
        <span className="contact__sep">/</span>
        <a href="#" data-link>linkedin</a>
        <span className="contact__sep">/</span>
        <a href="#" data-link>github</a>
      </div>
    </section>
  )
}
