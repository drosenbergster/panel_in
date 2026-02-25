import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Layout } from './Layout'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

describe('Layout', () => {
  it('renders header with site title', () => {
    render(<Layout>content</Layout>)
    expect(screen.getByText('Panel In')).toBeInTheDocument()
  })

  it('renders navigation link to pathway', () => {
    render(<Layout>content</Layout>)
    expect(screen.getByText('My Pathway')).toBeInTheDocument()
  })

  it('renders children in main content area', () => {
    render(<Layout><p>Test content</p></Layout>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders footer', () => {
    render(<Layout>content</Layout>)
    expect(screen.getByText(/Oregon therapist credentialing guidance/)).toBeInTheDocument()
  })
})
