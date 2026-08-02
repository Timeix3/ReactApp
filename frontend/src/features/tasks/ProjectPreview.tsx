import { useProject, useProjectTasks } from '../projects/hooks/useProjects';

interface Props {
  projectId: number;
}

export function ProjectPreview({ projectId }: Props) {
  const { project: project } = useProject(projectId);
  const { projectTasks: projectTasks = [] } = useProjectTasks(projectId);
  if (!project) return null;

  return (
    <div className="create-project-info">
      {project.desc && <div className="info-desc">{project.desc}</div>}
      {projectTasks.length === 0 ? (
        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Задач пока нет</div>
      ) : (
        <>
          <div className="info-tasks-label">Задачи в проекте</div>
          {projectTasks.map((t) => (
            <div key={t.id} className="info-task">
              <i className="fas fa-circle" />
              {t.title}
            </div>
          ))}
        </>
      )}
    </div>
  );
}