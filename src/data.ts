export interface WorkItem {
  num: string
  name: string
  type: string
  year: string
  url: string
}

export interface CaseStudy {
  tag: string
  year: string
  variant: 'a' | 'b'
  title: string
  desc: string
  metrics: { value: string; label: string }[]
}

export interface Skill {
  num: string
  title: string
  desc: string
}

export const works: WorkItem[] = [
  { num: '01', name: 'Vida Commerce', type: 'e-commerce / storefront', year: '2025', url: 'https://can.hisubhadeep.com/' },
  { num: '02', name: 'SP Studio', type: 'portfolio / video', year: '2025', url: 'https://studio.hisubhadeep.com/' },
  { num: '03', name: 'DigiTwin', type: 'coaching / landing', year: '2024', url: 'https://digitwin.hisubhadeep.com/' },
  { num: '04', name: 'Barrel & Hatchet', type: 'hospitality / brand', year: '2024', url: 'https://barrelandhatchet.hisubhadeep.com/' },
]

export const caseStudies: CaseStudy[] = [
  {
    tag: 'featured',
    year: '2025',
    variant: 'a',
    title: 'Rebuilding checkout for a 40% faster flow',
    desc: 'A ground-up redesign of a multi-step checkout — reducing friction, abandonment and load time across 3 markets.',
    metrics: [
      { value: '-40%', label: 'load time' },
      { value: '+22%', label: 'conversion' },
      { value: '3', label: 'markets' },
    ],
  },
  {
    tag: 'design system',
    year: '2024',
    variant: 'b',
    title: 'A token-driven system used by 30+ engineers',
    desc: 'Designing and shipping a themeable component library that unified 5 products under one accessible language.',
    metrics: [
      { value: '120+', label: 'components' },
      { value: '30+', label: 'engineers' },
      { value: 'AA', label: 'a11y' },
    ],
  },
]

export const skills: Skill[] = [
  { num: '/01', title: 'Design Engineering', desc: 'Bridging Figma and production — pixel-faithful, performant, accessible interfaces.' },
  { num: '/02', title: 'Motion & Interaction', desc: 'Purposeful animation that guides attention and gives interfaces a sense of life.' },
  { num: '/03', title: 'Design Systems', desc: 'Scalable token architectures and component libraries teams actually enjoy using.' },
  { num: '/04', title: 'Creative Dev', desc: 'WebGL, canvas and SVG experiments that turn brands into memorable moments.' },
]

export const stack = ['React', 'Next.js', 'TypeScript', 'GSAP', 'Three.js', 'WebGL', 'Figma', 'Tailwind', 'Framer Motion', 'Node']

export const marqueeItems = ['design systems', 'motion', 'webgl', 'typography', 'interaction', 'frontend']
