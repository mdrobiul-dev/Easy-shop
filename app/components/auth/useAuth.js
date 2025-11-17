'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const userCookie = Cookies.get('user');
      const accessToken = Cookies.get('accessToken');

      if (accessToken && userCookie) {
        try {
          setUser(JSON.parse(userCookie));
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Optional: Check auth status periodically
    const interval = setInterval(checkAuth, 60000); // Every minute

    return () => clearInterval(interval);
  }, []);

  const login = (userData, tokens) => {
    Cookies.set('accessToken', tokens.accessToken, { expires: 0.5 });
    Cookies.set('refreshToken', tokens.refreshToken, { expires: 7 });
    Cookies.set('user', JSON.stringify(userData), { expires: 0.5 });
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('user');
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  };
}