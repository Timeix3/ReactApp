import { TaskList } from '../features/tasks/TaskList';
import { useTaskActions } from '../features/tasks/hooks/useTaskActions';

export function TasksPage() {
  const { openCreateTask } = useTaskActions();

  return (
    <div className="task-list-container">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-lg">📝 Все задачи</h2>
        <button className="section-add-btn" onClick={openCreateTask}>
          <i className="fas fa-plus" />
        </button>
      </div>
      <TaskList />
    </div>
  );
}
