import { useState, useRef } from 'react';

import { Modal } from '../../shared/ui/Modal';
import { Button } from '../../shared/ui/Button';
import { ProjectPreview } from './ProjectPreview';
import { useProjects } from '../projects/hooks/useProjects';
import { useTaskActions } from './hooks/useTaskActions';
import { useAppDispatch } from '../../app/store';
import { closeModal } from '../../store/uiSlice';

export function CreateTaskModal() {
  const dispatch = useAppDispatch();
  const { projects: projects = [] } = useProjects();
  const { createTask } = useTaskActions();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [projectId, setProjectId] = useState(0);

  const titleRef = useRef<HTMLInputElement>(null);
  const projectRef = useRef<HTMLSelectElement>(null);

  const handleSave = async () => {
    if (!title.trim()) { titleRef.current?.focus(); return; }
    if (!projectId) { projectRef.current?.focus(); return; }
    await createTask({ title, desc, projectId });
    dispatch(closeModal());
  };

  return (
    <Modal>
      <h2 className="text-lg font-bold text-slate-800 mb-4">➕ Новая задача</h2>
      <div className="flex flex-col gap-3">
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Название</label>
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Что нужно сделать?"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Описание</label>
          <textarea
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Подробности..."
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Проект</label>
          <select value={projectId} onChange={(e) => setProjectId(Number(e.target.value))}>
            <option value={0} disabled>
              Выберите проект
            </option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.isDefault ? '⭐' : '📁'} {p.title}
              </option>
            ))}
          </select>
          <ProjectPreview projectId={projectId} />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <Button variant="ghost" onClick={() => dispatch(closeModal())}>Отмена</Button>
        <Button onClick={handleSave}>
          Создать задачу
        </Button>
      </div>
    </Modal>
  );
}
