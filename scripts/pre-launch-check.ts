import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

const CONTENT_DIR = path.resolve(process.cwd(), 'content')

interface CheckResult {
  file: string
  title: string
  sourceUrl: string
  confidence: string
  issues: string[]
}

function findMdxFiles(dir: string): string[] {
  const results: string[] = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...findMdxFiles(fullPath))
    else if (entry.name.endsWith('.mdx')) results.push(fullPath)
  }
  return results
}

function runChecks(): void {
  const files = findMdxFiles(CONTENT_DIR)
  const results: CheckResult[] = []
  let hasIssues = false

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf-8')
    const { data } = matter(raw)
    const relPath = path.relative(process.cwd(), file)
    const issues: string[] = []

    if (!data.source_url) issues.push('Missing source_url')
    if (!data.last_verified) issues.push('Missing last_verified')
    if (!data.confidence) issues.push('Missing confidence')
    if (data.confidence === 'gap') issues.push('Confidence level is "gap" — needs verification')

    results.push({
      file: relPath,
      title: data.title ?? 'Unknown',
      sourceUrl: data.source_url ?? 'MISSING',
      confidence: data.confidence ?? 'MISSING',
      issues,
    })

    if (issues.length > 0) hasIssues = true
  }

  console.log('=== Pre-Launch Acceptance Gate ===\n')
  console.log(`Total content files: ${results.length}\n`)

  console.log('--- Source URL Cross-Check ---')
  for (const r of results) {
    const status = r.sourceUrl === 'MISSING' ? '❌' : '🔗'
    console.log(`  ${status} ${r.title}: ${r.sourceUrl}`)
  }

  console.log('\n--- Confidence Gaps ---')
  const gaps = results.filter((r) => r.confidence === 'gap')
  if (gaps.length === 0) {
    console.log('  ✅ No confidence gaps')
  } else {
    for (const r of gaps) {
      console.log(`  ⚠️  ${r.title} (${r.file})`)
    }
  }

  console.log('\n--- Issues ---')
  const withIssues = results.filter((r) => r.issues.length > 0)
  if (withIssues.length === 0) {
    console.log('  ✅ No issues found')
  } else {
    for (const r of withIssues) {
      console.log(`  ${r.file}:`)
      for (const issue of r.issues) {
        console.log(`    - ${issue}`)
      }
    }
  }

  console.log('\n--- Manual Verification Checklist ---')
  console.log('  [ ] Primary Source Cross-Check: Verify each source_url resolves and matches guidance')
  console.log('  [ ] Jenny Dry Run: Walk full pathway (9 CCOs + Medicare + TriWest) through Panel In')
  console.log('  [ ] Contact Verification: Test all phone numbers, emails, portal URLs')
  console.log('  [ ] Statutory Citation Check: Verify ORS/OAR citations against oregonlegislature.gov')
  console.log('  [ ] npm audit: Run `npm audit` and confirm zero critical/high vulnerabilities')

  if (hasIssues) {
    console.log('\n⚠️  Issues found — review before launch')
    process.exit(1)
  } else {
    console.log('\n✅ Automated checks passed — proceed with manual verification')
  }
}

runChecks()
