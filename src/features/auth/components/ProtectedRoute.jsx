import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useSession from '../hooks/useSession.js';

export default function ProtectedRoute() {
  const { session, loading } = useSession();
  const location = useLocation();

  if (loading) {
    return <div className="admin-loading">Memeriksa sesi admin...</div>;
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
