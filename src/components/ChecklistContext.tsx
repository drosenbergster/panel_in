import { createContext, useContext } from 'react'

import { useChecklistProgress } from '@/hooks/useChecklistProgress'

import type { ReactNode } from 'react'

interface ChecklistContextValue {
  slug: string
  toggle: (id: string) => void
  isComplete: (id: string) => boolean
  completedCount: (prefix: string) => number
  resetAll: () => void
  hydrated: boolean
}

const ChecklistCtx = createContext<ChecklistContextValue | null>(null)

interface ChecklistProviderProps {
  slug: string
  children: ReactNode
}

export function ChecklistProvider({ slug, children }: ChecklistProviderProps) {
  const { toggle, isComplete, completedCount, resetAll, hydrated } =
    useChecklistProgress()

  return (
    <ChecklistCtx.Provider
      value={{ slug, toggle, isComplete, completedCount, resetAll, hydrated }}
    >
      {children}
    </ChecklistCtx.Provider>
  )
}

export function useChecklist(): ChecklistContextValue | null {
  return useContext(ChecklistCtx)
}
