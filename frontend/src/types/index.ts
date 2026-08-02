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

export type ModalType =
  | 'createTask'
  | 'createProject'
  | 'createProjectTask'
  | 'editProject'
  | 'editProjectTask'
  | null;

export type PageType = 'tasks' | 'projects';