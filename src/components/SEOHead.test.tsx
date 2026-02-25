import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('next/head', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

import { SEOHead, formatTitle } from './SEOHead'

describe('SEOHead', () => {
  it('formats title with site name suffix', () => {
    expect(formatTitle('Test Page')).toBe('Test Page — Panel In')
  })

  it('does not double-suffix when title is the site name', () => {
    expect(formatTitle('Panel In')).toBe('Panel In')
  })

  it('renders without crashing', () => {
    expect(() =>
      render(<SEOHead title="Test" description="A description" />)
    ).not.toThrow()
  })

  it('accepts optional path and ogType props', () => {
    expect(() =>
      render(
        <SEOHead
          title="Test"
          description="Desc"
          path="/about"
          ogType="article"
        />
      )
    ).not.toThrow()
  })
})
