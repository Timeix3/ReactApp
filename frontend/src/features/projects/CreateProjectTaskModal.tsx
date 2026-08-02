import { useState, useRef } from 'react';

import { Modal } from '../../shared/ui/Modal';
import { Button } from '../../shared/ui/Button';
import { useTaskActions } from '../tasks/hooks/useTaskActions';
import { useAppSelector, type RootState } from '../../app/store';
import { useProjectActions } from './hooks/useProjectActions';

export function CreateProjectTaskModal() {
  const editingProjectId = useAppSelector((s: RootState) => s.ui.editingProjectId);
  const { createTask } = useTaskActions();
  const { openEditProject } = useProjectActions();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const titleRef = useRef<HTMLInputElement>(null);

  if (!editingProjectId) return null;

  const handleSave = async () => {
    if (!title.trim()) { titleRef.current?.focus(); return; }
    await createTask({ title, desc, projectId: editingProjectId });
    returnToProject();
  };

  const returnToProject = () => {
      if (editingProjectId) openEditProject(editingProjectId);
    };

  return (
    <Modal onClose={returnToProject}>
      <h2 className="text-lg font-bold text-slate-800 mb-4">➕ Новая задача</h2>
      <div className="flex flex-col gap-3">
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Название</label>
          <input
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
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <Button variant="ghost" onClick={returnToProject}>Отмена</Button>
        <Button onClick={handleSave}>
          Создать задачу
        </Button>
      </div>
    </Modal>
  );
}