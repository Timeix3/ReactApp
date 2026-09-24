import { Button } from '../shared/ui/Button';
import { useAppDispatch } from '../app/store';
import { openLoginModal, openRegisterModal } from '../store/uiSlice';

export const LoginPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="flex items-center gap-2">
        <i className="fas fa-brain text-2xl text-white"></i>
        <span className="text-xl font-bold text-white">Обезьяна и Умник</span>
      </div>

      <main className="flex flex-1 items-center justify-center">
        <div className="text-center px-4 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Добро пожаловать!
          </h1>

          <p className="text-white/80 text-lg mb-8">
            Приложение для управления задачами, которое помогает договориться
            вашей внутренней «обезьяне» и «умнику». Планируйте, фокусируйтесь
            и доводите дела до конца.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              type="button"
              className="min-w-[180px] rounded-full px-8 py-3 text-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
              onClick={() => dispatch(openLoginModal())}
            >
              Войти
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="min-w-[180px] rounded-full px-8 py-3 text-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] border border-white/30 bg-white/10 text-white hover:bg-white/20"
              onClick={() => dispatch(openRegisterModal())}
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};