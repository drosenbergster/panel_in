import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

import type { ContentFrontmatter, CcoData } from '../src/types/content'

import { findMdxFiles } from './lib/find-mdx-files'

const CONTENT_DIR = path.resolve(process.cwd(), 'content')
const OUTPUT_DIR = path.resolve(process.cwd(), 'src', 'data')

function loadAllFrontmatter(): { file: string; data: ContentFrontmatter }[] {
  const files = findMdxFiles(CONTENT_DIR)
  return files.map((file) => {
    const raw = fs.readFileSync(file, 'utf-8')
    const { data } = matter(raw)
    return { file, data: data as ContentFrontmatter }
  })
}

function generateCountyCcoMap(
  items: { file: string; data: ContentFrontmatter }[]
): Record<string, CcoData[]> {
  const map: Record<string, CcoData[]> = {}
  const ccoItems = items.filter((i) => i.data.content_type === 'cco_checklist')

  for (const item of ccoItems) {
    const ccoData: CcoData = {
      slug: item.data.slug,
      title: item.data.title,
      counties: item.data.counties ?? [],
      credentialing_parent: item.data.credentialing_parent,
      confidence: item.data.confidence,
    }

    for (const county of ccoData.counties) {
      const key = county.toLowerCase()
      if (!map[key]) map[key] = []
      if (!map[key].some((c) => c.slug === ccoData.slug)) {
        map[key].push(ccoData)
      }
    }
  }

  return map
}

function generateCcoContentIndex(
  items: { file: string; data: ContentFrontmatter }[]
): Record<string, { checklists: string[]; guides: string[] }> {
  const index: Record<string, { checklists: string[]; guides: string[] }> = {}

  for (const item of items) {
    if (item.data.content_type === 'cco_checklist' && item.data.cco) {
      if (!index[item.data.cco]) index[item.data.cco] = { checklists: [], guides: [] }
      index[item.data.cco].checklists.push(item.data.slug)
    }
    if (item.data.content_type === 'guide' && item.data.cco) {
      if (!index[item.data.cco]) index[item.data.cco] = { checklists: [], guides: [] }
      index[item.data.cco].guides.push(item.data.slug)
    }
  }

  return index
}

interface PrerequisiteEntry {
  slug: string
  title: string
  confidence: string
}

const PREREQUISITE_ORDER = [
  'npi-setup',
  'caqh-walkthrough',
  'oha-mmis-enrollment',
  'malpractice-insurance',
  'taxonomy-codes',
  'credential-verification',
]

function generatePrerequisites(
  items: { file: string; data: ContentFrontmatter }[]
): PrerequisiteEntry[] {
  const prereqs = items
    .filter((i) => i.data.prerequisite === true)
    .map((i) => ({
      slug: i.data.slug,
      title: i.data.title,
      confidence: i.data.confidence,
    }))

  prereqs.sort((a, b) => {
    const ai = PREREQUISITE_ORDER.indexOf(a.slug)
    const bi = PREREQUISITE_ORDER.indexOf(b.slug)
    const aOrder = ai === -1 ? PREREQUISITE_ORDER.length : ai
    const bOrder = bi === -1 ? PREREQUISITE_ORDER.length : bi
    return aOrder - bOrder
  })

  return prereqs
}

function generate(): void {
  const items = loadAllFrontmatter()

  if (items.length === 0) {
    console.log('⚠ No MDX files found — generating empty route data')
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const countyCcoMap = generateCountyCcoMap(items)
  const ccoContentIndex = generateCcoContentIndex(items)
  const prerequisites = generatePrerequisites(items)

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'county-cco-map.json'),
    JSON.stringify(countyCcoMap, null, 2)
  )
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'cco-content-index.json'),
    JSON.stringify(ccoContentIndex, null, 2)
  )
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'prerequisites.json'),
    JSON.stringify(prerequisites, null, 2)
  )

  const countyCount = Object.keys(countyCcoMap).length
  const ccoCount = Object.keys(ccoContentIndex).length
  const prereqCount = prerequisites.length

  console.log(`✓ Route data generated:`)
  console.log(`  county-cco-map.json    (${countyCount} counties)`)
  console.log(`  cco-content-index.json (${ccoCount} CCOs)`)
  console.log(`  prerequisites.json     (${prereqCount} prerequisites)`)
}

generate()
