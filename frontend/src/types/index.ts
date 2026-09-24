export interface Task {
  id: number;
  title: string;
  desc: string;
  projectId: number;
}

export interface Project {
  id: number;
  title: string;
  desc: string;
  isDefault: boolean;
}

export interface User {
  id: number;
  username: string;
}

export type ModalType =
  | 'createTask'
  | 'createProject'
  | 'createProjectTask'
  | 'editProject'
  | 'editProjectTask'
  | 'login'
  | 'register'
  | null;

export type PageType = 'login' | 'tasks' | 'projects';