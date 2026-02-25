import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

import { findMdxFiles } from './lib/find-mdx-files'

const CONTENT_DIR = path.resolve(process.cwd(), 'content')

const REQUIRED_FIELDS = [
  'title',
  'content_type',
  'confidence',
  'status',
  'last_verified',
  'review_interval_days',
  'source_url',
] as const

function validate(): void {
  const files = findMdxFiles(CONTENT_DIR)

  if (files.length === 0) {
    console.log('⚠ No MDX files found in content/ — skipping validation')
    return
  }

  const errors: string[] = []

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf-8')
    const { data } = matter(raw)
    const relPath = path.relative(process.cwd(), file)

    for (const field of REQUIRED_FIELDS) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        errors.push(`ERROR: ${relPath} — missing '${field}'`)
      }
    }
  }

  if (errors.length > 0) {
    console.error('\n❌ Content validation failed:\n')
    for (const err of errors) {
      console.error(`  ${err}`)
    }
    console.error(`\n${errors.length} error(s) found.\n`)
    process.exit(1)
  }

  console.log(`✓ Content validation passed (${files.length} file(s) checked)`)
}

validate()
