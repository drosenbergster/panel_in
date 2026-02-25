import { createContext, useContext } from 'react'

import { useChecklistProgress } from '@/hooks/useChecklistProgress'
import { useAnnotations } from '@/hooks/useAnnotations'

import type { ReactNode } from 'react'

interface ChecklistContextValue {
  slug: string
  toggle: (id: string) => void
  isComplete: (id: string) => boolean
  completedCount: (prefix: string) => number
  resetAll: () => void
  getNote: (id: string) => string
  setNote: (id: string, note: string) => void
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
  const { getNote, setNote } = useAnnotations()

  return (
    <ChecklistCtx.Provider
      value={{ slug, toggle, isComplete, completedCount, resetAll, getNote, setNote, hydrated }}
    >
      {children}
    </ChecklistCtx.Provider>
  )
}

export function useChecklist(): ChecklistContextValue | null {
  return useContext(ChecklistCtx)
}
