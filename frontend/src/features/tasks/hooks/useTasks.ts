import { tasksApi } from '../../../store/tasksApi';

export function useTasks() {
  const { data: tasks = [], isLoading } = tasksApi.useGetTasksQuery();
  return { tasks, isLoading };
}

export function useTask(id: number) {
  const { data: task, isLoading } = tasksApi.useGetTaskQuery(id);
  return { task: task, isLoading };
}