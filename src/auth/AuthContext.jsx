import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const KEY = 'levelup_auth_user';
const ADMIN_CHANGES_KEY = 'levelup_admin_changes';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(KEY);
      return savedUser ? JSON.parse(savedUser) : null;
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

  // Login ahora espera: { id, name, email, role, token }
  const login = (userData) => {
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      token: userData.token
    });
  };
  
  const logout = () => {
    setUser(null);
    setAdminChanges({});
    localStorage.removeItem(KEY);
    localStorage.removeItem(ADMIN_CHANGES_KEY);
  };

  const saveAdminChanges = (changes) => {
    if (user?.role === 'admin') {
      setAdminChanges(prev => ({ ...prev, ...changes }));
    }
  };

  const getAdminChanges = () => adminChanges;

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'usuario' || user?.role === 'user';

  // Función para obtener el token del usuario actual
  const getToken = () => user?.token;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAdmin, 
      isUser,
      saveAdminChanges,
      getAdminChanges,
      adminChanges,
      getToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);