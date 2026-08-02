import { useTasks } from './hooks/useTasks';
import { TaskCard } from './TaskCard';
import { EmptyState } from '../../shared/ui/EmptyState';
import type { Task } from '../../types';

export function TaskList() {
  const { tasks, isLoading } = useTasks();

  if (isLoading) return <EmptyState message="Загрузка..." />;
  if (tasks.length === 0) return <EmptyState message="Нет задач." />;

  return (
    <div id="taskListContent">
      {tasks.map((task: Task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
    </div>
  );
}