import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { UnderReviewBanner } from './UnderReviewBanner'

describe('UnderReviewBanner', () => {
  it('renders alert with review message', () => {
    render(<UnderReviewBanner />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/Content under review/)).toBeInTheDocument()
  })

  it('instructs user to verify with CCO', () => {
    render(<UnderReviewBanner />)
    expect(screen.getByText(/verify details directly with the CCO/i)).toBeInTheDocument()
  })
})
