import { describe, it, expect, beforeAll } from 'vitest'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

import type { CcoData } from '../src/types/content'

const DATA_DIR = path.resolve(process.cwd(), 'src', 'data')

const ALL_OREGON_COUNTIES = [
  'baker', 'benton', 'clackamas', 'clatsop', 'columbia', 'coos',
  'crook', 'curry', 'deschutes', 'douglas', 'gilliam', 'grant',
  'harney', 'hood river', 'jackson', 'jefferson', 'josephine', 'klamath',
  'lake', 'lane', 'lincoln', 'linn', 'malheur', 'marion',
  'morrow', 'multnomah', 'polk', 'sherman', 'tillamook', 'umatilla',
  'union', 'wallowa', 'wasco', 'washington', 'wheeler', 'yamhill',
]

const MULTI_CCO_COUNTIES: Record<string, { count: number; slugs: string[] }> = {
  clackamas: { count: 2, slugs: ['health-share', 'trillium-tri-county'] },
  curry: { count: 2, slugs: ['advanced-health', 'allcare'] },
  douglas: { count: 3, slugs: ['allcare', 'trillium-sw', 'umpqua'] },
  jackson: { count: 2, slugs: ['allcare', 'jackson-care-connect'] },
  klamath: { count: 2, slugs: ['cascade', 'pacificsource-central-oregon'] },
  linn: { count: 2, slugs: ['intercommunity', 'trillium-sw'] },
  multnomah: { count: 2, slugs: ['health-share', 'trillium-tri-county'] },
  polk: { count: 2, slugs: ['pacificsource-marion-polk', 'yamhill'] },
  washington: { count: 3, slugs: ['health-share', 'trillium-tri-county', 'yamhill'] },
}

const CAREOREGON_AFFILIATES = ['allcare', 'jackson-care-connect', 'columbia-pacific']
const PACIFICSOURCE_AFFILIATES = ['pacificsource-central-oregon', 'pacificsource-gorge', 'pacificsource-marion-polk']

let countyCcoMap: Record<string, CcoData[]>
let ccoContentIndex: Record<string, { checklists: string[]; guides: string[] }>

beforeAll(() => {
  execSync('npx tsx scripts/generate-routes.ts', { stdio: 'pipe' })
  countyCcoMap = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'county-cco-map.json'), 'utf-8'))
  ccoContentIndex = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'cco-content-index.json'), 'utf-8'))
})

describe('county-cco-map round-trip', () => {
  it('contains exactly 36 Oregon counties', () => {
    expect(Object.keys(countyCcoMap)).toHaveLength(36)
  })

  it.each(ALL_OREGON_COUNTIES)('%s returns a non-empty CCO array', (county) => {
    expect(countyCcoMap[county]).toBeDefined()
    expect(countyCcoMap[county].length).toBeGreaterThan(0)
  })
})

describe('multi-CCO county assertions', () => {
  it.each(Object.entries(MULTI_CCO_COUNTIES))(
    '%s has exactly %s CCOs',
    (county, { count, slugs }) => {
      const ccos = countyCcoMap[county]
      expect(ccos).toHaveLength(count)
      const actualSlugs = ccos.map((c) => c.slug).sort()
      expect(actualSlugs).toEqual(slugs.sort())
    }
  )
})

describe('credentialing parent assertions', () => {
  it.each(CAREOREGON_AFFILIATES)('%s has credentialing_parent "careoregon"', (slug) => {
    const allCcos = Object.values(countyCcoMap).flat()
    const cco = allCcos.find((c) => c.slug === slug)
    expect(cco).toBeDefined()
    expect(cco!.credentialing_parent).toBe('careoregon')
  })

  it.each(PACIFICSOURCE_AFFILIATES)('%s has credentialing_parent "pacificsource"', (slug) => {
    const allCcos = Object.values(countyCcoMap).flat()
    const cco = allCcos.find((c) => c.slug === slug)
    expect(cco).toBeDefined()
    expect(cco!.credentialing_parent).toBe('pacificsource')
  })
})

describe('cco-content-index', () => {
  it('contains entries for all 15 CCOs plus Medicare', () => {
    expect(Object.keys(ccoContentIndex).length).toBeGreaterThanOrEqual(16)
  })

  it('includes medicare entry', () => {
    expect(ccoContentIndex['medicare']).toBeDefined()
    expect(ccoContentIndex['medicare'].checklists).toContain('medicare-pecos')
  })
})
