import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginApi, signupApi } from '~/services/authServices';

interface AuthContextProps {
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isFirstLaunch: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    const token = await loginApi(email, password);
    await AsyncStorage.setItem('userToken', token);
    setUserToken(token);
  };

  const signup = async (email: string, password: string) => {
    const token = await signupApi(email, password);
    await AsyncStorage.setItem('userToken', token);
    setUserToken(token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
    setIsLoading(false);
  };

  const checkFirstLaunch = async () => {
    const hasLaunched = await AsyncStorage.getItem('hasLaunchedBefore');
    if (hasLaunched === null) {
      await AsyncStorage.setItem('hasLaunchedBefore', 'true');
      setIsFirstLaunch(true);
    } else {
      setIsFirstLaunch(false);
    }
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    setIsLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      await checkFirstLaunch();
      await checkToken();
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, login, signup, logout, isLoading, isFirstLaunch }}>
      {children}
    </AuthContext.Provider>
  );
};
