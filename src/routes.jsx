import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
import ProtectedRoute from '../auth/ProtectedRoute';
import RoleRoute from '../auth/RoleRoute';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import AdminPanel from '../pages/AdminPanel';
import UserArea from '../pages/UserArea';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-area" element={<UserArea />} />
        </Route>

        <Route element={<RoleRoute allow={['admin']} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}