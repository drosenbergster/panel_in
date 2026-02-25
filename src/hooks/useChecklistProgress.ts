import { useCallback } from 'react'

import { useLocalStorage } from './useLocalStorage'

import type { ChecklistProgress } from '@/types/content'

export function useChecklistProgress() {
  const [progress, setProgress, hydrated] = useLocalStorage<ChecklistProgress>(
    'checklistProgress',
    {}
  )

  const toggle = useCallback(
    (itemId: string) => {
      setProgress((prev) => ({
        ...prev,
        [itemId]: !prev[itemId],
      }))
    },
    [setProgress]
  )

  const isComplete = useCallback(
    (itemId: string) => !!progress[itemId],
    [progress]
  )

  const completedCount = useCallback(
    (prefix: string) =>
      Object.entries(progress).filter(
        ([key, done]) => key.startsWith(prefix) && done
      ).length,
    [progress]
  )

  const resetAll = useCallback(() => {
    setProgress({})
  }, [setProgress])

  return { progress, toggle, isComplete, completedCount, resetAll, hydrated }
}
