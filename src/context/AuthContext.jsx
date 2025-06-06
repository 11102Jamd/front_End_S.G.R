import { createContext, useContext, useState, useEffect } from 'react';
import { getUser, login as apiLogin, logout as apiLogout } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await apiLogin(email, password);
      setUser(userData);
      return userData;
    } catch (error) {
      setUser(null);
      throw error;
    } 
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      localStorage.removeItem('token');
      // Forzar recarga para limpiar completamente el estado
      window.location.href = '/login';
    } catch (error) {
        console.error('Logout error:', error);
        // Forzar limpieza incluso si hay error
        setUser(null);
        localStorage.removeItem('token');
        throw error;
    }
  };

  const hasRole = (role) => user?.rol === role;
  const hasAnyRole = (roles) => roles.includes(user?.rol);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      hasRole,
      hasAnyRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);