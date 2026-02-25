import { describe, it, expect } from 'vitest'

import { getContentBySlug, getAllContentSlugs } from './content'

describe('getAllContentSlugs', () => {
  it('returns all CCO slugs', () => {
    const slugs = getAllContentSlugs('cco')
    expect(slugs.length).toBeGreaterThanOrEqual(15)
    expect(slugs).toContain('eocco')
    expect(slugs).toContain('allcare')
    expect(slugs).toContain('health-share')
  })

  it('returns empty array for nonexistent directory', () => {
    expect(getAllContentSlugs('nonexistent')).toEqual([])
  })
})

describe('getContentBySlug', () => {
  it('returns source and frontmatter for eocco', () => {
    const { source, frontmatter } = getContentBySlug('cco', 'eocco')
    expect(source).toBeDefined()
    expect(frontmatter.title).toBe('EOCCO Provider Enrollment')
    expect(frontmatter.slug).toBe('eocco')
    expect(frontmatter.content_type).toBe('cco_checklist')
    expect(frontmatter.confidence).toBeDefined()
  })

  it('returns frontmatter with all required trust fields', () => {
    const { frontmatter } = getContentBySlug('cco', 'eocco')
    expect(frontmatter.last_verified).toBeDefined()
    expect(frontmatter.source_url).toBeDefined()
    expect(frontmatter.source_type).toBeDefined()
    expect(frontmatter.review_interval_days).toBeDefined()
  })

  it('throws for nonexistent slug', () => {
    expect(() => getContentBySlug('cco', 'nonexistent')).toThrow()
  })
})
