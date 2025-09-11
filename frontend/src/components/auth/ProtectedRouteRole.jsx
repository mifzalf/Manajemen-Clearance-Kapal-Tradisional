import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRouteRole = ({ allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user || user.role !== allowedRole) {
    return <Navigate to="/forbidden" replace />;
  }
  return <Outlet />;
};

export default ProtectedRouteRole;
