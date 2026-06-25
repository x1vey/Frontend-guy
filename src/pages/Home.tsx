import Hero from '../components/Hero'
import Work from '../components/Work'
import Cases from '../components/Cases'
import Skills from '../components/Skills'
import About from '../components/About'
import Contact from '../components/Contact'
import { useShell } from '../shell-context'

export default function Home() {
  const { revealed, clock } = useShell()
  return (
    <>
      <Hero revealed={revealed} clock={clock} />
      <Work />
      <Cases />
      <Skills />
      <About />
      <Contact />
    </>
  )
}
