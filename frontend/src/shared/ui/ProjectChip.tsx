import type { Project } from '../../types';

interface Props {
  project: Project;
}

export function ProjectChip({ project }: Props) {
  const cls = project.isDefault
    ? 'project-chip project-chip-default'
    : 'project-chip';
  const icon = project.isDefault ? 'fa-star' : 'fa-folder';

  return (
    <span className={cls}>
      <i className={`fas ${icon}`} />
      {project.title}
    </span>
  );
}
