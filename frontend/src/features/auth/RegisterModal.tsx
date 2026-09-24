import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from '../../app/store';
import { PasswordInput } from './PasswordInput';
import { Button } from '../../shared/ui/Button';
import { Modal } from '../../shared/ui/Modal';
import { TextInput } from '../../shared/ui/TextInput';
import { closeModal } from '../../store/uiSlice';
import { useAuthActions } from './hooks/useAuthActions';

export function RegisterModal() {
  const dispatch = useAppDispatch();
  const { registerUser, loginUser } = useAuthActions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      setError('Введите логин и пароль');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли должны совпадать');
      return;
    }

    try {
      await registerUser(username.trim(), password);
      await loginUser(username.trim(), password);
      dispatch(closeModal());
      navigate('/tasks');
    } catch (err) {
      console.error('Failed to register: ', err);
      setError('Не удалось зарегистрироваться. Попробуйте ещё раз.');
    }
  };

  return (
    <Modal onClose={() => dispatch(closeModal())}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Регистрация</h2>
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
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-600 mb-1 block">Повторите пароль</label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите пароль"
            autoComplete="new-password"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={() => dispatch(closeModal())}>
            Отмена
          </Button>
          <Button type="submit">Зарегистрироваться</Button>
        </div>
      </form>
    </Modal>
  );
}
