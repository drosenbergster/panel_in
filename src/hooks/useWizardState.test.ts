import { describe, it, expect } from 'vitest'

import { derivePathway } from './useWizardState'

describe('derivePathway', () => {
  it('returns empty array for empty counties', () => {
    expect(derivePathway([])).toEqual([])
  })

  it('returns correct CCO for a single-CCO county', () => {
    const result = derivePathway(['baker'])
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('eocco')
  })

  it('returns multiple CCOs for multi-CCO county', () => {
    const result = derivePathway(['douglas'])
    expect(result).toHaveLength(3)
    const slugs = result.map((c) => c.slug).sort()
    expect(slugs).toEqual(['allcare', 'trillium-sw', 'umpqua'])
  })

  it('deduplicates CCOs across multiple counties', () => {
    const result = derivePathway(['baker', 'gilliam', 'grant'])
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('eocco')
  })

  it('sorts by coverage count descending', () => {
    const counties = [
      'baker', 'gilliam', 'grant', 'harney', 'lake', 'malheur',
      'morrow', 'sherman', 'umatilla', 'union', 'wallowa', 'wheeler',
      'lane',
    ]
    const result = derivePathway(counties)
    expect(result[0].slug).toBe('eocco')
    expect(result[1].slug).toBe('trillium-sw')
  })

  it('includes credentialing_parent data', () => {
    const result = derivePathway(['jackson'])
    const allcare = result.find((c) => c.slug === 'allcare')
    const jcc = result.find((c) => c.slug === 'jackson-care-connect')
    expect(allcare?.credentialing_parent).toBe('careoregon')
    expect(jcc?.credentialing_parent).toBe('careoregon')
  })

  it('handles the full Jenny scenario (21 counties, 9 CCOs)', () => {
    const jennyCounties = [
      'sherman', 'gilliam', 'morrow', 'wheeler', 'grant',
      'malheur', 'harney', 'lake', 'baker', 'umatilla', 'union', 'wallowa',
      'lane', 'linn', 'douglas',
      'josephine', 'jackson',
      'lincoln',
      'wasco',
      'polk',
      'tillamook',
    ]
    const result = derivePathway(jennyCounties)
    const slugs = result.map((c) => c.slug)

    expect(slugs).toContain('eocco')
    expect(slugs).toContain('trillium-sw')
    expect(slugs).toContain('allcare')
    expect(slugs).toContain('intercommunity')
    expect(slugs).toContain('pacificsource-gorge')
    expect(slugs).toContain('pacificsource-marion-polk')
    expect(slugs).toContain('umpqua')
    expect(slugs).toContain('jackson-care-connect')
    expect(slugs).toContain('columbia-pacific')
    expect(slugs).toContain('yamhill')

    // EOCCO covers 12 of Jenny's counties — should be first
    expect(result[0].slug).toBe('eocco')
  })
})
