import { useCallback, useMemo } from 'react'

import { useLocalStorage } from './useLocalStorage'

import type { WizardState, CcoData } from '@/types/content'

import countyCcoMap from '@/data/county-cco-map.json'

const EMPTY_WIZARD: WizardState = { licenseType: '', counties: [], payers: [] }

export function useWizardState() {
  const [wizardState, setWizardState, hydrated] = useLocalStorage<WizardState>('wizardState', EMPTY_WIZARD)

  const isComplete = wizardState.licenseType !== ''
    && wizardState.counties.length > 0
    && wizardState.payers.length > 0

  const pathway = useMemo(() => {
    if (!isComplete) return []
    return derivePathway(wizardState.counties)
  }, [isComplete, wizardState.counties])

  const reset = useCallback(() => {
    setWizardState(EMPTY_WIZARD)
  }, [setWizardState])

  return { wizardState, setWizardState, isComplete, pathway, reset, hydrated }
}

export function derivePathway(selectedCounties: string[]): CcoData[] {
  const map = countyCcoMap as Record<string, CcoData[]>
  const seen = new Set<string>()
  const ccos: CcoData[] = []

  for (const county of selectedCounties) {
    const key = county.toLowerCase()
    const countyCcos = map[key]
    if (!countyCcos) continue

    for (const cco of countyCcos) {
      if (!seen.has(cco.slug)) {
        seen.add(cco.slug)
        ccos.push(cco)
      }
    }
  }

  // Sort by county coverage count (descending) — most coverage first
  ccos.sort((a, b) => {
    const aCount = a.counties.filter((c) => selectedCounties.includes(c)).length
    const bCount = b.counties.filter((c) => selectedCounties.includes(c)).length
    return bCount - aCount
  })

  return ccos
}
