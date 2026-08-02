import { useAppDispatch } from '../../../app/store';
import { openCreateTaskModal } from '../../../store/uiSlice';
import { tasksApi } from '../../../store/tasksApi';
import type { Task } from '../../../types';

export function useTaskActions() {
  const dispatch = useAppDispatch();
  const [createTask] = tasksApi.useCreateTaskMutation();
  const [updateTask] = tasksApi.useUpdateTaskMutation();
  const [deleteTask] = tasksApi.useDeleteTaskMutation();

  return {
    openCreateTask: () => dispatch(openCreateTaskModal()),
    createTask: (data: Partial<Task>) => createTask(data).unwrap(),
    updateTask: (id: number, data: Partial<Task>) => updateTask({ id, ...data }).unwrap(),
    removeTask: (id: number) => deleteTask(id).unwrap(),
  };
}