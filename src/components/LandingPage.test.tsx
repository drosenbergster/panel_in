import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/router', () => ({
  useRouter: () => ({ push: vi.fn(), pathname: '/' }),
}))

import Home from '@/pages/index'

describe('Landing page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders product introduction heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Oregon therapist credentialing/
    )
  })

  it('shows "Get Started" CTA when no wizard state exists', () => {
    render(<Home />)
    expect(screen.getByRole('link', { name: /get started/i })).toHaveAttribute(
      'href',
      '/start'
    )
  })

  it('shows "Continue Your Pathway" when wizard state exists', () => {
    localStorage.setItem(
      'wizardState',
      JSON.stringify({ licenseType: 'lcsw', counties: ['baker'], payers: ['medicaid'] })
    )
    render(<Home />)
    expect(
      screen.getByRole('link', { name: /continue your pathway/i })
    ).toHaveAttribute('href', '/start')
  })

  it('shows "Start Over" button when wizard state exists', () => {
    localStorage.setItem(
      'wizardState',
      JSON.stringify({ licenseType: 'lcsw', counties: ['baker'], payers: ['medicaid'] })
    )
    render(<Home />)
    expect(screen.getByRole('button', { name: /start over/i })).toBeInTheDocument()
  })

  it('renders the three value propositions', () => {
    render(<Home />)
    expect(screen.getByText("Who it's for")).toBeInTheDocument()
    expect(screen.getByText('What it does')).toBeInTheDocument()
    expect(screen.getByText('Why it exists')).toBeInTheDocument()
  })

  it('renders how-it-works steps', () => {
    render(<Home />)
    expect(screen.getByText('Answer three questions')).toBeInTheDocument()
    expect(screen.getByText('Get your pathway')).toBeInTheDocument()
    expect(screen.getByText('Work through each checklist')).toBeInTheDocument()
  })

  it('all CTA links point to /start', () => {
    render(<Home />)
    const links = screen.getAllByRole('link')
    const startLinks = links.filter((l) => l.getAttribute('href') === '/start')
    expect(startLinks.length).toBeGreaterThan(0)
  })
})
