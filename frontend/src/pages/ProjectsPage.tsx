import { ProjectList } from '../features/projects/ProjectList';
import { useProjectActions } from '../features/projects/hooks/useProjectActions';

export function ProjectsPage() {
  const { openCreateProject } = useProjectActions();

  return (
    <div className="task-list-container">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-lg">📁 Проекты</h2>
        <button className="section-add-btn" onClick={openCreateProject}>
          <i className="fas fa-plus" />
        </button>
      </div>
      <ProjectList />
    </div>
  );
}