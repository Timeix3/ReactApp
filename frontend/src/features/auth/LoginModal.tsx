import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from '../../app/store';
import { PasswordInput } from './PasswordInput';
import { Button } from '../../shared/ui/Button';
import { Modal } from '../../shared/ui/Modal';
import { TextInput } from '../../shared/ui/TextInput';
import { closeModal } from '../../store/uiSlice';
import { useAuthActions } from './hooks/useAuthActions';

export function LoginModal() {
  const dispatch = useAppDispatch();
  const { loginUser } = useAuthActions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      setError('Введите логин и пароль');
      return;
    }

    try {
      await loginUser(username.trim(), password);
      dispatch(closeModal());
      navigate('/tasks');
    } catch (err) {
      console.error('Failed to login: ', err);
      setError('Не удалось войти. Проверьте данные.');
    }
  };

  return (
    <Modal onClose={() => dispatch(closeModal())}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Вход</h2>
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className="text-slate-400 hover:text-slate-600 text-xl leading-none"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Логин</label>
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите логин"
            autoComplete="username"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Пароль</label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            autoComplete="current-password"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={() => dispatch(closeModal())}>
            Отмена
          </Button>
          <Button type="submit">Войти</Button>
        </div>
      </form>
    </Modal>
  );
}
