import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { ConfidenceBadge } from './ConfidenceBadge'

describe('ConfidenceBadge', () => {
  it('renders "Verified" for verified level', () => {
    render(<ConfidenceBadge level="verified" />)
    expect(screen.getByText('Verified')).toBeInTheDocument()
  })

  it('renders "Verify with CCO" for partial level', () => {
    render(<ConfidenceBadge level="partial" />)
    expect(screen.getByText('Verify with CCO')).toBeInTheDocument()
  })

  it('renders "Not yet available" for gap level', () => {
    render(<ConfidenceBadge level="gap" />)
    expect(screen.getByText('Not yet available')).toBeInTheDocument()
  })
})
