import { useCallback } from 'react'

import { useLocalStorage } from './useLocalStorage'

type Annotations = Record<string, string>

export function useAnnotations() {
  const [annotations, setAnnotations, hydrated] =
    useLocalStorage<Annotations>('annotations', {})

  const getNote = useCallback(
    (itemId: string) => annotations[itemId] ?? '',
    [annotations]
  )

  const setNote = useCallback(
    (itemId: string, note: string) => {
      setAnnotations((prev) => {
        if (!note) {
          const next = { ...prev }
          delete next[itemId]
          return next
        }
        return { ...prev, [itemId]: note }
      })
    },
    [setAnnotations]
  )

  const clearAll = useCallback(() => {
    setAnnotations({})
  }, [setAnnotations])

  return { getNote, setNote, clearAll, hydrated }
}
