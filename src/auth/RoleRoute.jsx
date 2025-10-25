// Uso: <RoleRoute allow={['admin']} />
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RoleRoute({ allow = [] }) {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/signin" replace />;
  
  return allow.includes(user.role) ? <Outlet /> : <Navigate to="/" replace />;
}