import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../src/shared/ui/Button'

describe('Button', () => {
  it('renders with the primary variant by default', () => {
    render(<Button>Сохранить</Button>)

    expect(screen.getByRole('button', { name: 'Сохранить' })).toHaveClass('btn-primary')
  })

  it('applies the selected variant and custom class', () => {
    render(
      <Button variant="danger" className="wide">
        Удалить
      </Button>,
    )

    expect(screen.getByRole('button', { name: 'Удалить' })).toHaveClass('btn-danger', 'wide')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Нажать</Button>)

    fireEvent.click(screen.getByRole('button', { name: 'Нажать' }))

    expect(onClick).toHaveBeenCalledOnce()
  })
})
