import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Task } from '../src/types'
import { TaskList } from '../src/features/tasks/TaskList'
import { useTasks } from '../src/features/tasks/hooks/useTasks'

vi.mock('../src/features/tasks/hooks/useTasks', () => ({
  useTasks: vi.fn(),
}))

vi.mock('../src/features/tasks/TaskCard', () => ({
  TaskCard: ({ task }: { task: Task }) => <div>{task.title}</div>,
}))

const mockUseTasks = vi.mocked(useTasks)

describe('TaskList', () => {
  beforeEach(() => {
    mockUseTasks.mockReset()
  })

  it('shows a loading message while tasks are loading', () => {
    mockUseTasks.mockReturnValue({ tasks: [], isLoading: true })

    render(<TaskList />)

    expect(screen.getByText('Загрузка...')).toBeInTheDocument()
  })

  it('shows an empty state when there are no tasks', () => {
    mockUseTasks.mockReturnValue({ tasks: [], isLoading: false })

    render(<TaskList />)

    expect(screen.getByText('Нет задач.')).toBeInTheDocument()
  })

  it('renders a card for each task', () => {
    mockUseTasks.mockReturnValue({
      tasks: [
        { id: 1, title: 'Первая задача', desc: '', projectId: 1 },
        { id: 2, title: 'Вторая задача', desc: '', projectId: 1 },
      ],
      isLoading: false,
    })

    render(<TaskList />)

    expect(screen.getByText('Первая задача')).toBeInTheDocument()
    expect(screen.getByText('Вторая задача')).toBeInTheDocument()
  })
})
