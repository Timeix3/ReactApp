import { useAppSelector, type RootState } from './store';
import { NavPill } from '../shared/ui/NavPill';
import { TasksPage } from '../pages/TasksPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { ModalRouter } from './ModalRouter';
import { Header } from '../shared/ui/Header';

export default function App() {
  const currentPage = useAppSelector((s: RootState) => s.ui.currentPage);

  return (
    <>
      <div className="bg-ring" style={{ width: 500, height: 500, top: -100, right: -120 }} />
      <div className="bg-ring" style={{ width: 350, height: 350, bottom: -80, left: -60 }} />
      <div className="bg-ring" style={{ width: 200, height: 200, top: '30%', left: '10%' }} />

      <div className="max-w-6xl mx-auto">
        <Header name="amogus"/>
        <NavPill />
        {currentPage === 'tasks' && <TasksPage />}
        {currentPage === 'projects' && <ProjectsPage />}
      </div>

      <ModalRouter />
    </>
  );
}