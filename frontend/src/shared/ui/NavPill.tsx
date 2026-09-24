import type { PageType } from '../../types';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs: { id: PageType; label: string }[] = [
  { id: 'tasks', label: '📝 Задачи' },
  { id: 'projects', label: '📁 Проекты' },
];

export function NavPill() {
  const location = useLocation();
  const navigate = useNavigate();
  const current = tabs.find((tab) => location.pathname === `/${tab.id}`)?.id ?? 'tasks';

  const handlePageChange = (page: PageType) => {
    if (page === current) return;
    navigate(`/${page}`);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="nav-pill flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            data-page={tab.id}
            className={`px-3 py-1 rounded-full ${current === tab.id ? 'active-page' : ''}`}
            onClick={() => handlePageChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
