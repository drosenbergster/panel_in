import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import { IntakeForm } from './IntakeForm'

describe('IntakeForm', () => {
  it('renders step 1 (license type) by default', () => {
    render(<IntakeForm onComplete={vi.fn()} />)
    expect(screen.getByText('What is your license type?')).toBeInTheDocument()
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument()
  })

  it('shows LCSW as primary option', () => {
    render(<IntakeForm onComplete={vi.fn()} />)
    expect(screen.getByLabelText(/LCSW/)).toBeInTheDocument()
  })

  it('shows partial support badge for LPC and LMFT', () => {
    render(<IntakeForm onComplete={vi.fn()} />)
    const badges = screen.getAllByText(/Partial support/)
    expect(badges).toHaveLength(2)
  })

  it('disables Next button when no selection made', () => {
    render(<IntakeForm onComplete={vi.fn()} />)
    const nextBtn = screen.getByRole('button', { name: /next/i })
    expect(nextBtn).toBeDisabled()
  })

  it('advances to step 2 after selecting license and clicking Next', () => {
    render(<IntakeForm onComplete={vi.fn()} />)
    fireEvent.click(screen.getByLabelText(/LCSW/))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText('Which counties will you serve?')).toBeInTheDocument()
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument()
  })

  it('shows all 36 Oregon counties in step 2', () => {
    render(<IntakeForm onComplete={vi.fn()} />)
    fireEvent.click(screen.getByLabelText(/LCSW/))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(36)
  })

  it('shows selected count in step 2', () => {
    render(<IntakeForm onComplete={vi.fn()} />)
    fireEvent.click(screen.getByLabelText(/LCSW/))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    fireEvent.click(screen.getByLabelText(/Baker/))
    expect(screen.getByText('1 selected')).toBeInTheDocument()
  })

  it('advances to step 3 and shows payer options', () => {
    render(<IntakeForm onComplete={vi.fn()} />)
    fireEvent.click(screen.getByLabelText(/LCSW/))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    fireEvent.click(screen.getByLabelText(/Baker/))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText('Which payers are you targeting?')).toBeInTheDocument()
    expect(screen.getByLabelText(/Medicaid/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Medicare/)).toBeInTheDocument()
  })

  it('calls onComplete with wizard state on final submit', () => {
    const onComplete = vi.fn()
    render(<IntakeForm onComplete={onComplete} />)

    fireEvent.click(screen.getByLabelText(/LCSW/))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))

    fireEvent.click(screen.getByLabelText(/Baker/))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))

    fireEvent.click(screen.getByLabelText(/Medicaid/))
    fireEvent.click(screen.getByRole('button', { name: /see my pathway/i }))

    expect(onComplete).toHaveBeenCalledWith({
      licenseType: 'lcsw',
      counties: ['baker'],
      payers: ['medicaid'],
    })
  })

  it('Back button returns to previous step', () => {
    render(<IntakeForm onComplete={vi.fn()} />)
    fireEvent.click(screen.getByLabelText(/LCSW/))
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument()
  })
})
