import { useState, useEffect, useCallback, createContext, useContext } from 'react'

import type { ReactNode } from 'react'

interface SaveToastContextValue {
  showSaved: () => void
}

const SaveToastCtx = createContext<SaveToastContextValue>({ showSaved: () => {} })

export function useSaveToast() {
  return useContext(SaveToastCtx)
}

export function SaveToastProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)

  const showSaved = useCallback(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(timer)
  }, [visible])

  return (
    <SaveToastCtx.Provider value={{ showSaved }}>
      {children}
      {visible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg transition-opacity"
        >
          Saved
        </div>
      )}
    </SaveToastCtx.Provider>
  )
}
