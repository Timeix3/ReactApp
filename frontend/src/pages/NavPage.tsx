import { NavPill } from '../shared/ui/NavPill';
import { Header } from '../shared/ui/Header';
import { useUser } from '../features/auth/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';


export function NavPage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
    <div className="max-w-6xl mx-auto">
        <Header name = {user.username} />
            <NavPill />
            <Outlet />
    </div>
    </>
  );
}