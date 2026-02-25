import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { SourceCitation } from './SourceCitation'

describe('SourceCitation', () => {
  it('renders link with default label for primary source', () => {
    render(<SourceCitation url="https://example.com" type="primary" />)
    const link = screen.getByRole('link', { name: 'Primary Source' })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders custom label when provided', () => {
    render(
      <SourceCitation url="https://example.com" type="secondary" label="CCO Website" />
    )
    expect(screen.getByRole('link', { name: 'CCO Website' })).toBeInTheDocument()
  })

  it('renders source type badge', () => {
    render(<SourceCitation url="https://example.com" type="community_verified" />)
    expect(screen.getByText('community verified')).toBeInTheDocument()
  })
})
