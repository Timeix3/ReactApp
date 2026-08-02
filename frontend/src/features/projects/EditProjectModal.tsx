import { useState, useRef } from 'react';

import { Modal } from '../../shared/ui/Modal';
import { Button } from '../../shared/ui/Button';
import { useProjectActions } from './hooks/useProjectActions';
import { useProject, useProjectTasks } from './hooks/useProjects';
import { useAppSelector, useAppDispatch, type RootState } from '../../app/store';
import { closeModal } from '../../store/uiSlice';
import type { Project } from '../../types';

interface FormProps {
  project: Project;
}

function EditProjectForm({ project }: FormProps) {
  const dispatch = useAppDispatch();
  const { updateProject, removeProject, openCreateTask, openEditTask } = useProjectActions();
  const { projectTasks: projectTasks = [] } = useProjectTasks(project.id);
  const isDefault = project.isDefault ?? false;

  const [title, setTitle] = useState(project.title);
  const [desc, setDesc] = useState(project.desc ?? '');
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    if (!title.trim()) { titleRef.current?.focus(); return; }
    const patch = isDefault
      ? { desc: desc.trim() }
      : { title: title.trim(), desc: desc.trim() };
    await updateProject(project.id, patch);
    dispatch(closeModal());
  };

  const handleDelete = async () => {
    if (isDefault) return;
    await removeProject(project.id);
    dispatch(closeModal());
  };

  return (
    <Modal size="large">
      <h2 className="text-lg font-bold text-slate-800 mb-4">✏️ Редактировать проект</h2>
      <div className="flex flex-col gap-3">
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Название</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название проекта"
            disabled={isDefault}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Описание</label>
          <textarea
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="О чём проект..."
            className="resize-y"
          />
        </div>

        <div>
          <div className="flex justify-between flex-wrap gap-2 mb-2">
          <label className="text-sm font-medium text-slate-600 block">Задачи проекта</label>
          <button className="section-add-btn section-add-btn--gray" onClick={openCreateTask}>
          <i className="fas fa-plus" />
          </button>
          </div>
          <div className="project-tasks-list-large">
            {projectTasks.length === 0 ? (
              <div className="project-tasks-list-empty">Задач пока нет</div>
            ) : (
              projectTasks.map((t) => (
                <div
                  key={t.id}
                  className="project-task-item"
                  onClick={() => openEditTask(t.id)}
                >
                  <i className="fas fa-circle" />
                  <span>{t.title}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-5 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {!isDefault && (
            <Button variant="danger" onClick={handleDelete}>
              <i className="fas fa-trash-alt mr-1.5" />Удалить
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => dispatch(closeModal())}>Отмена</Button>
          <Button onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export function EditProjectModal() {
  const editingProjectId = useAppSelector((s: RootState) => s.ui.editingProjectId) ?? -1;
  const { project: project } = useProject(editingProjectId);
  if (!project) return null;

  return <EditProjectForm key={project.id} project={project} />;
}