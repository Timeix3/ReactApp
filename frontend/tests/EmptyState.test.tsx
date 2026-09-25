import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EmptyState } from '../src/shared/ui/EmptyState'

describe('EmptyState', () => {
  it('displays the provided message', () => {
    render(<EmptyState message="Задач пока нет" />)

    expect(screen.getByText('Задач пока нет')).toBeInTheDocument()
  })
})
