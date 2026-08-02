import { useState, useRef } from 'react';
import { Modal } from '../../shared/ui/Modal';
import { Button } from '../../shared/ui/Button';
import { useProjectActions } from './hooks/useProjectActions';
import { useAppDispatch } from '../../app/store';
import { closeModal } from '../../store/uiSlice';

export function CreateProjectModal() {
  const dispatch = useAppDispatch();
  const { createProject } = useProjectActions();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    if (!title.trim()) { titleRef.current?.focus(); return; }
    await createProject({ title: title.trim(), desc: desc.trim() });
    dispatch(closeModal());
  };

  return (
    <Modal>
      <h2 className="text-lg font-bold text-slate-800 mb-4">📁 Новый проект</h2>
      <div className="flex flex-col gap-3">
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Название *</label>
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Запуск MVP"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Описание</label>
          <textarea
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="О чём проект..."
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <Button variant="ghost" onClick={() => dispatch(closeModal())}>Отмена</Button>
        <Button onClick={handleSave}>
          Создать проект
        </Button>
      </div>
    </Modal>
  );
}
