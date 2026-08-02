import type { Project } from '../../types';
import { pluralTasks } from '../../shared/lib/pluralTasks';
import { useProjectActions } from './hooks/useProjectActions';

interface Props {
  project: Project;
  taskCount: number;
}

export function ProjectCard({ project, taskCount }: Props) {
  const { openEditProject } = useProjectActions();
  const icon = project.isDefault ? '⭐' : '📁';

  return (
    <div className="project-list-item" onClick={() => openEditProject(project.id)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <div className="font-semibold text-slate-800 truncate">
              {icon} {project.title}
            </div>
          </div>
          {project.desc && (
            <p className="text-sm text-slate-500 line-clamp-2 mb-1.5">{project.desc}</p>
          )}
          <div className="text-xs text-slate-400 font-medium">
            <i className="fas fa-list-ul text-[0.65rem] mr-1" />
            {taskCount} {pluralTasks(taskCount)}
          </div>
        </div>
      </div>
    </div>
  );
}