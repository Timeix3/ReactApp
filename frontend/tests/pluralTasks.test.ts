import { describe, expect, it } from 'vitest'
import { pluralTasks } from '../src/shared/lib/pluralTasks'

describe('pluralTasks', () => {
  it.each([
    [1, 'задача'],
    [2, 'задачи'],
    [4, 'задачи'],
    [5, 'задач'],
    [11, 'задач'],
    [21, 'задача'],
    [24, 'задачи'],
    [25, 'задач'],
    [111, 'задач'],
    [114, 'задач'],
  ])('returns the expected form for %i', (count, expected) => {
    expect(pluralTasks(count)).toBe(expected)
  })
})
