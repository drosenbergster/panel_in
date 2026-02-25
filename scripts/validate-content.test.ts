import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const CONTENT_DIR = path.resolve(process.cwd(), 'content')
const TEST_FILE = path.join(CONTENT_DIR, 'cco', '_test-validation.mdx')

function runValidation(): { exitCode: number; output: string } {
  try {
    const output = execSync('npx tsx scripts/validate-content.ts', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    return { exitCode: 0, output }
  } catch (err: unknown) {
    const error = err as { status: number; stderr: string }
    return { exitCode: error.status, output: error.stderr }
  }
}

describe('validate-content', () => {
  it('passes with valid MDX files', () => {
    const result = runValidation()
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('Content validation passed')
  })

  it('fails with missing required fields and shows file path', () => {
    fs.writeFileSync(TEST_FILE, '---\ntitle: "Bad"\n---\nContent\n')
    try {
      const result = runValidation()
      expect(result.exitCode).toBe(1)
      expect(result.output).toContain('_test-validation.mdx')
      expect(result.output).toContain("missing 'source_url'")
    } finally {
      fs.unlinkSync(TEST_FILE)
    }
  })
})
