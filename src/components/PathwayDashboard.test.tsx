import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { PathwayDashboard, groupByCredentialing } from './PathwayDashboard'

import type { CcoData, WizardState } from '@/types/content'

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: () => [false, vi.fn(), true],
}))

const makeCco = (slug: string, title: string, counties: string[], opts?: Partial<CcoData>): CcoData => ({
  slug,
  title,
  counties,
  confidence: 'partial',
  ...opts,
})

describe('groupByCredentialing', () => {
  it('groups CareOregon-affiliated CCOs together', () => {
    const pathway: CcoData[] = [
      makeCco('eocco', 'EOCCO', ['baker'], {}),
      makeCco('allcare', 'AllCare', ['jackson'], { credentialing_parent: 'careoregon' }),
      makeCco('jackson-care-connect', 'Jackson Care Connect', ['jackson'], { credentialing_parent: 'careoregon' }),
    ]
    const groups = groupByCredentialing(pathway)
    expect(groups).toHaveLength(2)

    const coGroup = groups.find((g) => g.key === 'careoregon')
    expect(coGroup).toBeDefined()
    expect(coGroup!.ccos).toHaveLength(2)
    expect(coGroup!.label).toBe('CareOregon Credentialing')
  })

  it('groups PacificSource CCOs together', () => {
    const pathway: CcoData[] = [
      makeCco('pacificsource-gorge', 'PacificSource Gorge', ['hood river'], { credentialing_parent: 'pacificsource' }),
      makeCco('pacificsource-marion-polk', 'PacificSource Marion Polk', ['marion'], { credentialing_parent: 'pacificsource' }),
    ]
    const groups = groupByCredentialing(pathway)
    expect(groups).toHaveLength(1)
    expect(groups[0].key).toBe('pacificsource')
    expect(groups[0].ccos).toHaveLength(2)
  })

  it('keeps standalone CCOs ungrouped', () => {
    const pathway: CcoData[] = [
      makeCco('eocco', 'EOCCO', ['baker']),
      makeCco('umpqua', 'Umpqua', ['douglas']),
    ]
    const groups = groupByCredentialing(pathway)
    expect(groups).toHaveLength(2)
    expect(groups.every((g) => g.type === 'standalone')).toBe(true)
  })

  it('preserves CareOregon before PacificSource order', () => {
    const pathway: CcoData[] = [
      makeCco('pacificsource-gorge', 'PS Gorge', ['hood river'], { credentialing_parent: 'pacificsource' }),
      makeCco('allcare', 'AllCare', ['jackson'], { credentialing_parent: 'careoregon' }),
    ]
    const groups = groupByCredentialing(pathway)
    expect(groups[0].key).toBe('careoregon')
    expect(groups[1].key).toBe('pacificsource')
  })

  it('returns empty array for empty pathway', () => {
    expect(groupByCredentialing([])).toEqual([])
  })

  it('handles all-grouped pathway (no standalone)', () => {
    const pathway: CcoData[] = [
      makeCco('allcare', 'AllCare', ['jackson'], { credentialing_parent: 'careoregon' }),
      makeCco('jackson-care-connect', 'JCC', ['jackson'], { credentialing_parent: 'careoregon' }),
    ]
    const groups = groupByCredentialing(pathway)
    expect(groups).toHaveLength(1)
    expect(groups[0].type).toBe('group')
  })
})

describe('PathwayDashboard', () => {
  const wizardState: WizardState = {
    licenseType: 'lcsw',
    counties: ['baker', 'jackson', 'lane'],
    payers: ['medicaid', 'medicare'],
  }

  const pathway: CcoData[] = [
    makeCco('eocco', 'EOCCO', ['baker'], { confidence: 'verified' }),
    makeCco('allcare', 'AllCare', ['jackson'], { credentialing_parent: 'careoregon' }),
    makeCco('trillium-sw', 'Trillium South/West', ['lane']),
  ]

  it('renders summary line with correct counts', () => {
    render(
      <PathwayDashboard
        wizardState={wizardState}
        pathway={pathway}
        onChangeSelections={vi.fn()}
      />
    )
    expect(screen.getByText(/4 applications covering 3 counties/)).toBeInTheDocument()
  })

  it('renders all CCO titles', () => {
    render(
      <PathwayDashboard
        wizardState={wizardState}
        pathway={pathway}
        onChangeSelections={vi.fn()}
      />
    )
    expect(screen.getByText('EOCCO')).toBeInTheDocument()
    expect(screen.getByText('AllCare')).toBeInTheDocument()
    expect(screen.getByText('Trillium South/West')).toBeInTheDocument()
  })

  it('shows CareOregon group header', () => {
    render(
      <PathwayDashboard
        wizardState={wizardState}
        pathway={pathway}
        onChangeSelections={vi.fn()}
      />
    )
    expect(screen.getByText('CareOregon Credentialing')).toBeInTheDocument()
  })

  it('shows Medicare section when payer selected', () => {
    render(
      <PathwayDashboard
        wizardState={wizardState}
        pathway={pathway}
        onChangeSelections={vi.fn()}
      />
    )
    expect(
      screen.getByText('Medicare Provider Enrollment (PECOS)')
    ).toBeInTheDocument()
  })

  it('hides Medicare section when not selected', () => {
    render(
      <PathwayDashboard
        wizardState={{ ...wizardState, payers: ['medicaid'] }}
        pathway={pathway}
        onChangeSelections={vi.fn()}
      />
    )
    expect(
      screen.queryByText('Medicare Provider Enrollment (PECOS)')
    ).not.toBeInTheDocument()
  })

  it('renders overwhelm mitigation block', () => {
    render(
      <PathwayDashboard
        wizardState={wizardState}
        pathway={pathway}
        onChangeSelections={vi.fn()}
      />
    )
    expect(
      screen.getByText('Before you begin — a note on pacing')
    ).toBeInTheDocument()
  })

  it('renders Change selections button', () => {
    render(
      <PathwayDashboard
        wizardState={wizardState}
        pathway={pathway}
        onChangeSelections={vi.fn()}
      />
    )
    expect(
      screen.getByRole('button', { name: /change selections/i })
    ).toBeInTheDocument()
  })
})
