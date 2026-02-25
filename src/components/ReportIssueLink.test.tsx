import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { ReportIssueLink } from './ReportIssueLink'

describe('ReportIssueLink', () => {
  it('renders mailto link with pre-populated context', () => {
    render(<ReportIssueLink pageTitle="EOCCO" pageSlug="eocco" />)
    const link = screen.getByRole('link', { name: /report an issue/i })
    expect(link).toHaveAttribute('href')
    const href = link.getAttribute('href')!
    expect(href).toContain('mailto:feedback@panelin.org')
    expect(href).toContain('EOCCO')
    expect(href).toContain('eocco')
  })

  it('has 44px minimum touch target', () => {
    render(<ReportIssueLink pageTitle="EOCCO" pageSlug="eocco" />)
    const link = screen.getByRole('link')
    expect(link.className).toContain('min-h-[44px]')
  })
})
