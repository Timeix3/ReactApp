import { useAppDispatch, useAppSelector, type RootState } from '../../app/store';
import { setPage } from '../../store/uiSlice';
import type { PageType } from '../../types';

const tabs: { id: PageType; label: string }[] = [
  { id: 'tasks', label: '📝 Задачи' },
  { id: 'projects', label: '📁 Проекты' },
];

export function NavPill() {
  const dispatch = useAppDispatch();
  const current = useAppSelector((s: RootState) => s.ui.currentPage);

  return (
    <div className="flex justify-center mb-6">
      <div className="nav-pill flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            data-page={tab.id}
            className={`px-3 py-1 rounded-full ${current === tab.id ? 'active-page' : ''}`}
            onClick={() => dispatch(setPage(tab.id))}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
