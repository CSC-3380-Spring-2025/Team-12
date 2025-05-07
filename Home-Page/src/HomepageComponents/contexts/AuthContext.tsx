import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const logout = async () => {
    try {
      await fetch('http://127.0.0.1:8000/auth/logout/', {
        method: 'POST',
        credentials: 'include',
      });
      setIsAuthenticated(false);
      setUsername('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/current_user/', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.isAuthenticated) {
        setIsAuthenticated(true);
        setUsername(data.username);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};