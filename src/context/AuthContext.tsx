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
  user: DecodedToken | null;
}

interface DecodedToken {
  exp: number;
  email: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  role?: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<DecodedToken | null>(null);


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

    console.log('🚀 login triggered');
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
      const res = await axiosInstance.post(
        '/auth/refresh',
        { refreshToken: storedRefreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

      await saveToSecureStore('accessToken', newAccessToken);
      if (newRefreshToken) {
        await saveToSecureStore('refreshToken', newRefreshToken);
      }

      setAccessToken(newAccessToken);
      setUser(jwtDecode<DecodedToken>(newAccessToken));
      console.log('🔐 refreshToken() response:', res.data);
    } catch {
      await logout();
    }
  };

useEffect(() => {
  const initializeAuth = async () => {
    console.log('🧠 Initializing authentication...');

    try {
      const token = await getFromSecureStore('accessToken');
      console.log('🔑 Retrieved token from SecureStore:', token);

      if (!token) {
        console.log('⛔ No token found — user not authenticated.');
        setIsLoading(false);
        return;
      }

      let decoded: DecodedToken;
      try {
        decoded = jwtDecode<DecodedToken>(token);
        console.log('🧬 Decoded token:', decoded);
        setUser(decoded);
      } catch (e) {
        console.error('❌ JWT decoding failed. Logging out.', e);
        await logout();
        setIsLoading(false);
        return;
      }

      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp < now) {
        console.log('⌛ Token expired — refreshing...');
        await refreshToken();
      } else {
        console.log('✅ Token valid — authenticating...');
        setAccessToken(token);
        setIsAuthenticated(true); 
      }
    } catch (error) {
      console.error('❌ Failed during initializeAuth:', error);
      await logout();
    } finally {
      setIsLoading(false);
      console.log('✅ AuthProvider initialization complete');
    }
  };

  initializeAuth();
}, []);


useEffect(() => {
  const init = async () => {
    await checkFirstLaunch();
    console.log('✅ AuthProvider initialized (first launch)');
  };
  init();
}, []);

useEffect(() => {
  setIsAuthenticated(!!accessToken);
  console.log('✅ accessToken updated:', accessToken);
}, [accessToken]);



  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoading,
        isFirstLaunch,
        isAuthenticated,
        login,
        logout,
        refreshToken,
        user
      }}>
      {children}
    </AuthContext.Provider>
  );
};
