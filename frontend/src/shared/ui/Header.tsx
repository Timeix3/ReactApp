import { logout } from '../../store/authSlice';
import { authApi } from '../../store/authApi';
import { rootApi } from '../../store/rootApi';
import { useAppDispatch } from '../../app/store';
import { useNavigate } from 'react-router-dom';

interface Props {
  name: string;
}

export function Header({ name }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(authApi.util.resetApiState());
    dispatch(rootApi.util.resetApiState());
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-white">
        <div className="flex items-center gap-2">
            <i className="fas fa-brain text-2xl"></i>
            <span className="text-xl font-bold">Обезьяна и Умник</span>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-sm opacity-90">Привет, <strong>{name}</strong>!</span>
            <button 
                className="bg-white/20 hover:bg-white/30 transition text-sm px-3 py-1 rounded-full flex items-center gap-1.5"
                onClick={handleLogout}
            >
                <i className="fas fa-sign-out-alt text-xs"></i> Выйти
            </button>
        </div>
    </div>
  );
}