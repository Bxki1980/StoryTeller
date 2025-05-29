import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  saveToSecureStore,
  getFromSecureStore,
  deleteFromSecureStore,
} from '../storage/secureStorage';
import { get } from 'node_modules/axios/index.cjs';
import axiosInstance from '../api/axiosInstance';
import { setLogoutFunction } from '~/api/axiosInstance';
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
  exp: number; // expiration time in seconds
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);

  const checkFirstLaunch = async () => {
    const hasLaunched = await AsyncStorage.getItem('hasLaunchedBefore');
    if (hasLaunched === null) {
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
        await get('/auth/logout', {
          params: {
            email: storedEmail,
            refreshToken: storedRefreshToken,
          },
        });
      } catch (err) {
        console.warn('Logout failed, but continuing...');
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
    if (!storedRefreshToken) return logout();

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
    } catch (err) {
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
          // Access token is expired, try refreshing
          try {
            await refreshToken(); // should internally set accessToken
          } catch {
            await logout(); // refresh also failed
          }
        } else {
          setAccessToken(token); // Token still valid
        }
      } catch (err) {
        await logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getFromSecureStore('accessToken');
      if (token) setAccessToken(token);
    };

    const init = async () => {
      await checkFirstLaunch();
    };
    init();
    loadToken();
    setLogoutFunction(logout);
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};
