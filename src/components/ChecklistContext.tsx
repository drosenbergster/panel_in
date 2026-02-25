import { createContext, useContext, useCallback } from 'react'

import { useChecklistProgress } from '@/hooks/useChecklistProgress'
import { useAnnotations } from '@/hooks/useAnnotations'
import { useSaveToast } from './SaveToast'

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
  const { getNote, setNote: rawSetNote } = useAnnotations()
  const { showSaved } = useSaveToast()

  const toggleWithToast = useCallback(
    (id: string) => {
      toggle(id)
      showSaved()
    },
    [toggle, showSaved]
  )

  const setNoteWithToast = useCallback(
    (id: string, note: string) => {
      rawSetNote(id, note)
      showSaved()
    },
    [rawSetNote, showSaved]
  )

  return (
    <ChecklistCtx.Provider
      value={{
        slug,
        toggle: toggleWithToast,
        isComplete,
        completedCount,
        resetAll,
        getNote,
        setNote: setNoteWithToast,
        hydrated,
      }}
    >
      {children}
    </ChecklistCtx.Provider>
  )
}

export function useChecklist(): ChecklistContextValue | null {
  return useContext(ChecklistCtx)
}
