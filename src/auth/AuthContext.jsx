import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

// Usuario ejemplo para demo
const ADMIN_USER = {
  name: "Admin",
  role: 'admin'
};

const USER_EXAMPLE = {
  name: "Daniel",
  role: 'user'
};

const KEY = 'rolesapp_auth_v1';
const ADMIN_CHANGES_KEY = 'rolesapp_admin_changes_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch {
      return null;
    }
  });

  const [adminChanges, setAdminChanges] = useState(() => {
    try {
      const savedChanges = localStorage.getItem(ADMIN_CHANGES_KEY);
      return savedChanges ? JSON.parse(savedChanges) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEY);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 'admin') {
      localStorage.setItem(ADMIN_CHANGES_KEY, JSON.stringify(adminChanges));
    }
  }, [adminChanges, user]);

  const login = ({ name, role }) => setUser({ name, role });
  
  const logout = () => {
    setUser(null);
    // Limpiar cambios temporales del admin al cerrar sesión
    setAdminChanges({});
    localStorage.removeItem(ADMIN_CHANGES_KEY);
  };

  const saveAdminChanges = (changes) => {
    if (user?.role === 'admin') {
      setAdminChanges(prev => ({ ...prev, ...changes }));
    }
  };

  const getAdminChanges = () => adminChanges;

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAdmin, 
      isUser,
      saveAdminChanges,
      getAdminChanges,
      adminChanges
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);