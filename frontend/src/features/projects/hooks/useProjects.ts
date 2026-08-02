import { useMemo } from 'react';
import { projectsApi } from '../../../store/projectsApi';
import { tasksApi } from '../../../store/tasksApi';

export function useProjects() {
  const { data: projects = [], isLoading } = projectsApi.useGetProjectsQuery();
  const { data: tasks = [] } = tasksApi.useGetTasksQuery();
  const sorted = useMemo(() => [...projects].sort((a, b) => Number(b.isDefault) - Number(a.isDefault)), [projects]);
  const taskCountByProject = useMemo(() => tasks.reduce<Record<string, number>>((acc, t) => {
    acc[t.projectId] = (acc[t.projectId] ?? 0) + 1; return acc;
  }, {}), [tasks]);
  return { projects: sorted, taskCountByProject, isLoading };
}

export function useProject(id: number) {
  const { data: project, isLoading } = projectsApi.useGetProjectQuery(id, { skip: id <= 0 });
  return { project: project, isLoading };
}

export function useProjectTasks(id: number) {
  const { data: projectTasks = [], isLoading } = projectsApi.useGetProjectTasksQuery(id, { skip: id <= 0 });
  return { projectTasks, isLoading };
}