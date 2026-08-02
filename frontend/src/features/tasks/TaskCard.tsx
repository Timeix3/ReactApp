import type { Task } from '../../types';
import { ProjectChip } from '../../shared/ui/ProjectChip';
import { useProject } from '../projects/hooks/useProjects';

interface Props {
  task: Task;
}

export function TaskCard({ task }: Props) {
  const { project: project } = useProject(task.projectId);
  if (!project) return null;
  
  return (
    <div className="task-list-item">
      <div className="font-semibold text-slate-800 truncate mb-1">{task.title}</div>
      {task.desc && (
        <p className="text-sm text-slate-500 line-clamp-2 mb-1.5">{task.desc}</p>
      )}
      <ProjectChip project={project} />
    </div>
  );
}