import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  saveToSecureStore,
  getFromSecureStore,
  deleteFromSecureStore,
} from '../storage/secureStorage';
import axiosInstance from '../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';

interface AuthContextProps {
  isLoading: boolean;
  isFirstLaunch: boolean;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

interface DecodedToken {
  exp: number;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);

  const checkFirstLaunch = async () => {
    const hasLaunched = await AsyncStorage.getItem('hasLaunchedBefore');
    if (!hasLaunched) {
      await AsyncStorage.setItem('hasLaunchedBefore', 'true');
      setIsFirstLaunch(true);
    } else {
      setIsFirstLaunch(false);
    }
  };

  const login = async (token: string, refreshToken: string, email: string) => {
    await Promise.all([
      saveToSecureStore('accessToken', token),
      saveToSecureStore('refreshToken', refreshToken),
      saveToSecureStore('userEmail', email),
    ]);
    setAccessToken(token);
  };

  const logout = async () => {
    const storedRefreshToken = await getFromSecureStore('refreshToken');
    const storedEmail = await getFromSecureStore('userEmail');

    if (storedRefreshToken && storedEmail) {
      try {
        await axiosInstance.post('/auth/logout', {
          email: storedEmail,
          refreshToken: storedRefreshToken,
        });
      } catch (err) {
        console.warn('Logout request failed');
      }
    }

    await Promise.all([
      deleteFromSecureStore('accessToken'),
      deleteFromSecureStore('refreshToken'),
      deleteFromSecureStore('userEmail'),
    ]);

    setAccessToken(null);
  };

  const refreshToken = async () => {
    const storedRefreshToken = await getFromSecureStore('refreshToken');
    if (!storedRefreshToken) {
      await logout();
      return;
    }

    try {
      const res = await axiosInstance.post('/auth/refresh', {
        refreshToken: storedRefreshToken,
      });

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

      await saveToSecureStore('accessToken', newAccessToken);
      if (newRefreshToken) {
        await saveToSecureStore('refreshToken', newRefreshToken);
      }

      setAccessToken(newAccessToken);
    } catch {
      await logout();
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await getFromSecureStore('accessToken');

        if (!token) {
          setIsLoading(false);
          return;
        }

        const decoded = jwtDecode<DecodedToken>(token);
        const now = Math.floor(Date.now() / 1000);

        if (decoded.exp < now) {
          await refreshToken();
        } else {
          setAccessToken(token);
        }
      } catch {
        await logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoading,
        isFirstLaunch,
        isAuthenticated: !!accessToken,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
