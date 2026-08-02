import type { Project, Task } from '../types';
import { rootApi } from './rootApi';

export const projectsApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({ query: () => '/projects', providesTags: ['Project'] }),
    getProject: build.query<Project, number>({ query: (id) => `/projects/${id}`, providesTags: ['Project'] }),
    getProjectTasks: build.query<Task[],number>({ query: (id) => `/projects/${id}/tasks`, providesTags: ['Task']}),
    createProject: build.mutation<Project, Partial<Project>>({ query: (body) => ({ url: '/projects', method: 'POST', body }), invalidatesTags: ['Project'] }),
    updateProject: build.mutation<Project, Pick<Project, 'id'> & Partial<Project>>({ query: ({ id, ...body }) => ({ url: `/projects/${id}`, method: 'PATCH', body }), invalidatesTags: ['Project'] }),
    deleteProject: build.mutation<void, number>({ query: (id) => ({ url: `/projects/${id}`, method: 'DELETE' }), invalidatesTags: ['Project', 'Task'] }),
  }),
  overrideExisting: false,
});