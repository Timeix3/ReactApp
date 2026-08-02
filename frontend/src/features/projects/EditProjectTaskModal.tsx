import { useState, useRef } from 'react';

import { Modal } from '../../shared/ui/Modal';
import { Button } from '../../shared/ui/Button';
import { useAppSelector, type RootState } from '../../app/store';
import { useTask } from '../tasks/hooks/useTasks';
import { useTaskActions } from '../tasks/hooks/useTaskActions';
import type { Task } from '../../types';
import { useProjectActions } from './hooks/useProjectActions';

interface FormProps {
  task: Task;
}

function EditProjectTaskForm({ task }: FormProps) {
  const editingProjectId = useAppSelector((s: RootState) => s.ui.editingProjectId);
  const { updateTask, removeTask } = useTaskActions();
  const { openEditProject } = useProjectActions();

  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.desc ?? '');
  const titleRef = useRef<HTMLInputElement>(null);


  const returnToProject = () => {
    if (editingProjectId) openEditProject(editingProjectId);
  };

  const handleSave = async () => {
    if (!title.trim()) { titleRef.current?.focus(); return; }
    await updateTask( task.id, { title: title.trim(), desc: desc.trim() });
    returnToProject();
  };

  const handleDelete = async () => {
    await removeTask(task.id);
    returnToProject();
  };

  return (
    <Modal onClose={returnToProject}>
      <h2 className="text-lg font-bold text-slate-800 mb-4">✏️ Редактировать задачу</h2>
      <div className="flex flex-col gap-3">
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Название</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название задачи"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Описание</label>
          <textarea
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Подробности..."
            className="resize-y"
          />
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <Button variant="danger" onClick={handleDelete}>
          <i className="fas fa-trash-alt mr-1.5" />Удалить
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={returnToProject}>Отмена</Button>
          <Button onClick={handleSave}>
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export function EditProjectTaskModal() {
  const editingTaskId = useAppSelector((s: RootState) => s.ui.editingTaskId) ?? -1;
  const { task: task } = useTask(editingTaskId);
  if (!task) return null;

  return <EditProjectTaskForm key={task.id} task={task} />;
}
