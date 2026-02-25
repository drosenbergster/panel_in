import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { CcoCard } from './CcoCard'

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

describe('CcoCard', () => {
  it('renders CCO title as link and index', () => {
    render(
      <ul>
        <CcoCard
          cco={{
            slug: 'eocco',
            title: 'EOCCO',
            counties: ['baker', 'grant', 'malheur'],
            confidence: 'verified',
          }}
          index={1}
          selectedCounties={['baker', 'grant']}
        />
      </ul>
    )
    const link = screen.getByRole('link', { name: 'EOCCO' })
    expect(link).toHaveAttribute('href', '/pathway/eocco')
    expect(screen.getByText('1.')).toBeInTheDocument()
  })

  it('shows matching county count', () => {
    render(
      <ul>
        <CcoCard
          cco={{
            slug: 'eocco',
            title: 'EOCCO',
            counties: ['baker', 'grant', 'malheur'],
            confidence: 'verified',
          }}
          index={1}
          selectedCounties={['baker', 'grant']}
        />
      </ul>
    )
    expect(screen.getByText(/Covers 2 of your counties/)).toBeInTheDocument()
  })

  it('shows confidence badge', () => {
    render(
      <ul>
        <CcoCard
          cco={{
            slug: 'eocco',
            title: 'EOCCO',
            counties: ['baker'],
            confidence: 'partial',
          }}
          index={1}
          selectedCounties={['baker']}
        />
      </ul>
    )
    expect(screen.getByText('partial')).toBeInTheDocument()
  })

  it('handles single county correctly', () => {
    render(
      <ul>
        <CcoCard
          cco={{
            slug: 'eocco',
            title: 'EOCCO',
            counties: ['baker'],
            confidence: 'verified',
          }}
          index={1}
          selectedCounties={['baker']}
        />
      </ul>
    )
    expect(screen.getByText(/Covers 1 of your county/)).toBeInTheDocument()
  })
})
