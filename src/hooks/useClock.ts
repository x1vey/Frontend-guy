import { useEffect, useState } from 'react'

/** Live local clock string, e.g. "local — 14:03:22". */
export function useClock(): string {
  const [label, setLabel] = useState('—')

  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setLabel(`local — ${t}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return label
}
