import { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    const role = localStorage.getItem('userRole');
    if (token && name && role) {
      setUser({ name, role });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axiosClient.post('/auth/login', { email, password });
    const { token, name, role } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userName', name);
    localStorage.setItem('userRole', role);
    setUser({ name, role });
  };

  const register = async (name, email, password, role) => {
    const res = await axiosClient.post('/auth/register', { name, email, password, role });
    const { token, name: userName, role: userRole } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userRole', userRole);
    setUser({ name: userName, role: userRole });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);