import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useChecklistProgress } from './useChecklistProgress'

beforeEach(() => {
  localStorage.clear()
})

describe('useChecklistProgress', () => {
  it('starts with empty progress', () => {
    const { result } = renderHook(() => useChecklistProgress())
    expect(result.current.progress).toEqual({})
  })

  it('toggles an item to complete', () => {
    const { result } = renderHook(() => useChecklistProgress())
    act(() => {
      result.current.toggle('eocco:step1')
    })
    expect(result.current.isComplete('eocco:step1')).toBe(true)
  })

  it('toggles an item back to incomplete', () => {
    const { result } = renderHook(() => useChecklistProgress())
    act(() => {
      result.current.toggle('eocco:step1')
    })
    act(() => {
      result.current.toggle('eocco:step1')
    })
    expect(result.current.isComplete('eocco:step1')).toBe(false)
  })

  it('counts completed items by prefix', () => {
    const { result } = renderHook(() => useChecklistProgress())
    act(() => {
      result.current.toggle('eocco:step1')
      result.current.toggle('eocco:step2')
      result.current.toggle('allcare:step1')
    })
    expect(result.current.completedCount('eocco')).toBe(2)
    expect(result.current.completedCount('allcare')).toBe(1)
  })

  it('resetAll clears all progress', () => {
    const { result } = renderHook(() => useChecklistProgress())
    act(() => {
      result.current.toggle('eocco:step1')
      result.current.toggle('allcare:step1')
    })
    act(() => {
      result.current.resetAll()
    })
    expect(result.current.progress).toEqual({})
  })
})
