import { useProjects } from './hooks/useProjects';
import { ProjectCard } from './ProjectCard';
import { EmptyState } from '../../shared/ui/EmptyState';

export function ProjectList() {
  const { projects, taskCountByProject, isLoading } = useProjects();

  if (isLoading) return <EmptyState message="Загрузка..." />;
  if (projects.length === 0) return <EmptyState message="Нет проектов." />;

  return (
    <div id="projectsListContent">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          taskCount={taskCountByProject[project.id] ?? 0}
        />
      ))}
    </div>
  );
}