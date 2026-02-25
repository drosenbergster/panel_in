import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useState } from 'react'

import { OverwhelmMitigation } from './OverwhelmMitigation'

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: (_key: string, init: boolean) => {
    const [val, setVal] = useState(init)
    return [val, setVal, true]
  },
}))

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('OverwhelmMitigation', () => {
  it('renders heading', () => {
    render(<OverwhelmMitigation />)
    expect(
      screen.getByText('Before you begin — a note on pacing')
    ).toBeInTheDocument()
  })

  it('shows content when not collapsed', () => {
    render(<OverwhelmMitigation />)
    expect(
      screen.getByText(/You don't need to do them all at once/)
    ).toBeInTheDocument()
  })

  it('has aria-expanded attribute', () => {
    render(<OverwhelmMitigation />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses content on button click', () => {
    render(<OverwhelmMitigation />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.queryByText(/You don't need to do them all at once/)
    ).not.toBeInTheDocument()
  })
})
