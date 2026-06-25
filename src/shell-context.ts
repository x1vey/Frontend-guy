import { createContext, useContext } from 'react'

interface ShellContextValue {
  /** True once the intro loader has finished. */
  revealed: boolean
  /** Live local-time string for meta rows. */
  clock: string
}

export const ShellContext = createContext<ShellContextValue>({ revealed: true, clock: '—' })

export const useShell = () => useContext(ShellContext)
