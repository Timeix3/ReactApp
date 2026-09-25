import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PasswordInput } from '../src/features/auth/PasswordInput'

describe('PasswordInput', () => {
  it('renders as a password field and forwards input props', () => {
    render(
      <PasswordInput
        aria-label="Пароль"
        autoComplete="current-password"
        placeholder="Введите пароль"
      />,
    )

    const input = screen.getByLabelText('Пароль')

    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('autocomplete', 'current-password')
    expect(input).toHaveAttribute('placeholder', 'Введите пароль')
  })

  it('forwards change events', () => {
    const onChange = vi.fn()
    render(<PasswordInput aria-label="Пароль" onChange={onChange} />)

    fireEvent.change(screen.getByLabelText('Пароль'), {
      target: { value: 'secret' },
    })

    expect(onChange).toHaveBeenCalledOnce()
  })
})
