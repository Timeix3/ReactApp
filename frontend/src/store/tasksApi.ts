import type { Task } from '../types';
import { rootApi } from './rootApi';

export const tasksApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({ query: () => '/tasks', providesTags: ['Task'] }),
    getTask: build.query<Task, number>({ query: (id) => `/tasks/${id}`, providesTags: ['Task'] }),
    createTask: build.mutation<Task, Partial<Task>>({ query: (body) => ({ url: '/tasks', method: 'POST', body }), invalidatesTags: ['Task'] }),
    updateTask: build.mutation<Task, Pick<Task, 'id'> & Partial<Task>>({ query: ({ id, ...body }) => ({ url: `/tasks/${id}`, method: 'PATCH', body }), invalidatesTags: ['Task'] }),
    deleteTask: build.mutation<void, number>({ query: (id) => ({ url: `/tasks/${id}`, method: 'DELETE' }), invalidatesTags: ['Task'] }),
  }),
  overrideExisting: false,
});