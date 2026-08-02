import { useAppDispatch } from '../../../app/store';
import { openCreateProjectModal, openCreateProjectTaskModal, openEditProjectModal, openEditProjectTaskModal } from '../../../store/uiSlice';
import { projectsApi } from '../../../store/projectsApi';
import type { Project } from '../../../types';

export function useProjectActions() {
  const dispatch = useAppDispatch();
  const [createProject] = projectsApi.useCreateProjectMutation();
  const [updateProject] = projectsApi.useUpdateProjectMutation();
  const [deleteProject] = projectsApi.useDeleteProjectMutation();
  return {
    openCreateProject: () => dispatch(openCreateProjectModal()),
    openEditProject: (id: number) => dispatch(openEditProjectModal(id)),
    openCreateTask: () => dispatch(openCreateProjectTaskModal()),
    openEditTask: (id: number) => dispatch(openEditProjectTaskModal(id)),
    createProject: (data: Partial<Project>) => createProject(data).unwrap(),
    updateProject: (id: number, data: Partial<Project>) => updateProject({ id, ...data }).unwrap(),
    removeProject: (id: number) => deleteProject(id).unwrap(),
  };
}