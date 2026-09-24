import type { RootState } from './store';
import { useAppSelector } from './store';
import { CreateTaskModal } from '../features/tasks/CreateTaskModal';
import { CreateProjectModal } from '../features/projects/CreateProjectModal';
import { EditProjectModal } from '../features/projects/EditProjectModal';
import { EditProjectTaskModal } from '../features/projects/EditProjectTaskModal';
import { CreateProjectTaskModal } from '../features/projects/CreateProjectTaskModal';
import { LoginModal } from '../features/auth/LoginModal';
import { RegisterModal } from '../features/auth/RegisterModal';

export function ModalRouter() {
  const openModal = useAppSelector((s: RootState) => s.ui.openModal);

  if (!openModal) return null;

  switch (openModal) {
    case 'createTask': return <CreateTaskModal />;
    case 'createProject': return <CreateProjectModal />;
    case 'createProjectTask': return <CreateProjectTaskModal />;
    case 'editProject': return <EditProjectModal />;
    case 'editProjectTask': return <EditProjectTaskModal />;
    case 'login': return <LoginModal />;
    case 'register': return <RegisterModal />;
    default: return null;
  }
}